import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { imageUrl } from "../../../api/config";

const PeterMall = ({ categories, setCategoryId }) => {
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
    <div className="container mx-auto px-4 py-6 bg-white mt-10">
      <h2 className="text-xl font-bold uppercase mb-4">PETER MALL</h2>

      <div className="w-full">
        <Slider {...settings}>
          {categories.map((category, index) => (
            <div key={index} className="px-2 ">
              <button onClick={() => setCategoryId(category.id)}>
                <div className="flex flex-col items-center ">
                  <img
                    src={imageUrl + "category/" + category.images}
                    alt={category.name}
                    className="w-16 h-16 object-contain mb-2"
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
                            "category/" +
                            `${category.images}?retry=${retryCount}`;
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
                  <p className="text-sm text-gray-600 text-center">
                    {category.name}
                  </p>
                </div>
              </button>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default PeterMall;
