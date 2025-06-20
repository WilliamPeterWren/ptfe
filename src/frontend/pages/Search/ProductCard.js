import React from "react";
import { imageUrl } from "../../../api/config";
import { Link } from "react-router-dom";
const ProductCard = (props) => {
  const { productName, variants, productImages, slug, discount, sold } = props;
  // console.log(props);

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
        <h3 className="h-16 text-md font-normal text-gray-800">
          {productName.length > 40
            ? productName.slice(0, 40) + ".."
            : productName}
        </h3>
        <p className="h-8 text-md font-normal text-orange-600">
          {" "}
          {discount > 0 && discount.toLocaleString() + "VND"}
        </p>
        <p className="h-8 text-md font-normal text-orange-600">
          {" "}
          Đã bán: {sold}
        </p>

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
    </Link>
  );
};

export default ProductCard;
