import React, { useState, useRef, useEffect } from "react";

const ProductImageSlider = (props) => {
  const [mainImage, setMainImage] = useState(
    "https://via.placeholder.com/600x400?text=Main+Product+Image+1"
  );
  const scrollContainerRef = useRef(null);

  const images = [
    "https://via.placeholder.com/600x400?text=Product+Image+1",
    "https://via.placeholder.com/600x400?text=Product+Image+2",
    "https://via.placeholder.com/600x400?text=Product+Image+3",
    "https://via.placeholder.com/600x400?text=Product+Image+4",
    "https://via.placeholder.com/600x400?text=Product+Image+5",
    "https://via.placeholder.com/600x400?text=Product+Image+6",
    "https://via.placeholder.com/600x400?text=Product+Image+7",
    "https://via.placeholder.com/600x400?text=Product+Image+8",
    "https://via.placeholder.com/600x400?text=Product+Image+9",
    "https://via.placeholder.com/600x400?text=Product+Image+10",
  ];

  // Auto-slide to next image every 1 second
  useEffect(() => {
    const interval = setInterval(() => {
      setMainImage((prevImage) => {
        const currentIndex = images.indexOf(prevImage);
        const nextIndex = (currentIndex + 1) % images.length; // Loop back to first image
        return images[nextIndex];
      });
    }, 1000); // 1 second interval

    return () => clearInterval(interval); // Cleanup on unmount
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
          src={mainImage}
          alt="Main Product"
          className="w-full h-full object-cover rounded-lg shadow-md"
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = defaultImage(item);
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
          {images.map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`Product ${index + 1}`}
              className={`w-24 h-24 object-cover rounded-md cursor-pointer transition-all duration-300 flex-shrink-0 ${
                mainImage === image
                  ? "border-2 border-blue-500"
                  : "border-2 border-transparent"
              } hover:opacity-80`}
              onClick={() => handleImageClick(image)}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
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
