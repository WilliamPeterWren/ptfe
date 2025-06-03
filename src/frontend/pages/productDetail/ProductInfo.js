import React from "react";

const ProductInfo = ({ product }) => {

  return (
    <div className="max-w-[1540px] mt-4 mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-items">
        <div className="w-1/2 p-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-red-400">
            CHI TIẾT SẢN PHẨM
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            {product?.infos.map((spec, index) => (
              <div
                key={index}
                className="flex justify-between bg-gray-100 p-1 rounded-md"
              >
                <span className="text-lg text-gray-600">{spec.name}</span>
                <span
                  className={`text-lg font-semibold ${spec.valueClass || ""}`}
                >
                  {spec.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-1/2 p-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-blue-400">
            MÔ TẢ SẢN PHẨM
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            {product?.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
