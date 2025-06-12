import React from "react";
import { Link } from "react-router-dom";
import { imageUrl } from "../../../api/config";

const ProductCard = (props) => {
  const { product } = props;

  // console.log(props);

  const imgUrl = imageUrl + "product/" + product?.productImages?.[0];

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <Link to={`/product-detail/${product.slug}`}>
        <img
          src={imgUrl}
          alt={product.productName}
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
                target.src =
                  "https://placehold.co/32x32/cccccc/333333?text=N/A";
              }
            };
            setTimeout(retryLoad, retryInterval);
          }}
          loading="lazy"
        />
        <div className="p-4">
          <h3 className="max-h-16 text-md font-semibold text-gray-800">
            {product.productName.length < 32
              ? product.productName.slice(0, 32)
              : product.productName.slice(0, 32) + "..."}
          </h3>
          {product.variants[0].salePrice > 0 ? (
            <div>
              <p className="h-8 text-red-600 font-bold">
                {product.variants[0].salePrice.toLocaleString()} VND
              </p>
              <p className="h-8 text-gray-500 line-through">
                {product.variants[0].price.toLocaleString()} VND
              </p>
            </div>
          ) : (
            <div>
              <p className="h-8"></p>
              <p className="h-8 text-red-600 font-bold">
                {product.variants[0].price.toLocaleString()} VND
              </p>
            </div>
          )}
          {product.variants[0].salePrice > 0 && (
            <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
              {(
                ((product.variants[0].price - product.variants[0].salePrice) /
                  product.variants[0].price) *
                100
              ).toFixed(1)}
              % OFF
            </span>
          )}
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
