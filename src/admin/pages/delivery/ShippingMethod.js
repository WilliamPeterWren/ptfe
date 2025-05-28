import React, { useState } from "react";

const shippingMethods = [
  "Shopee Express",
  "BEST Express",
  "Giao Hàng Nhanh",
  "Giao Hàng Tiết Kiệm",
];

const ShippingOptions = () => {
  const [enabledMethods, setEnabledMethods] = useState({
    "Shopee Express": true,
    "BEST Express": false,
    "Giao Hàng Nhanh": true,
    "Giao Hàng Tiết Kiệm": true,
  });

  const toggleMethod = (method) => {
    setEnabledMethods((prev) => ({
      ...prev,
      [method]: !prev[method],
    }));
  };

  return (
    <div className="bg-white rounded shadow p-4 max-w-xl mx-auto">
      {shippingMethods.map((method) => (
        <div
          key={method}
          className="flex items-center justify-between border-b py-4 last:border-b-0"
        >
          <span className="text-sm font-medium">{method}</span>
          <button
            onClick={() => toggleMethod(method)}
            className={`w-12 h-6 flex items-center rounded-full p-1 transition-colors ${
              enabledMethods[method] ? "bg-green-500" : "bg-gray-300"
            }`}
          >
            <div
              className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform ${
                enabledMethods[method] ? "translate-x-6" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      ))}
    </div>
  );
};

export default ShippingOptions;
