import React from "react";
import { imageUrl } from "../../../api/config";

function Banner() {
  const times = [
    { time: "12:00", label: "Đang Diễn Ra", hour: 12 },
    { time: "15:00", label: "Sắp Diễn Ra", hour: 15 },
    { time: "17:00", label: "Sắp Diễn Ra", hour: 17 },
    { time: "19:00", label: "Sắp Diễn Ra", hour: 19 },
    { time: "21:00", label: "Sắp Diễn Ra", hour: 21 },
  ];

  const currentHour = 14;

  const handleCurrentFlashSale = () => {};
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
        {times.map((item, index) => {
          const isActive =
            currentHour >= item.hour &&
            (index === times.length - 1 || currentHour < times[index + 1].hour);
          return (
            <button
              key={index}
              className={`px-4 py-2 rounded-t-lg font-semibold text-sm ${
                isActive
                  ? "bg-orange-500 text-white"
                  : "bg-gray-700 text-white hover:bg-gray-600"
              }`}
              onClick={() => handleCurrentFlashSale}
            >
              <span className="block">{item.time}</span>
              <span className="block text-xs">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Banner;
