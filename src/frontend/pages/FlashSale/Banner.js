import React from "react";
import { imageUrl } from "../../../api/config";

function Banner({ flashsales, setCurrentFlashsale }) {
  const handleCurrentFlashSale = (id) => {
    setCurrentFlashsale(id);
  };
  return (
    <div className=" mt-4 mx-auto mx-80">
      <img
        alt="flash_sale"
        src={imageUrl + "flashsale/flashsale banner.jpg"}
        onError={(e) => {
          e.target.onerror = null;
          // e.target.src = defaultImage(item);
        }}
        className="mx-auto h-48 object-cover"
      />

      <div className="flex justify-center space-x-2 pt-2 bg-gray-100">
        {flashsales.map((item, index) => {
          const isActive = item.startedAt > Date.now();

          return (
            <button
              key={index}
              className={`px-4 py-2 rounded-t-lg font-semibold text-sm ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() => handleCurrentFlashSale(item.id)}
            >
              <span className="block">
                {new Date(item.startedAt).toLocaleString("vi-VN", {
                  // day: "2-digit",
                  // month: "2-digit",
                  // year: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                  second: "2-digit",
                  hour12: false,
                })}
              </span>
              <span className="block text-xs capitalize">
                {isActive ? "Đang diễn ra" : "Sắp diễn ra"}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Banner;
