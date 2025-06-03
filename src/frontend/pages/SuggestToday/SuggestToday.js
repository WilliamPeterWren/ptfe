import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";

import apiProduct from "../../../api/apiProduct";
import { imageUrl } from "../../../api/config";
function SuggestToday() {
  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    console.log("asdlk");
    await apiProduct
      .getRandomProducts(48)
      .then((res) => {
        console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const pageTitle = "Gợi ý hôm nay";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  return (
    <div className="container py-6">
      <div className="flex justify-center items-center mb-8 w-full">
        <hr className="flex-1 border-t border-gray-300" />
        <h2 className="text-xl font-bold uppercase bg-red-600 rounded-lg p-4 text-white">
          Gợi Ý Hôm Nay
        </h2>
        <hr className="flex-1 border-t border-gray-300" />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {products.map((product, index) => {
          const imgUrl = imageUrl + "product/" + product.productImages[0];

          return (
            <Link
              to={`/product-detail/${product.slug}`}
              key={index}
              className="border rounded-lg overflow-hidden shadow-md"
            >
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
                      target.src =
                        imageUrl + "product/" + `?retry=${retryCount}`;
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
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs bg-gray-200 text-gray-700 px-1 rounded">
                    {product.description.slice(0, 20) + "..."}
                  </span>
                  {product.variants[0].salePrice > 1000 && (
                    <span className="text-xs text-red-500 ml-1 rounded p-0.5 border border-red-400">
                      {Math.round(
                        ((product.variants[0].price -
                          product.variants[0].salePrice) /
                          product.variants[0].price) *
                          100
                      ) + "%"}
                    </span>
                  )}
                </div>
                <p className="text-sm text-gray-800 line-clamp-2">
                  {product.productName.slice(0, 20) + "..."}
                </p>
                {product.variants[0].salePrice > 0 ? (
                  <p className="text-md font-bold text-red-600 flex justify-between">
                    <span className="line-through text-gray-400 text-sm">
                      {product.variants[0].price.toLocaleString()}
                    </span>
                    <span className="">
                      {product.variants[0].salePrice.toLocaleString()}
                    </span>
                  </p>
                ) : (
                  <p className="text-md font-bold text-red-600">
                    {product.variants[0].price.toLocaleString()}
                  </p>
                )}

                <p className="text-xs text-gray-600">
                  Kho: {product.variants[0].stock.toLocaleString()}
                </p>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="flex justify-center mt-6">
        <div className="flex justify-center bg-blue-300 rounded-lg h-[40px] flex items-center">
          <button className="px-6 py-2 text-white font-semibold uppercase transition-colors duration-300 hover:bg-blue-400 rounded-lg w-[400px] hover:text-gray-100">
            Xem Thêm
          </button>
        </div>
      </div>
    </div>
  );
}

export default SuggestToday;
