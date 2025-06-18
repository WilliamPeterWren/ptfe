import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";

import apiProduct from "../../../api/apiProduct";
import { imageUrl } from "../../../api/config";

const PeterMall = () => {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await apiProduct
      .getRandomProducts(48)
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

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
        <h2 className="text-xl font-bold uppercase">Peter Mall</h2>
        <div className="flex space-x-2 text-sm text-gray-600">
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 3h18M3 9h18M3 15h18M3 21h18"
              />
            </svg>
            Trả Hàng Miễn Phí 15 Ngày
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
            Hàng Chính Hãng 100%
          </span>
          <span className="flex items-center">
            <svg
              className="w-4 h-4 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm0 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z"
              />
            </svg>
            Miễn Phí Vận Chuyển
          </span>
        </div>
        {/* <a href="/" className="text-sm text-blue-500 hover:underline">
          Xem Tất Cả
        </a> */}
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="w-full md:w-1/4">
          <div className="bg-gradient-to-r from-red-500 to-orange-500 text-white rounded-lg p-4 text-center">
            <h3 className="text-2xl font-bold uppercase mb-2">
              Săn Deal Siêu Hot
            </h3>
            <p className="text-sm mb-4">Ưu đãi đến 50%</p>
            <div className="flex justify-center space-x-2">
              <span className="text-xs bg-white text-red-500 px-2 py-1 rounded">
                Voucher Peter
              </span>
              <span className="text-xs bg-white text-red-500 px-2 py-1 rounded">
                Giảm đến 50%
              </span>
            </div>
          </div>
        </div>

        <div className="w-full md:w-3/4">
          <Slider {...settings}>
            {products.map((deal, index) => {
              const imgUrl = imageUrl + "product/" + deal.productImages[0];

              return (
                <div key={index} className="px-2">
                  <Link to={`/product-detail/${deal.slug}`}>
                    <div className="flex flex-col items-center border rounded-lg p-2">
                      <img
                        src={imgUrl}
                        alt={deal.productName}
                        className="w-24 h-24 object-contain mb-2"
                        onError={(e) => {
                          e.target.onerror = null;
                          // e.target.src = defaultImage(item);
                        }}
                        loading="lazy"
                      />
                      <p className="text-sm font-semibold text-gray-800">
                        {deal.productName.slice(0, 30) + "..."}
                      </p>
                      <p className="text-xs text-red-500">
                        {deal.variants[0].price.toLocaleString("de-DE")} VND
                      </p>
                    </div>
                  </Link>
                </div>
              );
            })}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default PeterMall;
