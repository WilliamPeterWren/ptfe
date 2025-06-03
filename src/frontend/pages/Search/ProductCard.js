import React from "react";
import { imageUrl } from "../../../api/config";
import { Link } from "react-router-dom";

const ProductCard = (props) => {
  const { productName, variants, productImages, slug } = props;
  console.log(props);
  return (
    <Link
      to={`/product-detail/${slug}`}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
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
              target.src =
                imageUrl +
                "product/" +
                `${productImages[0]}?retry=${retryCount}`;
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
        <h3 className="text-lg font-semibold text-gray-800">{productName}</h3>
        {variants[0]?.salePrice > 0 ? (
          <div>
            <p className="text-red-600 font-bold">
              {variants[0]?.salePrice} VND
            </p>
            <p className="text-gray-500 line-through">
              {variants[0].price} VND
            </p>
          </div>
        ) : (
          <div>
            <p className="text-red-600 font-bold">{variants[0].price} VND</p>
          </div>
        )}

        <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
          {Math.round(
            ((variants[0].price - variants[0]?.salePrice) / variants[0].price) *
              100,
            2
          )}
          % OFF
        </span>
      </div>
    </Link>
  );
};

export default ProductCard;
