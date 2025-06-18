import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import apiOrder from "../../../api/apiOrder";
import { getLatestStatus } from "../../../utils/OrderStatus";
import { imageUrl } from "../../../api/config";

export default function OrderData() {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");

  const [activeTab, setActiveTab] = useState("Tất cả");
  const [orderCode, setOrderCode] = useState("");

  // paginate
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const handleToOrderDetail = (id) => {
    navigate(`/seller/order/order-detail/${id}`);
  };

  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const getAllOrder = async () => {
    await apiOrder
      .getOrderBySellerId(currentPage, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        console.log(data);

        setIsFirst(data.first);
        setIsLast(data.last);
        setTotalPages(data.totalPages);
        setCurrentPage(data.number);

        const sorted1 = [...data.content].sort(
          (a, b) =>
            new Date(b.orderStatus.createdAt) -
            new Date(a.orderStatus.createdAt)
        );

        const sorted2 = [...sorted1].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        // console.log(sorted2);
        setOrders(sorted2 || []);
        setLoading(!loading);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (loading) {
      getAllOrder();
    }
  }, [loading, currentPage]);

  const tabs = [
    "Tất cả",
    "Chờ thanh toán",
    "Vận chuyển",
    "Chờ giao hàng",
    "Hoàn thành",
    "Đã hủy",
    "Trả hàng/Hoàn tiền",
  ];

  const getOrderByStatus = async (statusToFetch) => {
    const dataToSend = statusToFetch;

    try {
      const res = await apiOrder.getOrderBySellerIdAndStatus(dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(res);
      const data = res.data;

      setIsFirst(data.first);
      setIsLast(data.last);
      setTotalPages(data.totalPages);
      setCurrentPage(data.number);

      const sorted1 = [...data.content].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );

      console.log(sorted1);
      setOrders(sorted1 || []);
    } catch (err) {
      console.error("Error fetching orders by status:", err);
      Swal.fire({
        title: "Lỗi API",
        text: "Lấy dữ liệu theo trạng thái không thành công",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    let statusToFetch = "";
    switch (activeTab) {
      case "Tất cả":
        getAllOrder();
        return;
      case "Chờ thanh toán":
        statusToFetch = "PENDING";
        break;
      case "Vận chuyển":
        statusToFetch = "SELLER_PREPAIRING";
        break;
      case "Chờ giao hàng":
        statusToFetch = "DELIVERING";
        break;
      case "Hoàn thành":
        statusToFetch = "DELIVERD";
        break;
      case "Đã hủy":
        statusToFetch = "CANCELLED";
        break;
      case "Trả hàng/Hoàn tiền":
        statusToFetch = "RETURN";
        break;
      default:
        statusToFetch = "";
        break;
    }

    if (statusToFetch) {
      getOrderByStatus(statusToFetch, 0, 10);
    }
  }, [activeTab, accessToken]);

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && orderCode.length > 5) {
      handleFindOrderById();
    } else {
      getAllOrder();
    }
  };

  const handleFindOrderById = async () => {
    if (orderCode.length > 5) {
      setOrders([]);
      try {
        const res = await apiOrder.getByIdSeller(orderCode, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const data = res.data;
        setOrders((prevArray) => [...prevArray, data]);
      } catch (err) {
        console.log(err);
      }
    } else {
      setLoading(!loading);
    }
  };

  const handleGetOrderData = async (index) => {
    setCurrentPage(index);
    setLoading(!loading);
  };

  const handleNextOrder = async () => {
    setCurrentPage(currentPage + 1);
    setLoading(!loading);
  };

  const handlePrevOrder = async () => {
    setCurrentPage(currentPage - 1);
    setLoading(!loading);
  };

  return (
    <div className="min-h-screen w-full bg-gray-100 p-4 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Tất cả</h2>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Xuất
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Lịch sử Xuất Báo cáo
            </button>
          </div>
        </div> */}

        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-2 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-600 hover:text-gray-800"
                } transition-colors duration-200`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6 border-b border-gray-200 bg-gray-50 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4 items-end">
          <div className="col-span-1">
            <label
              htmlFor="orderCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Mã đơn hàng
            </label>
            <input
              type="text"
              id="orderCode"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm"
              placeholder="Nhập Mã đơn hàng"
              value={orderCode}
              onChange={(e) => setOrderCode(e.target.value)}
              onKeyPress={handleKeyPress}
            />
          </div>
          <div className="col-span-1"></div>
        </div>

        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-semibold">{orders?.length} Đơn hàng</span>
          </p>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/4">
                    Sản phẩm
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Tổng Đơn hàng
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Trạng thái
                  </th>

                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Chi phí
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => {
                  const totalOrderPrice = order.items.reduce(
                    (sum, product) => sum + product.quantity * product.price,
                    0
                  );

                  const totalOrderSalePrice = order.items.reduce(
                    (sum, product) =>
                      sum + product.quantity * product.salePrice,
                    0
                  );

                  const totalOrderDiscount = order.items.reduce(
                    (sum, product) => sum + product.quantity * product.discount,
                    0
                  );

                  const numProducts = order.items.length;
                  const latestStatus = getLatestStatus(order.orderStatus);

                  return (
                    <React.Fragment key={order.id}>
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50"
                        >
                          <span className="font-bold">{order.username}</span>
                          <span className="ml-4 text-gray-500">
                            Mã đơn hàng {order.id}
                          </span>
                        </td>
                      </tr>
                      {order.items.map((product, productIndex) => (
                        <tr key={`${order.id}-${productIndex}`}>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden border border-gray-200">
                                <img
                                  className="h-full w-full object-cover"
                                  src={imageUrl + "product/" + product.image}
                                  alt={product.productName}
                                  onError={(e) => {
                                    e.target.onerror = null;
                                    e.target.src =
                                      "https://placehold.co/50x50/E0E0E0/333333?text=Error";
                                  }}
                                />
                              </div>
                              <div className="ml-4">
                                <div className="text-sm font-medium text-gray-900">
                                  {product.productName.slice(0, 50)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {product.variantName} x{product.quantity}
                                </div>
                              </div>
                            </div>
                          </td>

                          {productIndex === 0 && (
                            <>
                              {totalOrderSalePrice > 0 ? (
                                <td
                                  rowSpan={numProducts}
                                  className="px-6 py-4 whitespace-nowrap align-top"
                                >
                                  <div className="text-sm text-gray-900 line-through text-gray-200 font-bold">
                                    {totalOrderPrice.toLocaleString("vi-VN")}
                                  </div>
                                  <div className="text-sm text-red-600 font-bold">
                                    {totalOrderSalePrice.toLocaleString(
                                      "vi-VN"
                                    )}
                                  </div>
                                  {totalOrderDiscount > 0 && (
                                    <div className="text-sm text-orange-600 font-semibold">
                                      {totalOrderDiscount.toLocaleString(
                                        "vi-VN"
                                      )}
                                    </div>
                                  )}

                                  <div className="text-sm text-gray-500 font-bold">
                                    {order.paymentType}
                                  </div>
                                </td>
                              ) : (
                                <td
                                  rowSpan={numProducts}
                                  className="px-6 py-4 whitespace-nowrap align-top"
                                >
                                  <div className="text-sm text-red-600 font-bold">
                                    {totalOrderPrice.toLocaleString("vi-VN")}
                                  </div>
                                  {totalOrderDiscount > 0 && (
                                    <div className="text-sm text-orange-600 font-semibold">
                                      {totalOrderDiscount.toLocaleString(
                                        "vi-VN"
                                      )}
                                    </div>
                                  )}

                                  <div className="text-sm text-gray-500 font-bold">
                                    {order.paymentType}
                                  </div>
                                </td>
                              )}

                              <td
                                rowSpan={numProducts}
                                className="px-6 py-4 whitespace-nowrap align-top"
                              >
                                <span
                                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                    order.status === "Đã hủy"
                                      ? "bg-red-100 text-red-800"
                                      : "bg-green-100 text-green-800"
                                  }`}
                                >
                                  {latestStatus.translatedStatus}
                                </span>
                                {order.statusDetail && (
                                  <div className="text-xs text-gray-500 mt-1">
                                    {order.statusDetail}
                                  </div>
                                )}
                              </td>

                              <td
                                rowSpan={numProducts}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top"
                              >
                                <div className="font-medium">
                                  {order.shippingName}
                                </div>
                                <div className="text-xs">
                                  Vận chuyển{" "}
                                  {order.shippingPrice.toLocaleString()}
                                </div>
                                <div className="text-xs">
                                  KM vận chuyển{" "}
                                  {order.shippingVoucherPrice.toLocaleString()}
                                </div>
                                <div className="text-xs">
                                  KM Sàn {order.peterVoucher.toLocaleString()}
                                </div>
                              </td>
                              <td
                                rowSpan={numProducts}
                                className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium align-top"
                              >
                                <button
                                  className="text-blue-600 hover:text-blue-900"
                                  onClick={() => handleToOrderDetail(order.id)}
                                >
                                  Xem chi tiết
                                </button>
                              </td>
                            </>
                          )}
                        </tr>
                      ))}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end items-center mt-6 space-x-2 text-sm">
            {!isFirst && (
              <button
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={handlePrevOrder}
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
                    onClick={() => handleGetOrderData(0)}
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
                    onClick={() => handleGetOrderData(i)}
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
                    onClick={() => handleGetOrderData(totalPages - 1)}
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
                onClick={handleNextOrder}
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
