import React, { useState, useEffect, useCallback } from "react";
import { Link, useParams } from "react-router-dom";
import { imageUrl } from "../../../api/config";

const GridProduct = (props) => {
  // const products = Array.from({ length: 6 }, (_, index) => ({
  //   src: `https://via.placeholder.com/150x150.png?text=Product${index + 1}`,
  //   label: `Sản Phẩm ${index + 1}`,
  //   price: `đ${Math.floor(Math.random() * 1000000) + 10000}`,
  //   discount: `-${Math.floor(Math.random() * 50) + 1}%`,
  //   sales: `Bán ${Math.floor(Math.random() * 1000) + 1}K+ /tháng`,
  //   badge: index % 2 === 0 ? "Shopee Mall" : "Yêu Thích",
  // }));

  const { sellerId } = useParams();

  const { name, products } = props;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold uppercase">{name}</h2>
        </div>
        <a href="/" className="text-sm text-blue-500 hover:underline">
          Xem tất cả
        </a>
      </div>

      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product, index) => (
            <Link
              to={`/product-detail/${product.slug}`}
              key={index}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={imageUrl + "product/" + product.productImages[0]}
                alt={product.productName}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  // e.target.src = defaultImage(item);
                }}
                loading="lazy"
              />
              <div className="p-2 bg-white">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs bg-gray-200 text-gray-700 px-1 rounded">
                    Đã bán: {product.sold}
                  </span>
                  <span className="text-xs text-red-500 ml-1">
                    {product.variants[0]?.salePrice > 0 && (
                      <span>
                        Giảm:{" "}
                        <span className="border border-red-500 rounded p-0.5">
                          {(
                            product.variants[0].price -
                            product.variants[0].salePrice
                          ).toLocaleString()}
                        </span>
                      </span>
                    )}
                  </span>
                </div>
                <p className="h-16 text-sm text-gray-800 line-clamp-2">
                  {product.productName}
                </p>
                {product.variants[0]?.salePrice > 0 ? (
                  <div>
                    <p className="h-8 text-lg font-bold text-gray-600 line-through">
                      {product.variants[0].price.toLocaleString()}
                    </p>
                    <p className="h-8 text-lg font-bold text-red-600">
                      {product.variants[0].salePrice.toLocaleString()}
                    </p>
                  </div>
                ) : (
                  <div>
                    <p className="h-8"></p>
                    <p className="h-8 text-lg font-bold text-red-600">
                      {product.variants[0].price.toLocaleString()}
                    </p>
                  </div>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridProduct;
