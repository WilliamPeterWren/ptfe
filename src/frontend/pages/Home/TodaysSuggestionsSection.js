import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import apiProduct from "../../../api/apiProduct";
import apiPeterCategory from "../../../api/apiPeterCategory";

import { imageUrl } from "../../../api/config";

const RecommendationsSection = () => {
  const [products, setProducts] = useState([]);
  const [peterCategories, setPeterCategories] = useState([]);

  const getProducts = async () => {
    await apiProduct
      .getRandomProducts(48)
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const getPeterCategories = async () => {
    await apiPeterCategory
      .getAll()
      .then((res) => {
        // console.log(res.data.result);
        setPeterCategories(res.data.result);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPeterCategories();
  }, []);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-4 w-full">
        <h2 className="text-xl font-bold uppercase">Gợi Ý Hôm Nay</h2>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product, index) => {
          const imgUrl = imageUrl + "product/" + product.productImages[0];
          return (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-md"
            >
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
                        target.src = imgUrl + `?retry=${retryCount}`;
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
                <div className="p-2 bg-white">
                  <div className="flex items-center mb-1">
                    <span className="text-xs bg-gray-200 text-gray-700 px-1 rounded">
                      {peterCategories.length > 0 &&
                        peterCategories?.map((p) => {
                          if (product.peterCategory === p.id) {
                            return p.name;
                          }
                        })}
                    </span>
                  </div>
                  <p className="h-16 text-sm text-gray-800 line-clamp-2">
                    {product.productName}
                  </p>
                  {product.variants[0].salePrice > 0 ? (
                    <div>
                      <p className="h-8 text-lg font-bold text-gray-400 line-through">
                        {product.variants[0].price.toLocaleString("de-DE")} đ
                      </p>
                      <p className="h-8 text-lg font-bold text-red-600">
                        {product.variants[0].salePrice.toLocaleString("de-DE")}{" "}
                        đ
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="h-16 text-lg font-bold text-red-600">
                        {product.variants[0].price.toLocaleString("de-DE")}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className="text-xs text-gray-600">
                      Kho: {product.variants[0].stock.toLocaleString("de-DE")}
                    </p>
                    <p className="text-xs text-gray-600">
                      Đã bán: {product.sold.toLocaleString("de-DE")}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex justify-center bg-blue-300 rounded-lg h-[40px] flex items-center">
          <Link to="/todaysuggest">
            <button className="px-6 py-2 text-white font-semibold uppercase transition-colors duration-300 hover:bg-blue-400 rounded-lg w-[400px] hover:text-gray-100">
              Xem Thêm
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RecommendationsSection;
