import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import apiUser from "../../../api/apiUser";
import UserContext from "../../../context/userContext";
import apiProduct from "../../../api/apiProduct";
import apiCategory from "../../../api/apiCategory";
import apiPeterCategory from "../../../api/apiPeterCategory";
import { imageUrl } from "../../../api/config";

const ProductList = () => {
  const navigate = useNavigate();
  const sellerId = Cookies.get("id");

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [petercategories, setPeterCategories] = useState([]);

  const getProducts = async () => {
    await apiProduct
      .getProductBySellerId(sellerId)
      .then((res) => {
        if (res.status === 200) {
          const data = res.data.result;
          setProducts(data.content);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getCategories = async () => {
    await apiCategory
      .getAll(sellerId)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data.result);
          setCategories(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  const getPeterCategories = async () => {
    await apiPeterCategory
      .getAll()
      .then((res) => {
        const data = res.data.result;
        // console.log(data);
        setPeterCategories(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
    getCategories();
    getPeterCategories();
  }, []);

  const [searchId, setSearchId] = useState("");
  const [status, setStatus] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const filteredProducts = products?.filter(
    (product) =>
      product.id.toLowerCase().includes(searchId.toLowerCase()) &&
      (status === "" || product.status === status)
  );

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleAddProduct = () => {
    navigate("/admin/product/create");
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-700">Products</h2>
          <p className="text-gray-600">You have total 1,25 products.</p>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Quick search by id"
              className="border rounded px-2 py-1 pl-8"
              value={searchId}
              onChange={handleSearchChange}
            />
            <svg
              className="w-4 h-4 absolute left-2 top-2.5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <select
            className="border rounded px-2 py-1"
            value={status}
            onChange={handleStatusChange}
          >
            <option value="">Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <button
            className="bg-indigo-500 text-white px-4 py-2 rounded flex items-center"
            onClick={handleAddProduct}
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Thêm sản phẩm
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border">
          <thead>
            <tr className="bg-gray-100">
              <th className="py-2 px-4 border-b text-left">
                Tên
              </th>
              <th className="py-2 px-4 border-b text-left">Phân loại</th>
              <th className="py-2 px-4 border-b text-left">Danh mục</th>
              <th className="py-2 px-4 border-b text-left">Ngành hàng</th>
              <th className="py-2 px-4 border-b text-left">•••</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product, index) => {
              const imgUrl = imageUrl + "product/" + product.productImages[0];
              return (
                <tr key={product.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4 border-b align-middle">
                    <div className="flex items-center">
                      <img
                        src={imgUrl}
                        alt={product.productName}
                        className="w-20 h-20 mr-2 object-cover rounded"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/32x32/cccccc/333333?text=N/A";
                        }}
                        loading="lazy"
                      />
                      <span className="font-medium text-gray-800">
                        {product.productName}
                      </span>
                    </div>
                  </td>
                  <td className="py-2 px-4 border-b align-middle">
                    {product.variants && product.variants.length > 0 ? (
                      <div className="flex flex-col space-y-2">
                        {product.variants.map((v, i) => (
                          <div
                            key={i}
                            className="bg-gray-100 p-3 rounded-md shadow-sm border border-gray-200"
                          >
                            <div className="font-semibold text-gray-800 text-sm">
                              {v.variantName}
                            </div>
                            <div className="text-sm text-gray-600">
                              Price:{" "}
                              <span className="font-medium text-indigo-600">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(v.price)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              Stock:{" "}
                              <span className="font-medium text-green-600">
                                {v.stock}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-sm">No variants</span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b align-middle">
                    {categories.find((c) => c.id === product.categoryId)
                      ?.categoryName || (
                      <span className="text-gray-500 text-sm">
                        Không có danh mục
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b align-middle">
                    {petercategories.find((c) => c.id === product.peterCategory)
                      ?.name || (
                      <span className="text-gray-500 text-sm">
                        Không có ngành hàng
                      </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b align-middle relative">
                    <button
                      onClick={() => toggleDropdown(index)}
                      className="text-gray-400 hover:bg-gray-300 rounded-full p-1 transition-colors duration-200"
                    >
                      •••
                    </button>
                    {dropdownOpen === index && (
                      <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                        <ul className="py-1">
                          <li>
                            <Link
                              to={`/admin/product/update/${product.id}`}
                              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M11 5H6a2 2 0 00-2 2v12a2 2 0 002 2h12a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                />
                              </svg>
                              Edit Product
                            </Link>
                          </li>
                          <li>
                            <Link
                              to={`/admin/product/product-detail/${product.id}`}
                              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                              View Product
                            </Link>
                          </li>
                          <li>
                            <button
                              // onClick={() => handleRemoveProduct(product.id)}
                              className="flex items-center w-full px-4 py-2 text-gray-700 hover:bg-gray-100"
                            >
                              <svg
                                className="w-5 h-5 mr-2"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                />
                              </svg>
                              Remove Product
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
