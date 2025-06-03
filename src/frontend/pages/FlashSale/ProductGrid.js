import React, { useState, useEffect } from "react";

import apiFlashSale from "../../../api/apiFlashSale";
import { imageUrl } from "../../../api/config";
import { Link } from "react-router-dom";

const ProductGrid = () => {
  const [flashsale, setFlashsale] = useState([]);

  const getProductByFlashsaleIdPage = async () => {
    await apiFlashSale
      .getProductByFlashsaleIdPage("6837307aa2f0fb78e1704ddf")
      .then((res) => {
        console.log(res.data.result);
        setFlashsale(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProductByFlashsaleIdPage();
  }, []);

  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {flashsale.map((product, index) => {
        const imgUrl = imageUrl + "product/" + product.images[0];
        return (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <Link to={`/product-detail/${product.slug}`}>
              <img
                src={imgUrl}
                alt={product.productName}
                className="w-full h-48 object-cover"
              />
            </Link>
            <div className="p-4">
              <div className="flex justify-between items-start mb-2">
                {product.stock && (
                  <span className="text-sm bg-orange-500 text-white px-2 py-1 rounded">
                    {product.stock}
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold line-clamp-2">
                {product.productName}
              </h3>
              {product.discount && (
                <span className="text-red-500 text-xs border border-red-400 p-0.5 rounded">
                  -{product.discount.toLocaleString()}
                </span>
              )}
              {product.salePrice > 0 ? (
                <p>
                  <p className="text-md font-bold text-gray-500 mt-1 line-through">
                    {product.price.toLocaleString()} đ
                  </p>
                  <p className="text-lg font-bold text-red-600 mt-1">
                    {product.salePrice.toLocaleString()} đ
                  </p>
                </p>
              ) : (
                <p className="text-lg font-bold text-red-600 mt-1">
                  {product.price.toLocaleString()} đ
                </p>
              )}

              <button className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
                Mua Ngay
              </button>
            </div>
            img
          </div>
        );
      })}
    </div>
  );
};

export default ProductGrid;
