import React, { useState, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link, useNavigate } from "react-router-dom";

import apiProduct from "../../../api/apiProduct";
import { imageUrl } from "../../../api/config";

const FromSeller = ({ sellerId }) => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const getProduct = useCallback(async () => {
    try {
      const res = await apiProduct.getProductBySellerId(sellerId);
      console.log(res.data.result);
      setProducts(res.data.result.content);
      // setOnload(!onload);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getProduct();
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

  const handleChangeSlug = (slug) => {
    navigate(`/product-detail/${slug}`);
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-white mt-4 rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold uppercase">
          CÁC SẢN PHẨM KHÁC CỦA SHOP
        </h2>
        <Link
          to={`/seller/page`}
          className="text-sm text-blue-500 hover:underline"
        >
          Xem Tất Cả
        </Link>
      </div>

      <div className="w-full">
        <Slider {...settings}>
          {products.length > 0 &&
            products?.map((item, index) => {
              const imgUrl = imageUrl + "product/" + item.productImages[0];
              return (
                <div key={index} className="px-2">
                  <button onClick={() => handleChangeSlug(item.slug)}>
                    <div className="relative border rounded-lg p-2">
                      <span className="absolute top-0 left-0 bg-orange-500 text-white text-xs font-semibold px-2 py-1 rounded-tl-lg rounded-br-lg">
                        TOP
                      </span>
                      <img
                        src={imgUrl}
                        alt={item.productName}
                        className="w-full h-32 object-contain mb-2"
                        onError={(e) => {
                          const target = e.target;
                          target.onerror = null;
                          const retryInterval = 2000;
                          let retryCount = 0;
                          const maxRetries = 5;
                          const retryLoad = () => {
                            if (retryCount < maxRetries) {
                              retryCount++;
                              target.src =
                                imageUrl + "product/" + `?retry=${retryCount}`;
                              target.onerror = () => {
                                setTimeout(retryLoad, retryInterval);
                              };
                            } else {
                              target.src =
                                "https://placehold.co/32x32/cccccc/333333?text=N/A";
                            }
                          };
                          setTimeout(retryLoad, retryInterval);
                        }}
                        loading="lazy"
                      />
                      <p className="text-xs text-gray-600">{item.sales}</p>
                      <p className="text-sm font-semibold text-gray-800">
                        {item.productName.slice(0, 25) + "..."}
                      </p>
                    </div>
                  </button>
                </div>
              );
            })}
        </Slider>
      </div>
    </div>
  );
};

export default FromSeller;
