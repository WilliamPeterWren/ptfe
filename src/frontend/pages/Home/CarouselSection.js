import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { imageUrl } from "../../../api/config";

const CarouselSection = () => {
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

  const rightBanners = [
    { src: "upslider.jpg", alt: "Upper Banner" },
    { src: "downslider.jpg", alt: "Lower Banner" },
  ];

  return (
    <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row gap-4">
      <div className="w-full md:w-[800px] h-[300px]">
        <Slider {...settings}>
          {carouselImages.map((src, index) => (
            <div key={index} className="outline-none">
              <img
                src={`${imageUrl}/slider/${src}`}
                alt={`Carousel Slide ${index + 1}`}
                className="w-full h-[300px] object-cover rounded-lg"
              />
            </div>
          ))}
        </Slider>
      </div>

      <div className="w-full md:w-[400px] flex flex-col gap-4">
        {rightBanners.map((banner, index) => (
          <div key={index} className="w-full h-[145px]">
            <img
              src={`${imageUrl}/slider/${banner.src}`}
              alt={banner.alt}
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;
