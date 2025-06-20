import React, { useState, useEffect } from "react";
import { imageUrl } from "../../../api/config";
import apiProduct from "../../../api/apiProduct";
import { Link, useNavigate } from "react-router-dom";

const Perhap = () => {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    await apiProduct
      .getRandomProducts(20)
      .then((res) => {
        // console.log(res);
        setProducts(res.data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChangeSlug = (slug) => {
    navigate(`/product-detail/${slug}`);
    window.location.reload();
  };

  return (
    <div className="container mx-auto px-4 py-6 bg-white mt-4 rounded-lg">
      <div className="flex justify-between items-center mb-4 w-full">
        <h2 className="text-xl font-bold uppercase">CÓ THỂ BẠN CŨNG THÍCH</h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {products.map((product, index) => {
          const imgUrl = imageUrl + "product/" + product.productImages[0];
          return (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <button onClick={() => handleChangeSlug(product.slug)}>
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
                  <div className="flex items-center mb-1">
                    <span className="text-xs bg-gray-200 text-gray-700 px-1 rounded">
                      {product.variants[0].stock.toLocaleString()}
                    </span>
                  </div>
                  <p className="h-16 text-sm text-gray-800 line-clamp-2 text-left">
                    {product.productName}
                  </p>
                  {product.discount > 0 && (
                    <p className="text-sm text-left font-semibold text-orange-800 line-clamp-2 mt-2 leading-tight rounded ">
                      Shop giảm
                      <span className=" text-orange-600 ml-2">
                        {product.discount.toLocaleString()}
                      </span>
                    </p>
                  )}
                  {product.variants[0]?.salePrice > 0 ? (
                    <div className="h-16 text-left">
                      <p className="text-lg font-bold text-gray-400 line-through">
                        {product.variants[0].price.toLocaleString()}
                      </p>
                      <p className="text-lg font-bold text-red-600">
                        {product.variants[0].salePrice.toLocaleString()}
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="h-8"></p>
                      <p className="h-8 text-lg font-bold text-red-600 text-left">
                        {product.variants[0].price.toLocaleString()}
                      </p>
                    </div>
                  )}

                  <p className="text-xs text-gray-600">{product.sales}</p>
                </div>
              </button>
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

export default Perhap;
