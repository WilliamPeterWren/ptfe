import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

import apiProduct from "../../../api/apiProduct";
import apiFlashSale from "../../../api/apiFlashSale";

import { imageUrl } from "../../../api/config";

import FlashSale from "./FlashSale";

const ProductListDeactive = () => {
  const accessToken = Cookies.get("accessToken");
  const navigate = useNavigate();
  // const location = useLocation();

  const sellerId = Cookies.get("id");

  const [openModal, setOpenModal] = useState(false);

  const [reload, setReload] = useState(false);
  const [products, setProducts] = useState([]);
  const [totalProduct, setTotalProduct] = useState(0);
  const [flashSaleProductId, setFlashSaleProductId] = useState("");
  const [status, setStatus] = useState(false);
  const [flashSale, setFlashSale] = useState([]);
  const [flashSaleId, setFlashSaleId] = useState("");
  const [flashSaleProductName, setFlashSaleProductName] = useState("");

  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [deactiveCurrentPage, setDeactiveCurrentPage] = useState(0);
  const [deactiveTotalPages, setDeactiveTotalPages] = useState(1);
  const [size, setSize] = useState(10);

  const getAllAvailableFlashSale = async () => {
    await apiFlashSale
      .sellerGetAll({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        // console.log(res);
        const data = res.data.result;
        setFlashSale(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getAllAvailableFlashSale();
  }, []);

  const getProducts = async () => {
    await apiProduct
      .sellerGetDeactiveProduct(currentPage, size, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        if (res.status === 200) {
          const data = res.data;
          console.log(res);

          setIsFirst(data.first);
          setIsLast(data.last);
          setTotalPages(data.totalPages);
          setCurrentPage(data.number);

          setProducts(data.content);
          setTotalProduct(data.totalElements);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProducts();
  }, [reload]);

  const [searchId, setSearchId] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(null);

  const handleSearchChange = (e) => {
    setSearchId(e.target.value);
  };

  const filteredProducts = products?.filter(
    (product) =>
      product.id.toLowerCase().includes(searchId.toLowerCase()) &&
      product.isActive === status
  );

  const toggleDropdown = (index) => {
    setDropdownOpen(dropdownOpen === index ? null : index);
  };

  const handleAddProduct = () => {
    navigate("/seller/product/create");
  };

  const handleActiveProduct = (id) => {
    Swal.fire({
      title: "Bạn có chắc kích hoạt?",
      text: "Kích hoạt sản phẩm!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Kích hoạt!",
      cancelButtonText: "Không kích hoạt!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.success(`Bạn đã kích hoạt`, {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          style: {
            top: "-50%",
            transform: "translateY(50%)",
            marginRight: "2%",
            width: "fit-content",
          },
        });

        const accessToken = Cookies.get("accessToken");

        console.log(accessToken);

        await apiProduct
          .sellerActiveProduct(id, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json",
            },
          })
          .then((res) => {
            if (res.status === 200) {
              console.log(res);
              setDropdownOpen(false);
              setReload((prev) => !prev);
            }
          })
          .catch((err) => console.log(err));
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Không kích hoạt!",
          text: "Sản phẩm vẫn tạm ngưng bán!",
          icon: "warning",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    });
  };

  // const handleStatusChange = (e) => {
  //   setStatus(e.target.value);
  // };

  const handleOpenFlashSaleModal = (index) => {
    setOpenModal(!openModal);

    setFlashSaleProductId(products[index].id);
    setFlashSaleProductName(products[index].productName);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && searchId.length > 5) {
      setProducts([]);
      performSearch();
    }
  };

  const performSearch = async () => {
    await apiProduct
      .getProductById(searchId)
      .then((res) => {
        const data = res.data.result;
        console.log(data);
        setProducts((prevArray) => [...prevArray, data]);
      })
      .catch((err) => console.log(err));
  };

  const handleGetProductData = async (index) => {
    setCurrentPage(index);
    console.log(index);
    setReload(!reload);
  };

  const handleNextProduct = async () => {
    setCurrentPage(currentPage + 1);
    setReload(!reload);
  };

  const handlePrevProduct = async () => {
    setCurrentPage(currentPage - 1);
    setReload(!reload);
  };

  return (
    <div className="w-4/5 mx-auto p-4">
      <div className="w-full flex justify-between items-center mb-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-700">Sản phẩm</h2>
          <p className="text-gray-600">
            Bạn có tổng cộng {totalProduct} sản phẩm.
          </p>
        </div>
        <div className="flex space-x-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Tìm sản phẩm theo ID"
              className="border rounded px-2 py-1 pl-8"
              value={searchId}
              onChange={handleSearchChange}
              onKeyPress={handleKeyPress}
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

          {/* <div>
            <select
              className="border rounded px-2 py-1"
              value={status}
              onChange={handleStatusChange}
            >
              <option value={true}>Active</option>
              <option value={false}>Inactive</option>
            </select>
          </div> */}

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
              <th className="py-2 px-4 border-b text-left max-w-[500px]">
                Tên
              </th>
              <th className="py-2 px-4 border-b text-left">Phân loại</th>
              <th className="py-2 px-4 border-b text-left">Giá / Giảm giá</th>
              <th className="py-2 px-4 border-b text-left">Khuyến mãi</th>
              <th className="py-2 px-4 border-b text-left">Doanh thu</th>
              <th className="py-2 px-4 border-b text-left">•••</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts?.map((product, index) => {
              const imgUrl = imageUrl + "product/" + product.productImages[0];
              return (
                <tr key={product.id} className="hover:bg-red-50">
                  <td className="py-2 px-4 border-b align-middle max-w-[300px]">
                    <div className="flex items-center">
                      <img
                        src={imgUrl}
                        alt={product.productName}
                        className="w-20 h-20 mr-2 object-cover rounded"
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
                              Tên loại: {v.variantName}
                            </div>
                            <div className="text-sm text-gray-600">
                              Kho hàng:{" "}
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
                  <td className="py-2 px-4 border-b align-middle capitalize ">
                    {product.variants && product.variants.length > 0 && (
                      <div className="flex flex-col space-y-2">
                        {product.variants.map((v, i) => (
                          <div
                            key={i}
                            className="bg-gray-100 p-3 rounded-md shadow-sm border border-gray-200"
                          >
                            <div className="text-sm text-gray-600">
                              <span className="font-medium text-gray-600">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(v.price)}
                              </span>
                            </div>
                            <div className="text-sm text-gray-600">
                              <span className="font-medium text-indigo-600">
                                {new Intl.NumberFormat("vi-VN", {
                                  style: "currency",
                                  currency: "VND",
                                }).format(v?.salePrice)}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b align-middle">
                    {product?.discount > 0 ? (
                      <span className="text-orange-500">
                        {product?.discount.toLocaleString()} đ
                      </span>
                    ) : (
                      <span className="text-gray-500">Không có </span>
                    )}
                  </td>
                  <td className="py-2 px-4 border-b align-middle">
                    {" "}
                    <span className="text-orange-700">
                      {product.revenue.toLocaleString()}
                    </span>{" "}
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
                            <button
                              onClick={() => handleActiveProduct(product.id)}
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
                              Kích hoạt
                            </button>
                          </li>
                        </ul>
                      </div>
                    )}

                    {openModal && (
                      <FlashSale
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                        productId={flashSaleProductId}
                        flashSale={flashSale}
                        setFlashSaleId={setFlashSaleId}
                        flashSaleId={flashSaleId}
                        flashSaleProductName={flashSaleProductName}
                      />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-6 space-x-2 text-sm">
        {!isFirst && (
          <button
            className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            onClick={handlePrevProduct}
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
                onClick={() => handleGetProductData(0)}
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
                onClick={() => handleGetProductData(i)}
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
                onClick={() => handleGetProductData(totalPages - 1)}
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
            onClick={handleNextProduct}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductListDeactive;
