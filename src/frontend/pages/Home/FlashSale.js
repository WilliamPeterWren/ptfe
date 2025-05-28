import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageUrl } from "../../../api/config";

const FlashSaleSection = () => {

  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
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

  const flashSaleItems = [
    {
      src: "https://via.placeholder.com/150x200.png?text=Skincare+AHC",
      label: "Chống Nắng Cấp Sâu 10h",
      price: "đ594.610",
      discount: "-7%",
      badge: "Shopee Mall",
      status: "ĐANG BÁN CHẠY",
    },
    {
      src: "https://via.placeholder.com/150x200.png?text=Máy Ép Chậm",
      label: "Máy Ép Chậm",
      price: "đ1.728.000",
      discount: "-40%",
      badge: "Shopee Mall",
      status: "ĐANG BÁN CHẠY",
    },
    {
      src: "https://via.placeholder.com/150x200.png?text=Combo+Bút",
      label: "Combo Bút",
      price: "đ9.000",
      discount: "-90%",
      badge: "Shopee Mall",
      status: "ĐANG BÁN CHẠY",
    },
    {
      src: "https://via.placeholder.com/150x200.png?text=Áo+Polo",
      label: "Áo Polo",
      price: "đ239.000",
      discount: "-40%",
      badge: "Shopee Mall",
      status: "ĐANG BÁN CHẠY",
    },
    {
      src: "https://via.placeholder.com/150x200.png?text=Kem+Dưỡng",
      label: "Kem Dưỡng",
      price: "đ344.000",
      discount: "-40%",
      badge: "Simplu + Pink",
      status: "CHỈ CÒN 5",
    },
    {
      src: "https://via.placeholder.com/150x200.png?text=Đồ+Chơi+Robot",
      label: "Đồ Chơi Robot",
      price: "đ104.000",
      discount: "-48%",
      badge: "Yeuthich",
      status: "CHỈ CÒN 2",
    },
  ];

  // Slider settings
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 4,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 640, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold uppercase flex items-center">
          <img
            alt="flash_sale"
            src={imageUrl + "flashsale/flash_sale.png"}
            width={100}
            onError={(e) => {
              e.target.onerror = null;
              // e.target.src = defaultImage(item);
            }}
            loading="lazy"
            className="mx-3"
          />
          <span className="ml-2 text-white bg-red-500 px-2 py-1 rounded-lg">
            {timeLeft.hours} {timeLeft.minutes} {timeLeft.seconds}
          </span>
        </h2>
        <a href="/" className="text-sm text-blue-500 hover:underline">
          Xem tất cả
        </a>
      </div>

      <div className="w-full">
        <Slider {...settings}>
          {flashSaleItems.map((item, index) => (
            <div key={index} className="px-2">
              <div className="border rounded-lg overflow-hidden shadow-md">
                <img
                  src={item.src}
                  alt={item.label}
                  className="w-full h-48 object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    // e.target.src = defaultImage(item);
                  }}
                  loading="lazy"
                />
                <div className="p-2 bg-white">
                  <div className="flex items-center mb-1">
                    <span className="text-xs bg-gray-200 text-gray-700 px-1 rounded">
                      {item.badge}
                    </span>
                    <span className="text-xs text-red-500 ml-1">
                      {item.discount}
                    </span>
                  </div>
                  <p className="text-sm text-gray-800 line-clamp-2">
                    {item.label}
                  </p>
                  <p className="text-lg font-bold text-red-600">{item.price}</p>
                  <p className="text-xs text-orange-500">{item.status}</p>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default FlashSaleSection;
