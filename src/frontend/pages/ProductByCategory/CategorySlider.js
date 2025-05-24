import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { imageUrl } from "../../../api/config";

function CategorySlider() {
  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    dots: true,
  };

  const carouselImages = [
    "slider001.jpg",
    "slider002.jpg",
    "slider003.jpg",
    "slider004.jpg",
    "slider005.jpg",
    "slider006.jpg",
  ];
  return (
    <div className="w-full md:w-full bg-white">
      <Slider {...settings}>
        {carouselImages.map((src, index) => (
          <div key={index} className="outline-none">
            <img
              src={`${imageUrl}/slider/${src}`}
              alt={`Carousel Slide ${index + 1}`}
              className="w-full h-[300px] object-cover rounded-lg"
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CategorySlider;
