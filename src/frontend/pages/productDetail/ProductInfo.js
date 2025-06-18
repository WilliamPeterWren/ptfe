import React from "react";

const ProductInfo = ({ product }) => {
  return (
    <div className="max-w-[1540px] mt-4 mx-auto bg-white rounded-lg shadow-md p-6">
      <div className="flex justify-items">
        <div className="w-1/3 p-2">
          <h2 className="text-md font-semibold text-gray-800 mb-4 pb-1 border-b border-red-400">
            CHI TIẾT SẢN PHẨM
          </h2>
          <div className="space-y-2 text-sm text-gray-700">
            {product?.infos.map((spec, index) => (
              <div key={index} className="flex justify-between border-b p-1">
                <span className="text-md text-gray-600 uppercase">{spec.name}</span>
                <span
                  className={`text-md font-semibold uppercase ${spec.valueClass || ""}`}
                >
                  {spec.detail}
                </span>
              </div>
            ))}
          </div>
        </div>
        <div className="w-2/3 p-2">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b border-blue-400">
            MÔ TẢ SẢN PHẨM
          </h2>
          <div className="space-y-2 text-md text-gray-700 whitespace-pre-line">
            {product?.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
