import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import apiProduct from "../../../api/apiProduct";
import { imageUrl } from "../../../api/config";
import ProductItem from "./ProductItem";
function ManageAllProduct() {
  const accessToken = Cookies.get("accessToken");

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  // const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalElements, setTotalElements] = useState(0);
  const [isFirst, setIsFirst] = useState(true);
  const [isLast, setIsLast] = useState(true);

  const getAllProducts = async () => {
    setLoading(false);
    try {
      const res = await apiProduct.adminGetAll(currentPage, size, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data.result;
      console.log(data);
      setProducts(data.content);
      setTotalPages(data.totalPages);
      setCurrentPage(data.number);
      setTotalElements(data.totalElements);
      setIsFirst(data.first);
      setIsLast(data.last);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (accessToken && loading) {
      getAllProducts();
    }
  }, [accessToken, loading]);

  const handlePrevProductsData = async () => {
    setCurrentPage(currentPage - 1);
    setLoading(true);
  };

  const handleNextProductsData = async () => {
    setCurrentPage(currentPage + 1);
    setLoading(true);
  };

  const handleGetProductsData = async (index) => {
    setCurrentPage(index);
    setLoading(true);
  };

  if (products.length === 0) {
    return null;
  }

  return (
    <div className="px-8 mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm lg:col-span-2">
          <h3 className="text-lg font-bold text-orange-700 mb-4">
            Danh sách toàn bộ sản phẩm / {totalElements}
          </h3>
          <hr className="border border-blue-500 " />
          <div className="space-y-2 mb-4 pb-2">
            {products.map((product, index) => (
              <ProductItem
                key={index}
                product={product}
                setLoading={setLoading}
              />
            ))}
          </div>

          <div className="mb-6 mr-8 flex justify-end items-center mt-6 space-x-2 text-sm">
            {!isFirst && (
              <button
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={handlePrevProductsData}
              >
                &lt;
              </button>
            )}

            {(() => {
              const pageButtons = [];
              const maxButtons = 5;
              const sideCount = 1;

              const startPage = Math.max(0, currentPage - sideCount);
              const endPage = Math.min(totalPages - 1, currentPage + sideCount);

              if (startPage > 0) {
                pageButtons.push(
                  <button
                    key={0}
                    className={`px-3 py-1 ${
                      currentPage === 0
                        ? "bg-blue-500 text-white"
                        : "border border-blue-500"
                    } rounded-md`}
                    onClick={() => handleGetProductsData(0)}
                  >
                    1
                  </button>
                );
                if (startPage > 1) {
                  pageButtons.push(
                    <span key="start-ellipsis" className="px-2">
                      ...
                    </span>
                  );
                }
              }

              for (let i = startPage; i <= endPage; i++) {
                pageButtons.push(
                  <button
                    key={i}
                    className={`px-3 py-1 ${
                      currentPage === i
                        ? "bg-blue-500 text-white"
                        : "border border-blue-500"
                    } rounded-md`}
                    onClick={() => handleGetProductsData(i)}
                  >
                    {i + 1}
                  </button>
                );
              }

              if (endPage < totalPages - 1) {
                if (endPage < totalPages - 2) {
                  pageButtons.push(
                    <span key="end-ellipsis" className="px-2">
                      ...
                    </span>
                  );
                }
                pageButtons.push(
                  <button
                    key={totalPages - 1}
                    className={`px-3 py-1 ${
                      currentPage === totalPages - 1
                        ? "bg-blue-500 text-white"
                        : "border border-blue-500"
                    } rounded-md`}
                    onClick={() => handleGetProductsData(totalPages - 1)}
                  >
                    {totalPages}
                  </button>
                );
              }

              return pageButtons;
            })()}

            {!isLast && (
              <button
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={handleNextProductsData}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageAllProduct;
