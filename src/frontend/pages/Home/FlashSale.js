import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { imageUrl } from "../../../api/config";
import apiFlashSale from "../../../api/apiFlashSale";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

const FlashSaleSection = () => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  // const endTime = new Date("2025-06-29T23:59:59+07:00").getTime();
  const [endTime, setEndTime] = useState(null);

  const [flashsale, setFlashsale] = useState([]);

  // const [availableFlashsale, setAvailableFlashsale] = useState([]);
  const [latestFlashsale, setLatestFlashsale] = useState(null);

  const getAvailableFlashsale = async () => {
    try {
      const res = await apiFlashSale.getAll();
      const data = res.data.result;
      // setAvailableFlashsale(data);
      setLatestFlashsale(data[0].id);
      // console.log(data);

      const expires = new Date(data[0].expiredAt);
      setEndTime(expires.getTime());
      Cookies.set("latestFlashsale", data[0].id, { expires: expires });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAvailableFlashsale();
  }, []);

  const getProductByFlashsaleId = async (flashsaleId) => {
    // console.log(flashsaleId);
    await apiFlashSale
      .getProductByFlashsaleId(flashsaleId)
      .then((res) => {
        // console.log(res.data.result);
        setFlashsale(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (latestFlashsale !== null) {
      getProductByFlashsaleId(latestFlashsale);
    }
  }, [latestFlashsale]);

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

  if (latestFlashsale === undefined) {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold uppercase flex items-center">
          <img
            alt="flash_sale"
            src={imageUrl + "flashsale/flash_sale.png"}
            width={100}
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
                    imageUrl +
                    "product/flashsale/flash_sale.png" +
                    `?retry=${retryCount}`;
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
            className="mx-3"
          />
          <span className="ml-2 text-white bg-red-500 px-2 py-1 rounded-lg">
            {timeLeft.hours} : {timeLeft.minutes} : {timeLeft.seconds}
          </span>
        </h2>
        <a href="/flashsale" className="text-sm text-blue-500 hover:underline">
          Xem tất cả
        </a>
      </div>

      <div className="w-full">
        <Slider {...settings}>
          {flashsale.map((item, index) => {
            const imgUrl = imageUrl + "product/" + item.images[0];
            return (
              <div key={index} className="px-2">
                <Link to={`/product-detail/${item.slug}`}>
                  <div className="border rounded-lg overflow-hidden shadow-md">
                    <img
                      src={imgUrl}
                      alt={item.productName}
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        const target = e.target;
                        target.onerror = null;
                        const retryInterval = 2000;
                        let retryCount = 0;
                        const maxRetries = 5;
                        const retryLoad = () => {
                          if (retryCount < maxRetries) {
                            retryCount++;
                            target.src = imgUrl + `?retry=${retryCount}`;
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
                    <div className="p-2 bg-white">
                      <div className="flex items-center mb-1">
                        <span className="text-xs bg-gray-200 text-gray-700 px-1 rounded">
                          Giảm thêm
                        </span>
                        <span className="text-xs text-red-500 ml-1 border border-red-500 p-0.5 rounded">
                          {item.discount.toLocaleString("de-DE")} đ
                        </span>
                      </div>
                      <p className="h-16 text-sm text-gray-800 line-clamp-2">
                        {item.productName}
                      </p>
                      {item.salePrice > 0 ? (
                        <div className="">
                          <p className="h-8 text-lg font-bold text-gray-400 line-through">
                            {item.price.toLocaleString("de-DE")}
                          </p>
                          <p className="h-8 text-lg font-bold text-red-600">
                            {item.salePrice.toLocaleString("de-DE")}
                          </p>
                        </div>
                      ) : (
                        <p className="h-16 text-lg font-bold text-red-600">
                          {item.price.toLocaleString("de-DE")}
                        </p>
                      )}

                      <p className="text-xs text-orange-500">
                        {item?.status || ""}
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </Slider>
      </div>
    </div>
  );
};

export default FlashSaleSection;
