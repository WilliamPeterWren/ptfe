import React from "react";
import { imageUrl } from "../../../api/config";
const ProductCard = (props) => {
  const { productName, variants, productImages } = props;
  console.log(props);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <img
        src={imageUrl + "product/" + productImages[0]}
        alt={productName}
        className="w-full h-48 object-cover"
        onError={(e) => {
          const target = e.target;
          target.onerror = null;
          const retryInterval = 2000;
          let retryCount = 0;
          const maxRetries = 5;

          const retryLoad = () => {
            if (retryCount < maxRetries) {
              retryCount++;
              target.src = imageUrl + "product/" + `?retry=${retryCount}`;
              target.onerror = () => {
                setTimeout(retryLoad, retryInterval);
              };
            } else {
              target.src = "https://placehold.co/32x32/cccccc/333333?text=N/A";
            }
          };

          setTimeout(retryLoad, retryInterval);
        }}
        loading="lazy"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800">
          {productName.slice(0, 17) + ".."}
        </h3>

        {variants?.[0]?.salePrice > 0 ? (
          <div>
            <p className="text-red-600 font-bold">
              {variants?.[0]?.salePrice?.toLocaleString("de-DE")} VND
            </p>
            <p className="text-gray-500 line-through">
              {variants?.[0]?.price?.toLocaleString("de-DE")} VND
            </p>
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
              {Math.round(
                ((variants?.[0]?.price - variants?.[0]?.salePrice) /
                  variants?.[0]?.price) *
                  100,
                2
              )}
              % OFF
            </span>
          </div>
        ) : (
          <p className="text-red-600 font-bold">
            {variants?.[0]?.price.toLocaleString()} VND
          </p>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
