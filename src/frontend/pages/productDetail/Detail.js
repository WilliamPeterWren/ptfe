import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useSelector, useDispatch } from "react-redux";

import ProductImageSlider from "./ProductImageSlider";
import apiCart from "../../../api/apiCart";
import {
  ADD,
  CLEAR,
  SET_CART_FROM_API,
  UPDATE_CART_FROM_API,
} from "../../../redux/action/cartAction";

const Detail = ({ productData }) => {
  const [price, setPrice] = useState(productData.variants[0].price);
  const [salePrice, setSalePrice] = useState(productData.variants[0].salePrice);
  const [reloadCart, setReloadCart] = useState(false);
  const [selectVariant, setSelectVariant] = useState(0);

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

  const product = {
    name: "Tấm gương khổng vô",
    brand: "Ventas",
    originalPrice: "đ62.000",
    salePrice: "đ20.000",
    discount: "-68%",
    rating: 4.7,
    reviews: "8 Đánh Giá",
    sales: "Đã bán 42,1K",
    sizes: [
      { label: "Gương 22°22 (1 miếng)", stock: true },
      { label: "Gương 22°22 (4 miếng)", stock: true },
      { label: "Gương 30°30 (1 miếng)", stock: true },
      { label: "Gương 30°30 (4 miếng)", stock: true },
      { label: "Gương 30°40 (1 miếng)", stock: true },
      { label: "Gương 30°40 (4 miếng)", stock: true },
      { label: "Gương 40°40 (1 miếng)", stock: true },
      { label: "Gương 40°40 (4 miếng)", stock: true },
    ],
    image: "https://via.placeholder.com/300x400.png?text=Tam+Guong+Khong+Vo",
    badges: [
      "Trả hàng miễn phí 15 ngày",
      "Hàng chính hãng 100%",
      "Miễn phí vận chuyển",
    ],
    vouchers: ["Giảm đ7K", "Giảm đ5K", "Giảm đ10K", "Giảm đ20K", "Giảm đ50"],
  };

  const handleChangeVariant = (index) => {
    setSelectVariant(index);
    setSalePrice(productData.variants[index].salePrice);
    setPrice(productData.variants[index].price);
  };

  const accessToken = Cookies.get("accessToken");
  const dispatch = useDispatch();
  const countCart = useSelector((state) => state.cart.countCart);

  const handleAddToCart = async () => {
    // console.log(productData.variants);
    const data = {
      sellerId: productData.sellerId,
      variantId: productData.variants[selectVariant].id,
      quantity: 1,
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

  // const getCartFromApi = async () => {
  //   if (accessToken) {
  //     await apiCart
  //       .getCart({
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           // "Content-Type": "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         const data = res.data.result;
  //         // console.log(data);

  //         dispatch(SET_CART_FROM_API(data));
  //       })
  //       .catch((err) => console.log(err));
  //   }
  // };

  // useEffect(() => {
  //   if (accessToken) {
  //     getCartFromApi();
  //   }
  // }, [accessToken]);

  return (
    <div className="container mx-auto px-4 py-6 bg-white rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <ProductImageSlider productData={productData} />

        <div className="w-full md:w-1/2">
          <h1 className="text-2xl font-bold mb-2">
            {productData?.productName}
          </h1>
          <p className="text-lg text-gray-600 mb-4"></p>
          <div className="flex items-center mb-2">
            <span className="text-yellow-400">★ {product.rating}</span>
            <span className="text-gray-600 ml-2">{product.reviews}</span>
            <span className="text-gray-600 ml-2">| {product.sales}</span>
          </div>
          <div className="bg-orange-100 text-orange-700 text-sm font-semibold px-2 py-1 rounded mb-4 inline-block">
            FLASH SALE
          </div>
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
            <span className="text-sm text-gray-600">Voucher Cửa Shop</span>
            <div className="flex space-x-2 mt-1">
              {product.vouchers.map((voucher, index) => (
                <span
                  key={index}
                  className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded"
                >
                  {voucher}
                </span>
              ))}
              <a href="/" className="text-xs text-blue-500 hover:underline">
                Xem tất cả
              </a>
            </div>
          </div>
          <div className="mb-4">
            <span className="text-sm text-gray-600">Vận Chuyển</span>
            <p className="text-xs text-gray-600 mt-1">
              Nhận từ 24 Th05 - 26 Th05 <br /> Miễn phí vận chuyển <br /> Tặng
              Voucher 15.000 nếu đơn giao sau 48h từ khi nhận.
            </p>
          </div>
          <div className="mb-4">
            <span className="text-sm text-gray-600">An Tâm Mua</span>
            <p className="text-xs text-gray-600 mt-1">
              Trả hàng miễn phí 15 ngày - Chính hãng 100% - Miễn phí vận chuyển
              - B. . .
            </p>
          </div>
          <div className="mb-4">
            <span className="text-sm text-gray-600">Lựa chọn</span>
            <div className="grid grid-cols-4 gap-2 mt-1">
              {productData.variants.map((v, index) => (
                <button
                  key={index}
                  className={`text-md px-2 py-1 rounded border border-gray-400 text-gray-800 hover:bg-blue-500 hover:border-none hover:text-white capitalize ${
                    index === selectVariant &&
                    "font-bold bg-blue-500 text-white"
                  }
                    `}
                  disabled={v.stock <= 0}
                  onClick={() => handleChangeVariant(index)}
                >
                  {v.variantName}
                </button>
              ))}
            </div>
          </div>
          <div className="flex space-x-4">
            <button
              className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 transition-colors duration-300"
              onClick={handleAddToCart}
            >
              Thêm Vào Giỏ Hàng
            </button>
            <button className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition-colors duration-300">
              Mua Ngay
            </button>
          </div>
          <div className="mt-4 flex space-x-2">
            <button className="text-blue-500 hover:underline">Chia sẻ:</button>
            <span className="text-gray-600">😀</span>
            <span className="text-blue-500">Facebook</span>
            <span className="text-blue-500">Twitter</span>
            <span className="text-red-500">❤️ Đã thích (7K)</span>
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
  );
};

export default Detail;
