import { useState, useEffect, useMemo } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import {  useDispatch } from "react-redux";

import ProductImageSlider from "./ProductImageSlider";
import apiCart from "../../../api/apiCart";
import {
  SET_CART_FROM_API,
  TOTAL_DISCOUNT,
} from "../../../redux/action/cartAction";
import apiPeterVoucher from "../../../api/apiPeterVoucher";

const Detail = ({ productData, reviewsLength }) => {
  const [price, setPrice] = useState(productData.variants[0].price);
  const [salePrice, setSalePrice] = useState(productData.variants[0].salePrice);
  const [discount, setDiscount] = useState(productData.discount);
  const [selectVariant, setSelectVariant] = useState(0);
  const [peterVoucher, setPeterVoucher] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [maxVariantStock, setMaxVariantStock] = useState(
  //   productData.variants[0].stock
  // );

  const star = useMemo(() => {
    let sum1 = 0;
    let sum2 = 0;
    const entries = Object.entries(productData.rating || {});
    entries.forEach(([key, value]) => {
      sum1 += Number.parseInt(key) * value;
      sum2 += value;
    });
    return sum2 === 0 ? 0 : sum1 / sum2;
  }, [productData.rating]);

  useEffect(() => {
    // console.log(star);
  }, [star]);

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

  const userPeterVoucher = Cookies.get("peterVoucher");
  // console.log(userPeterVoucher)
  const getPeterVoucher = async () => {
    await apiPeterVoucher
      .getAll()
      .then((res) => {
        const data = res.data.result.slice(0, 5);

        // console.log(data);
        data.map((i) => {
          if (userPeterVoucher.some((u) => u.id === i.id)) {
            // console.log(i);
            const p = {
              id: i.id,
              name: i.name,
              value: i.value,
            };
            setPeterVoucher((prev) => [...prev, p]);
          }
        });
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPeterVoucher();
  }, []);

  const handleChangeVariant = (index) => {
    setSelectVariant(index);
    setSalePrice(productData.variants[index].salePrice);
    setPrice(productData.variants[index].price);
  };

  const accessToken = Cookies.get("accessToken");
  const dispatch = useDispatch();

  const handleAddToCart = async () => {
    // console.log(productData.variants);
    const data = {
      sellerId: productData.sellerId,
      variantId: productData.variants[selectVariant].id,
      quantity: value,
    };

    console.log(data);

    await apiCart
      .addToCart(data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.result;

        console.log(data);

        Swal.fire({
          title: "Thành công",
          text: "Sản phẩm đã thêm vào giỏ hàng",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });

        const sorted1 = [...data].sort(
          (a, b) =>
            new Date(b.itemResponses.updatedAt) -
            new Date(a.itemResponses.updatedAt)
        );

        console.log(sorted1);

        const sorted2 = [...sorted1].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        console.log(sorted2);

        dispatch(SET_CART_FROM_API(sorted2));
        dispatch(TOTAL_DISCOUNT());
      })
      .catch((err) => {
        console.log(err);
        const errData = err.response.data;
        const textError =
          errData.code === 1015
            ? "Bạn không thể thêm sản phẩm bạn đang bán!"
            : "Lỗi API";

        const titleError =
          errData.code === 1015
            ? "Đây là sản phẩm của bạn!"
            : "Thêm vào giỏ hàng thất bại!";

        Swal.fire({
          title: titleError,
          text: `${textError}`,
          icon: "error",
          timer: 2500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      });
  };

  const [value, setValue] = useState(1);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);
    } else if (e.target.value === "") {
      setValue("");
    }
  };

  const increment = () => {
    if (value < productData.variants[selectVariant].stock)
      setValue((prev) => (isNaN(prev) ? 0 : prev + 1));
  };
  const decrement = () => {
    if (value > 1) setValue((prev) => (isNaN(prev) ? 0 : prev - 1));
  };

  const handleToCheckout = async () => {
    const data = {
      sellerId: productData.sellerId,
      variantId: productData.variants[selectVariant].id,
      quantity: value,
    };

    console.log(data);

    await apiCart
      .addToCart(data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.result;

        console.log(data);

        Swal.fire({
          title: "Thành công",
          text: "Sản phẩm đã thêm vào giỏ hàng",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });

        const sorted1 = [...data].sort(
          (a, b) =>
            new Date(b.itemResponses.updatedAt) -
            new Date(a.itemResponses.updatedAt)
        );

        console.log(sorted1);

        const sorted2 = [...sorted1].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        console.log(sorted2);

        dispatch(SET_CART_FROM_API(sorted2));
        dispatch(TOTAL_DISCOUNT());
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Thêm vào giỏ hàng thất bại!",
          text: "Sản phẩm chưa được thêm vào giỏ hàng! Kiểm tra API!",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      });
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-white rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <ProductImageSlider productData={productData} />

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-2 capitalize ">
            {productData?.productName}
          </h1>
          <p className="text-lg text-gray-600 mb-4"></p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400">★ {Number(star.toFixed(1))}</span>
            <span className="text-gray-600 ml-2">{reviewsLength} Đánh giá</span>
            <span className="text-gray-600 ml-2">
              {" "}
              | Đã bán: {productData.sold}
            </span>
          </div>
          {productData.discount > 0 && (
            <div className="flex justify-items">
              <div className="bg-orange-100 text-orange-700 text-sm font-semibold px-2 py-1 rounded mb-4 inline-block">
                FLASH SALE
              </div>
              <div className="ml-4">
                <span className="text-red-500 border border-red-600 rounded p-1">
                  - {productData.discount.toLocaleString()}
                </span>{" "}
              </div>
            </div>
          )}

          {salePrice > 0 ? (
            <div className="flex items-baseline mb-4">
              {discount > 0 ? (
                <div>
                  <span className="text-3xl font-bold text-red-600">
                    {(salePrice - discount).toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    {price.toLocaleString()}
                  </span>
                </div>
              ) : (
                <div>
                  <span className="text-3xl font-bold text-red-600">
                    {salePrice.toLocaleString()}
                  </span>
                  <span className="text-lg text-gray-500 line-through ml-2">
                    {price.toLocaleString()}
                  </span>
                </div>
              )}

              <span className="text-red-600 ml-2 bg-red-100 px-1 rounded">
                -{Math.round(((price - salePrice) / price) * 100)}%
              </span>

              {discount > 0 && (
                <span className="text-red-600 ml-2 bg-red-100 px-1 rounded">
                  -{Math.round((discount / salePrice) * 100)}%
                </span>
              )}
            </div>
          ) : (
            <div className="flex items-baseline mb-4">
              {discount > 0 ? (
                <div>
                  <span className="text-3xl font-bold text-red-600">
                    {(price - discount).toLocaleString()}
                  </span>
                  <span className="ml-4 text-3xl font-bold text-gray-600 line-through">
                    {price.toLocaleString()}
                  </span>
                  {discount > 0 && (
                    <span className="text-red-600 ml-2 bg-red-100 px-1 rounded">
                      -{Math.round((discount / price) * 100)}%
                    </span>
                  )}
                </div>
              ) : (
                <span className="text-3xl font-bold text-red-600">
                  {price.toLocaleString()}
                </span>
              )}
            </div>
          )}

          {peterVoucher?.length > 0 && (
            <div className="mb-4">
              <span className="text-sm text-gray-600">Voucher hiện có</span>
              <div className="flex space-x-2 mt-1 ">
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
          )}
          <div className="mb-4">
            <span className="text-sm text-gray-600">Vận Chuyển</span>
            <p className="text-xs text-gray-600 mt-1">Miễn phí vận chuyển</p>
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
            <span className="text-sm text-gray-600">
              Kho: {productData.variants[selectVariant].stock}
            </span>
          </div>
          <div className="mb-4">
            <span className="text-sm text-gray-600">Lựa chọn</span>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {productData.variants.map((v, index) => (
                <button
                  key={index}
                  className={`text-md px-2 py-1 rounded border border-gray-400 text-gray-800 ${
                    productData.blocked
                      ? "bg-gray-200 text-white"
                      : "hover:bg-blue-500 hover:border-none hover:text-white"
                  }  capitalize ${
                    index === selectVariant &&
                    "font-bold bg-blue-500 text-white"
                  }
                    `}
                  disabled={v.stock <= 0 || productData.blocked}
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
                productData.blocked ? "" : "hover:bg-blue-400"
              } `}
              disabled={productData.blocked}
            >
              -
            </button>
            <input
              type="number"
              value={value}
              onChange={handleChange}
              min={1}
              max={productData.variants[selectVariant].stock}
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
              disabled={productData.blocked}
            />

            <button
              onClick={increment}
              className={`px-4 py-1 border border-gray-300 ${
                productData.blocked ? "" : "hover:bg-blue-400"
              }`}
              disabled={productData.blocked}
            >
              +
            </button>
          </div>
          <div className="flex space-x-4">
            <button
              className={`${
                productData.blocked
                  ? "bg-gray-200"
                  : "bg-red-500 hover:bg-red-600"
              }  text-white px-6 py-2 rounded  transition-colors duration-300`}
              onClick={handleAddToCart}
              disabled={productData.blocked}
            >
              Thêm Vào Giỏ Hàng
            </button>
            {/* <button
              className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors duration-300"
              // onClick={handleToCheckout}
            >
              Mua Ngay
            </button> */}
          </div>
          {/* <div className="mt-4 flex space-x-2">
            <button className="text-blue-500 hover:underline">Chia sẻ:</button>
            <span className="text-gray-600">😀</span>
            <span className="text-blue-500">Facebook</span>
            <span className="text-blue-500">Twitter</span>
            <span className="text-red-500">❤️ Đã thích (7K)</span>
          </div> */}
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
  );
};

export default Detail;
