import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import apiOrder from "../../../api/apiOrder";
import { getLatestStatus } from "../../../utils/OrderStatus";
import { imageUrl } from "../../../api/config";

// const shippingUnits = [
//   "Tất cả ĐVVC",
//   "SPX Express",
//   "Giao Hàng Nhanh",
//   "Viettel Post",
//   "J&T Express",
// ];

export default function OrderData() {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");

  const [activeTab, setActiveTab] = useState("Tất cả");
  const [orderCode, setOrderCode] = useState("");
  // const [shippingUnitFilter, setShippingUnitFilter] = useState("Tất cả ĐVVC");

  const handleToOrderDetail = (id) => {
    navigate(`/shipper/order/order-detail/${id}`);
  };

  const [orders, setOrders] = useState([]);
  const getAllOrder = async () => {
    await apiOrder
      .getOrderByShipperId({
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.content;
        const sorted1 = [...data].sort(
          (a, b) =>
            new Date(b.orderStatus.createdAt) -
            new Date(a.orderStatus.createdAt)
        );

        const sorted2 = [...sorted1].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );
        // console.log(sorted2);
        setOrders(sorted2 || []);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllOrder();
  }, []);

  const tabs = [
    "Tất cả",
    "Vận chuyển",
    "Chờ giao hàng",
    "Hoàn thành",
    "Đã hủy",
    "Trả hàng/Hoàn tiền",
  ];

  const getOrderByStatus = async (statusToFetch) => {
    const dataToSend = statusToFetch;

    try {
      const res = await apiOrder.getOrderByShipperIdAndStatus(dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      // console.log(res);
      const data = res.data.content;
      const sorted1 = [...data].sort(
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

  return (
    <div className="min-h-screen w-4/5 bg-gray-100 p-4 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-6 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-800">Tất cả</h2>
          <div className="flex space-x-3">
            <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Xuất
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Lịch sử Xuất Báo cáo
            </button>
          </div>
        </div>

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
            />
          </div>

          <div className="col-span-1 md:col-span-1 lg:col-span-3 flex justify-end space-x-3">
            <button className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition-colors">
              Áp dụng
            </button>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors">
              Đặt lại
            </button>
          </div>
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
                                  {product.quantity}{" "}
                                  {product.productName.slice(0, 50)}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {product.variantName}
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

          <p className="text-sm text-gray-500 mt-6">
            Chỉ hiển thị 10 đơn hàng gần nhất
          </p>

          <div className="flex justify-end items-center mt-6 space-x-2 text-sm">
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              &lt;
            </button>
            <span className="px-3 py-1 bg-blue-500 text-white rounded-md">
              1
            </span>
            <button className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50">
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
