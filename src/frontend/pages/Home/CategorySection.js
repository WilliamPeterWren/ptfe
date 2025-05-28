import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { imageUrl } from "../../../api/config";
import apiPeterCategory from "../../../api/apiPeterCategory";

const CategoriesSection = () => {
  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    await apiPeterCategory
      .getAll()
      .then((res) => {
        console.log(res.data.result);
        setCategories(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 5,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="container mx-auto px-4 py-6">
      <h2 className="text-xl font-bold uppercase mb-4">Danh Mục</h2>

      <div className="w-full">
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="px-2 ">
              <div className="flex flex-col items-center ">
                <img
                  src={imageUrl + "category/" + category.images}
                  alt={category.name}
                  className="w-16 h-16 object-contain mb-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    // e.target.src = defaultImage(item);
                  }}
                  loading="lazy"
                />
                <p className="text-sm text-gray-600 text-center">
                  {category.name}
                </p>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default CategoriesSection;
