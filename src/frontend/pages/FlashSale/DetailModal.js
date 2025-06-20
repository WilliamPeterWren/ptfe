import React, { useState, useEffect, useMemo, useCallback } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";
import apiProduct from "../../../api/apiProduct";
import apiPeterVoucher from "../../../api/apiPeterVoucher";
import apiCart from "../../../api/apiCart";
import ProductImageSlider from "./ProductImageSlider";

const SET_CART_FROM_API = (data) => ({
  type: "SET_CART_FROM_API",
  payload: data,
});
const TOTAL_DISCOUNT = () => ({ type: "TOTAL_DISCOUNT" });

const DetailModal = ({ productSlug, productModal, setProductModal }) => {
  const latestFlashsale = Cookies.get("latestFlashsale");

  const [product, setProduct] = useState(null);
  const [price, setPrice] = useState(0);
  const [salePrice, setSalePrice] = useState(0);
  const [selectVariant, setSelectVariant] = useState(0);
  const [peterVoucher, setPeterVoucher] = useState([]);
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(1);

  const getProductBySlug = useCallback(async () => {
    try {
      let res = null;

      if (latestFlashsale === undefined) {
        res = await apiProduct.getBySlug(productSlug);
      } else {
        res = await apiProduct.getBySlugAndFlashsaleId(
          productSlug,
          latestFlashsale
        );
      }
      console.log(res);

      const data = res.data.result;
      console.log(data);
      setProduct(data);

      if (data.blocked) {
        Swal.fire({
          title: "Sản phẩm tạm khóa!",
          text: "Sản phẩm đang được admin khóa!",
          icon: "warning",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }

      if (data.variants && data.variants.length > 0) {
        console.log(data.variants);
        setPrice(data.variants[0].price);
        setSalePrice(data.variants[0].salePrice);
      }
    } catch (error) {
      console.log(error);
    }
  }, [productSlug]);

  useEffect(() => {
    getProductBySlug();
  }, [productSlug]);

  const star = useMemo(() => {
    let sum1 = 0;
    let sum2 = 0;
    const entries = Object.entries(product?.rating || {});
    entries.forEach(([key, value]) => {
      sum1 += Number.parseInt(key) * value;
      sum2 += value;
    });
    return sum2 === 0 ? 0 : sum1 / sum2;
  }, [product?.rating]);

  const [timeLeft, setTimeLeft] = useState({
    hours: 6,
    minutes: 22,
    seconds: 46,
  });

  const endTime = new Date("2025-06-29T23:59:59+07:00").getTime();

  useEffect(() => {
    const updateTimer = () => {
      const now = new Date().getTime();
      const distance = endTime - now;

      if (distance <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(
        (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
      );
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: hours < 10 ? `0${hours}` : hours,
        minutes: minutes < 10 ? `0${minutes}` : minutes,
        seconds: seconds < 10 ? `0${seconds}` : seconds,
      });
    };

    updateTimer();
    const timer = setInterval(updateTimer, 1000);

    return () => clearInterval(timer);
  }, [endTime]);

  const userPeterVoucher = JSON.parse(Cookies.get("peterVoucher") || "[]");

  const getPeterVoucher = async () => {
    try {
      const res = await apiPeterVoucher.getAll();
      const data = res.data.result.slice(0, 5);
      const vouchers = data
        .filter((i) => userPeterVoucher.some((u) => u.id === i.id))
        .map((i) => ({
          id: i.id,
          name: i.name,
          value: i.value,
        }));
      setPeterVoucher(vouchers);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getPeterVoucher();
  }, []);

  const handleChangeVariant = (index) => {
    setSelectVariant(index);
    setSalePrice(product.variants[index].salePrice);
    setPrice(product.variants[index].price);
  };

  const accessToken = Cookies.get("accessToken");
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    const data = {
      sellerId: product.sellerId,
      variantId: product.variants[selectVariant].id,
      quantity: value,
    };

    try {
      const res = await apiCart.addToCart(data, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const result = res.data.result;

      Swal.fire({
        title: "Thành công",
        text: "Sản phẩm đã thêm vào giỏ hàng",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      const sorted1 = [...result].sort(
        (a, b) =>
          new Date(b.itemResponses.updatedAt) -
          new Date(a.itemResponses.updatedAt)
      );

      const sorted2 = [...sorted1].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );

      dispatch(SET_CART_FROM_API(sorted2));
      dispatch(TOTAL_DISCOUNT());
    } catch (err) {
      console.log(err);
      Swal.fire({
        title: "Thêm vào giỏ hàng thất bại!",
        text: "Sản phẩm chưa được thêm vào giỏ hàng! Kiểm tra API!",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);
    } else if (e.target.value === "") {
      setValue("");
    }
  };

  const increment = () => setValue((prev) => (isNaN(prev) ? 0 : prev + 1));
  const decrement = () => setValue((prev) => (isNaN(prev) ? 0 : prev - 1));

  if (product === null) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto relative">
        <button
          onClick={() => setProductModal(!productModal)}
          className="absolute top-4 right-4 text-gray-600 hover:text-gray-800 text-2xl"
        >
          &times;
        </button>
        <div className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="w-full md:w-1/2">
              <ProductImageSlider product={product} />
            </div>
            <div className="w-full md:w-1/2">
              <h1 className="text-2xl font-bold mb-2">
                {product?.productName}
              </h1>
              <div className="flex items-center mb-2">
                <span className="text-yellow-400">
                  ★ {Number(star.toFixed(1))}
                </span>
                <span className="text-gray-600 ml-2">
                  {" "}
                  | Đã bán: {product?.sold}
                </span>
              </div>
              {product?.discount > 0 && (
                <div className="flex items-center">
                  <div className="bg-orange-100 text-orange-700 text-sm font-semibold px-2 py-1 rounded mb-4">
                    FLASH SALE
                  </div>
                  <div className="ml-4">
                    <span className="text-red-500 border border-red-600 rounded p-1">
                      - {product.discount.toLocaleString()}
                    </span>
                  </div>
                </div>
              )}
              {salePrice > 0 ? (
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-red-600">
                    {salePrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    {price.toLocaleString()}
                  </span>
                  <span className="text-red-600 ml-2 bg-red-100 px-1 rounded">
                    -{Math.round(((price - salePrice) / price) * 100)}%
                  </span>
                </div>
              ) : (
                <div className="flex items-baseline mb-4">
                  <span className="text-3xl font-bold text-red-600">
                    {price.toLocaleString()}
                  </span>
                </div>
              )}
              <div className="mb-4">
                <span className="text-sm text-gray-600">Voucher hiện có</span>
                <div className="flex space-x-2 mt-1">
                  {peterVoucher.map((voucher, index) => (
                    <span
                      key={index}
                      className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded"
                    >
                      {voucher.value.toLocaleString()}
                    </span>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-600">Vận Chuyển</span>
                <p className="text-xs text-gray-600 mt-1">
                  Miễn phí vận chuyển
                </p>
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-600">An Tâm Mua</span>
                <p className="text-xs text-gray-600 mt-1">
                  Trả hàng miễn phí 15 ngày
                  <br />
                  Chính hãng 100%
                  <br />
                  Miễn phí vận chuyển
                </p>
              </div>
              <div className="mb-4">
                <span className="text-sm text-gray-600">Lựa chọn</span>
                <div className="grid grid-cols-4 gap-2 mt-1">
                  {product?.variants.map((v, index) => (
                    <button
                      key={index}
                      className={`text-md px-2 py-1 rounded border border-gray-400 text-gray-800 hover:bg-blue-500 hover:border-none hover:text-white capitalize ${
                        index === selectVariant &&
                        "font-bold bg-blue-500 text-white"
                      }`}
                      disabled={v.stock <= 0}
                      onClick={() => handleChangeVariant(index)}
                    >
                      {v.variantName}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex items-center p-1 w-fit my-2">
                <button
                  onClick={decrement}
                  className={`px-4 py-1 border border-gray-300 ${
                    product.blocked ? "" : "hover:bg-blue-400"
                  } `}
                  disabled={product.blocked}
                >
                  -
                </button>
                <input
                  type="number"
                  value={value}
                  onChange={handleChange}
                  min={1}
                  max={product.variants[selectVariant].stock}
                  className="w-24 text-center px-2 py-1 border-y border-gray-300 focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                  onInput={(e) => {
                    let val = parseInt(e.target.value, 10);
                    const min = parseInt(e.target.min, 10);
                    const max = parseInt(e.target.max, 10);

                    if (isNaN(val)) {
                      e.target.value = "";
                    } else if (val > max) {
                      e.target.value = max;
                    } else if (val < min) {
                      e.target.value = min;
                    }
                  }}
                  disabled={product.blocked}
                />

                <button
                  onClick={increment}
                  className={`px-4 py-1 border border-gray-300 ${
                    product.blocked ? "" : "hover:bg-blue-400"
                  }`}
                  disabled={product.blocked}
                >
                  +
                </button>
              </div>
              <div className="flex space-x-4">
                <button
                  className={`${
                    product.blocked
                      ? "bg-gray-200"
                      : "bg-red-500 hover:bg-red-600"
                  }  text-white px-6 py-2 rounded  transition-colors duration-300`}
                  onClick={handleAddToCart}
                  disabled={product.blocked}
                >
                  Thêm Vào Giỏ Hàng
                </button>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-center">
            <div className="bg-orange-500 text-white px-4 py-2 rounded-lg flex items-center space-x-2">
              <span>KẾT THÚC TRONG</span>
              <span className="font-bold">
                {timeLeft.hours}:{timeLeft.minutes}:{timeLeft.seconds}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailModal;
