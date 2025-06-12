import React, { useState, useRef, useEffect } from "react";

import { imageUrl } from "../../../api/config";

const ProductImageSlider = (props) => {
  const { product } = props;

  const [mainImage, setMainImage] = useState(product?.productImages[0]);
  const scrollContainerRef = useRef(null);

  const images = product?.productImages;

  useEffect(() => {
    const interval = setInterval(() => {
      setMainImage((prevImage) => {
        const currentIndex = images?.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images?.length;
        return images[nextIndex];
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  const handleImageClick = (image) => {
    setMainImage(image);
  };

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -200,
        behavior: "smooth",
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="w-full h-96 mb-4">
        <img
          src={imageUrl + "product/" + mainImage}
          alt="Main Product"
          className="w-full h-full object-cover rounded-lg shadow-md"
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
                  imageUrl + `product/` + `${mainImage}?retry=${retryCount}`;
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
      </div>

      <div className="relative">
        <button
          onClick={scrollLeft}
          className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700"
          aria-label="Scroll left"
        >
          ←
        </button>
        <div
          ref={scrollContainerRef}
          className="flex overflow-x-hidden space-x-2 pb-2 scroll-smooth"
          style={{ scrollBehavior: "smooth" }}
        >
          {images?.map((image, index) => (
            <img
              key={index}
              src={imageUrl + "product/" + image}
              alt={`Product ${index + 1}`}
              className={`w-24 h-24 object-cover rounded-md cursor-pointer transition-all duration-300 flex-shrink-0 ${
                mainImage === image
                  ? "border-2 border-blue-500"
                  : "border-2 border-transparent"
              } hover:opacity-80`}
              onClick={() => handleImageClick(image)}
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
                      imageUrl + "product/" + `${image}?retry=${retryCount}`;
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
          ))}
        </div>
        <button
          onClick={scrollRight}
          className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full z-10 hover:bg-gray-700"
          aria-label="Scroll right"
        >
          →
        </button>
      </div>
    </div>
  );
};

export default ProductImageSlider;
