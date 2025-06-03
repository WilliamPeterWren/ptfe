import React, { useState, useEffect } from "react";

import Cookies from "js-cookie";
import { useParams, useNavigate } from "react-router-dom";

import apiProduct from "../../../api/apiProduct";
import apiCategory from "../../../api/apiCategory";
import apiPeterCategory from "../../../api/apiPeterCategory";
import { imageUrl } from "../../../api/config";
import Swal from "sweetalert2";

export default function ProductDetail() {
  const navigate = useNavigate();
  const [isUpdate, setIsUpdate] = useState(true);
  const [activeTab, setActiveTab] = useState("Thông tin cơ bản");
  const [activeSuggestionTab, setActiveSuggestionTab] = useState(
    "Gợi ý điền Thông tin"
  );

  const sellerId = Cookies.get("id");
  const username = Cookies.get("username");

  const { id } = useParams();

  const [product, setProduct] = useState({
    productName: "",
    categoryId: "",
    peterCategory: "",
    productImages: [],
    description: "",
    variants: [],
    infos: [],
  });

  const [categories, setCategories] = useState([]);
  const [petercategories, setPeterCategories] = useState([]);

  const getProduct = async () => {
    await apiProduct
      .getProductById(id)
      .then((res) => {
        const data = res.data.result;
        console.log(data);
        setProduct(data);
      })
      .catch((err) => console.log(err));
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
    getProduct();
    getCategories();
    getPeterCategories();
  }, [id]);

  const [coverImage, setCoverImage] = useState(null);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    setProduct((prev) => ({
      ...prev,
      productImages: files,
    }));
  };

  const handleDeleteImage = (indexToDelete) => {
    setProduct((prev) => ({
      ...prev,
      productImages: prev.productImages.filter(
        (_, index) => index !== indexToDelete
      ),
    }));
  };

  const handleCoverImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCoverImage(URL.createObjectURL(file));
    }
  };

  const handleAddVariant = () => {
    const newVariant = {
      variantName: "",
      price: 0,
      salePrice: 0,
      stock: 0,
    };

    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, newVariant],
    }));
  };

  const handleVariantChange = (index, field, value) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.map((variant, i) =>
        i === index ? { ...variant, [field]: value } : variant
      ),
    }));
  };

  const handleDeleteVariant = (indexToDelete) => {
    setProduct((prev) => ({
      ...prev,
      variants: prev.variants.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleAddInfo = () => {
    setProduct((prev) => ({
      ...prev,
      infos: [...prev.infos, { name: "", detail: "" }],
    }));
  };

  const handleInfoChange = (index, field, value) => {
    setProduct((prev) => ({
      ...prev,
      infos: prev.infos.map((info, i) =>
        i === index ? { ...info, [field]: value } : info
      ),
    }));
  };

  const handleDeleteInfo = (indexToDelete) => {
    setProduct((prev) => ({
      ...prev,
      infos: prev.infos.filter((_, index) => index !== indexToDelete),
    }));
  };

  const handleChangeDescription = (e) => {
    const { value } = e.target;

    setProduct((prev) => ({
      ...prev,
      description: value,
    }));
  };

  const handleChangeProductName = (e) => {
    const { value } = e.target;

    setProduct((prev) => ({
      ...prev,
      productName: value,
    }));
  };

  const handleChangeCategory = (e) => {
    const { value } = e.target;

    setProduct((prev) => ({
      ...prev,
      categoryId: value,
    }));
  };

  const handleChangePeterCategory = (e) => {
    const { value } = e.target;

    setProduct((prev) => ({
      ...prev,
      peterCategory: value,
    }));
  };
  const handleUpdateProduct = async () => {
    const accessToken = Cookies.get("accessToken");
    console.log(product);
    apiProduct
      .updateProduct(product.id, product, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        Swal.fire({
          title: "Cập nhật thành công",
          text: "Sản phẩm đã được cập nhật",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
        navigate("/seller/product/product-list");
      })
      .catch((err) => console.log(err));
  };

  const suggestions = [
    {
      text: "Thêm ít nhất 3 hình ảnh",
      fulfilled: product?.productImages.length >= 3,
    },
    {
      text: "Tên sản phẩm có ít nhất 25-100 kí tự",
      fulfilled:
        product?.productName.length >= 25 && product?.productName.length <= 100,
    },
    {
      text: "Thêm ít nhất 100 kí tự ",
      fulfilled: product?.description.length >= 100,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      {/* Breadcrumbs */}
      <div className="max-w-7xl mx-auto text-sm text-gray-500 mb-4">
        Trang chủ &gt; Sản phẩm &gt;{" "}
        <span className="font-semibold text-gray-700">
          {isUpdate ? "Cập nhật sản phẩm" : "Thông tin phẩm"}
        </span>
      </div>

      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden flex flex-col lg:flex-row">
        {/* Left Sidebar / Suggestions */}
        <div className="w-full lg:w-1/4 border-r border-gray-200 p-4 bg-gray-50">
          <div className="flex flex-col space-y-2">
            {[
              "Gợi ý điền Thông tin",
              "Thông tin cơ bản",
              "Thông tin bán hàng",
              "Vận chuyển",
              "Thông tin khác",
            ].map((tab) => (
              <button
                key={tab}
                className={`py-2 px-3 text-left text-sm font-medium rounded-md ${
                  activeSuggestionTab === tab
                    ? "bg-orange-100 text-orange-700"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSuggestionTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
          {activeSuggestionTab === "Gợi ý điền Thông tin" && (
            <div className="mt-6 space-y-2 text-sm text-gray-600">
              {isUpdate &&
                suggestions.map((suggestion, index) => (
                  <div key={index} className="flex items-center">
                    {suggestion.fulfilled ? (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-green-500 mr-2"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                          clipRule="evenodd"
                        />
                      </svg>
                    ) : (
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-4 w-4 text-gray-400 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    )}
                    <span>{suggestion.text}</span>
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* Main Content */}
        <div className="w-full lg:w-2/3 p-4 sm:p-6">
          {activeTab === "Thông tin cơ bản" && (
            <div>
              <div className="flex justify-between">
                <h2 className="text-xl font-bold text-gray-800 mb-4">
                  Thông tin cơ bản
                </h2>
                <div className="flex justify-between">
                  <button
                    className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-orange-600 transition-colors"
                    onClick={() => setIsUpdate(!isUpdate)}
                  >
                    Chỉnh sửa
                  </button>
                </div>
              </div>

              {/* Product Images */}
              <div className="mb-6 border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  * Hình ảnh sản phẩm
                </h3>
                {isUpdate && (
                  <div className="flex space-x-4 mb-4">
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm">
                      Hình ảnh tỷ lệ 1:1
                    </button>
                    <button className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 text-sm">
                      Hình ảnh tỷ lệ 3:4
                    </button>
                  </div>
                )}

                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 mb-4">
                  {product?.productImages.map((image, index) => (
                    <div
                      key={index}
                      className="relative w-24 h-24 border border-gray-300 rounded-md overflow-hidden flex items-center justify-center bg-gray-100"
                    >
                      <img
                        src={imageUrl + "product/" + image}
                        alt={`Product ${index}`}
                        className="w-full h-full object-cover"
                      />

                      {isUpdate && (
                        <button
                          onClick={() => handleDeleteImage(index)}
                          className="absolute top-1 right-1 bg-black bg-opacity-50 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs hover:bg-opacity-75"
                          aria-label="Delete image"
                        >
                          &times;
                        </button>
                      )}
                    </div>
                  ))}
                  {isUpdate && product?.productImages.length < 9 && (
                    <label className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-md flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 transition-colors">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8 text-gray-400"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M12 4v16m8-8H4"
                        />
                      </svg>
                      <span className="text-xs text-gray-500 mt-1">
                        (0/{9 - product?.productImages.length})
                      </span>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageUpload}
                      />
                    </label>
                  )}
                </div>

                {isUpdate && (
                  <p className="text-sm text-gray-500">
                    Thêm ít nhất 3 hình ảnh
                  </p>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="productName"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  - Tên sản phẩm
                </label>
                <input
                  type="text"
                  id="productName"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
                  placeholder="Tên sản phẩm - Thương hiệu - Model + Thông số kỹ thuật"
                  defaultValue={product?.productName}
                  onChange={handleChangeProductName}
                  maxLength={120}
                  disabled={!isUpdate}
                />
                <p className="text-right text-sm text-gray-500 mt-1">
                  {product?.productName.length}/120
                </p>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  - Danh mục
                </label>
                <div className="relative">
                  <select
                    id="category"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base appearance-none bg-white pr-10"
                    defaultValue={product?.categoryId}
                    onChange={handleChangeCategory}
                    disabled={!isUpdate}
                  >
                    {isUpdate && <option value="">Chọn danh mục</option>}

                    {isUpdate
                      ? categories.map((c, key) => (
                          <option key={key} value={c.id}>
                            {c.categoryName}
                          </option>
                        ))
                      : categories.map((c, key) => {
                          if (c.id === product?.categoryId)
                            return (
                              <option key={key} value={c.id}>
                                {c.categoryName}
                              </option>
                            );
                        })}
                  </select>

                  {isUpdate && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="category"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  - Ngành hàng
                </label>
                <div className="relative">
                  <select
                    id="category"
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base appearance-none bg-white pr-10"
                    defaultValue={product?.peterCategory}
                    onChange={handleChangePeterCategory}
                    disabled={!isUpdate}
                  >
                    {isUpdate && <option value="">Chọn ngành hàng</option>}

                    {isUpdate
                      ? petercategories.map((c, key) => (
                          <option key={key} value={c.id}>
                            {c.name}
                          </option>
                        ))
                      : petercategories.map((c, key) => {
                          if (c.id === product?.peterCategory)
                            return (
                              <option key={key} value={c.id}>
                                {c.name}
                              </option>
                            );
                        })}
                  </select>

                  {isUpdate && (
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                      <svg
                        className="fill-current h-4 w-4"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 6.757 7.586 5.343 9z" />
                      </svg>
                    </div>
                  )}
                </div>
              </div>

              <div className="mb-6 border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  - Phân loại sản phẩm
                </h3>
                {product?.variants.map((variant, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-3 mb-4 p-4 border border-gray-200 rounded-md relative"
                  >
                    {isUpdate && (
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => handleDeleteVariant(index)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Delete variant"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="flex-1">
                      <label
                        htmlFor={`variant-name-${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Tên loại
                      </label>
                      <input
                        type="text"
                        id={`variant-name-${index}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Ví dụ: Màu Đỏ, Size L"
                        defaultValue={variant?.variantName}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "variantName",
                            e.target.value
                          )
                        }
                        disabled={!isUpdate}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor={`variant-price-${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Giá
                      </label>
                      <input
                        type="number"
                        id={`variant-price-${index}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Giá bán"
                        defaultValue={variant.price}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "price",
                            Number(e.target.value)
                          )
                        }
                        min={0}
                        disabled={!isUpdate}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor={`variant-saleprice-${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Giá khuyến mãi
                      </label>
                      <input
                        type="number"
                        id={`variant-saleprice-${index}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Giá bán"
                        defaultValue={variant.salePrice}
                        onChange={(e) =>
                          handleVariantChange(
                            index,
                            "salePrice",
                            Number(e.target.value)
                          )
                        }
                        min={0}
                        disabled={!isUpdate}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor={`variant-stock-${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Kho hàng
                      </label>
                      <input
                        type="number"
                        id={`variant-stock-${index}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Số lượng tồn kho"
                        defaultValue={variant.stock}
                        onChange={(e) =>
                          handleVariantChange(index, "stock", e.target.value)
                        }
                        disabled={!isUpdate}
                      />
                    </div>
                  </div>
                ))}

                {isUpdate && (
                  <button
                    onClick={handleAddVariant}
                    className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Thêm biến phân loại
                  </button>
                )}
              </div>

              <div className="mb-6 border-b border-gray-200 pb-6">
                <h3 className="text-lg font-semibold text-gray-700 mb-3">
                  - Thông tin sản phẩm
                </h3>
                {product?.infos.map((info, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row gap-3 mb-4 p-4 border border-gray-200 rounded-md relative"
                  >
                    {isUpdate && (
                      <div className="absolute top-2 right-2">
                        <button
                          onClick={() => handleDeleteInfo(index)}
                          className="text-red-500 hover:text-red-700"
                          aria-label="Delete info"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M6 18L18 6M6 6l12 12"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                    <div className="flex-1">
                      <label
                        htmlFor={`info-name-${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Tên thông tin
                      </label>
                      <input
                        type="text"
                        id={`info-name-${index}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Ví dụ: Màu sắc"
                        defaultValue={info.name}
                        onChange={(e) =>
                          handleInfoChange(index, "name", e.target.value)
                        }
                        disabled={!isUpdate}
                      />
                    </div>
                    <div className="flex-1">
                      <label
                        htmlFor={`variant-detail-${index}`}
                        className="block text-sm font-medium text-gray-700 mb-1"
                      >
                        Chi tiết
                      </label>
                      <input
                        type="text"
                        id={`info-detail-${index}`}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
                        placeholder="Chi tiết thông tin"
                        defaultValue={info.detail}
                        onChange={(e) =>
                          handleInfoChange(index, "detail", e.target.value)
                        }
                        disabled={!isUpdate}
                      />
                    </div>
                  </div>
                ))}

                {isUpdate && (
                  <button
                    onClick={handleAddInfo}
                    className="mt-4 px-4 py-2 border border-blue-500 text-blue-500 rounded-md hover:bg-blue-50 transition-colors flex items-center"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    Thêm thông tin
                  </button>
                )}
              </div>

              {/* Mô tả sản phẩm */}
              <div className="mb-6">
                <label
                  htmlFor="description"
                  className="block text-lg font-semibold text-gray-700 mb-2"
                >
                  - Mô tả sản phẩm
                </label>
                <textarea
                  id="description"
                  rows="8"
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base"
                  defaultValue={product?.description}
                  onChange={handleChangeDescription}
                  maxLength={3000}
                  disabled={!isUpdate}
                ></textarea>
                <p className="text-right text-sm text-gray-500 mt-1">
                  {product?.description.length}/3000
                </p>
              </div>
            </div>
          )}

          {activeTab === "Thông tin bán hàng" && (
            <div className="text-gray-700">
              <h2 className="text-xl font-bold mb-4">Thông tin bán hàng</h2>
              <p>Có thể điều chỉnh sau khi chọn ngành hàng</p>
            </div>
          )}

          {activeTab === "Vận chuyển" && (
            <div className="text-gray-700">
              <h2 className="text-xl font-bold mb-4">Vận chuyển</h2>
              <p>Có thể điều chỉnh sau khi chọn ngành hàng</p>
            </div>
          )}

          {activeTab === "Thông tin khác" && (
            <div className="text-gray-700">
              <h2 className="text-xl font-bold mb-4">Thông tin khác</h2>
              <p>Có thể điều chỉnh sau khi chọn ngành hàng</p>
            </div>
          )}

          {/* Footer Buttons */}
          <div className="flex justify-between space-x-3 mt-8">
            <button className="px-6 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-red-500 hover:text-white transition-colors">
              Hủy
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-orange-600 transition-colors"
              onClick={handleUpdateProduct}
            >
              Cập nhật
            </button>
          </div>
        </div>

        {/* Right Sidebar - Product Preview */}
        <div className="w-full lg:w-1/3 p-4 sm:p-6 bg-gray-50 border-l border-gray-200">
          <h2 className="text-xl font-bold text-gray-800 mb-4">
            Chi tiết sản phẩm
          </h2>
          <div className="bg-white rounded-lg shadow-sm p-4">
            <div className="relative w-full h-48 bg-gray-200 rounded-md overflow-hidden mb-4 flex items-center justify-center">
              {coverImage || product?.productImages.length > 0 ? (
                <img
                  src={
                    coverImage ||
                    imageUrl + "product/" + product?.productImages[0]
                  }
                  alt="Product Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/200x200/E0E0E0/333333?text=Error";
                  }}
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-16 w-16 text-gray-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              )}
            </div>
            <p className="text-sm text-gray-500 mb-2">
              Hình ảnh cuối cùng Người mua thấy
            </p>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              {product?.productName || "Tên sản phẩm"}
            </h3>
            <p className="text-orange-500 font-bold text-xl mb-4">
              {product?.variants.length > 0 && product?.variants[0].price
                ? `${parseInt(product?.variants[0].price).toLocaleString(
                    "vi-VN"
                  )}₫`
                : "000₫"}
            </p>
            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
              <span> {username} </span>
              <button className="px-3 py-1 bg-gray-200 rounded-full text-xs">
                Mua Ngay
              </button>
            </div>
            <button className="w-full py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
              Mua Ngay
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
