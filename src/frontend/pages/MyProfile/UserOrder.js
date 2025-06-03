import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { imageUrl } from "../../../api/config";
import apiOrder from "../../../api/apiOrder";

const statusPriority = [
  "PENDING",
  "SELLER_CANCELLED",
  "SELLER_CHECKING",
  "SELLER_PREPAIRING",
  "SELLER_PREPAIRED",
  "SHIPPER_TAKING",
  "SHIPPER_TAKEN",
  "DISPATCHED",
  "DELIVERING",
  "DELIVERD",
  "CANCELLED",
  "RETURN",
  "REFUND",
];

const getLatestStatus = (orderStatusList) => {
  if (!orderStatusList || orderStatusList.length === 0)
    return { status: "PENDING", createdAt: new Date() };

  const sortedByTime = [...orderStatusList].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
  );

  return sortedByTime.reduce((latest, current) => {
    const currentPriority = statusPriority.indexOf(current.status);
    const latestPriority = statusPriority.indexOf(latest.status);
    return currentPriority > latestPriority ? current : latest;
  });
};

const UserOrders = () => {
  const accessToken = Cookies.get("accessToken");
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Tất cả");

  const tabs = [
    "Tất cả",
    "Chờ thanh toán",
    "Vận chuyển",
    "Chờ giao hàng",
    "Hoàn thành",
    "Đã hủy",
    "Trả hàng/Hoàn tiền",
  ];

  const getUserOrder = async () => {
    try {
      const res = await apiOrder.getAll({
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      console.log(res.data.content);
      setOrders(res.data.content || []);
    } catch (err) {
      console.error(err);
      Swal.fire({
        title: "Lỗi API",
        text: "Lấy dữ liệu không thành công",
        icon: "error",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    getUserOrder();
  }, []);

  const handleBuyAgain = (order) => {
    alert(`Buying again from ${order.store} with total ${order.total}đ`);
  };

  const handleContactSeller = (order) => {
    alert(`Contacting seller ${order.store}`);
  };

  const getOrderByStatusPending = async (statusToFetch) => {
    const dataToSend = statusToFetch;

    try {
      const res = await apiOrder.getOrderByUserIdAndStatus(dataToSend, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      const data = res.data;
      console.log("Filtered Orders:", data);
      setOrders(data.content || []);
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
        getUserOrder();
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
      getOrderByStatusPending(statusToFetch, 0, 10);
    }
  }, [activeTab, accessToken]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 bg-white shadow-md">
        <div className="flex space-x-4 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-md transition-colors duration-200
                ${
                  activeTab === tab
                    ? "text-orange-500 font-semibold border-b-2 border-orange-500"
                    : "text-gray-700 hover:text-orange-400"
                }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Search input */}
        {/* <div className="mb-4">
          <input
            type="text"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
            className="w-full p-2 border rounded"
          />
        </div> */}

        {/* Orders list */}
        {orders.map((order, index) => {
          const latestStatus = getLatestStatus(order.orderStatus);

          // Total price logic
          let totalSalePrice = 0;
          let totalOriginalPrice = 0;

          order.items.forEach((item) => {
            totalSalePrice +=
              item.salePrice > 0
                ? item.salePrice * item.quantity
                : item.price * item.quantity;
            totalOriginalPrice += item.price * item.quantity;
          });

          return (
            <div
              key={index}
              className="mb-6 border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <span className="text-orange-500 font-bold">
                    {order.sellerUsername}
                  </span>
                  <button className="ml-2 text-blue-500">Chat</button>
                  <button className="ml-2 text-blue-500">Xem Shop</button>
                </div>
                <div className="text-green-500 flex items-center">
                  <span>ⓘ {latestStatus.status}</span>
                  {latestStatus.status === "DELIVERD" && (
                    <span className="ml-2 text-red-500">HOÀN THÀNH</span>
                  )}
                </div>
              </div>

              {order.items.map((item, itemIndex) => (
                <div
                  key={itemIndex}
                  className="flex items-center justify-between mb-2"
                >
                  <div className="flex items-center">
                    <img
                      src={imageUrl + "product/" + item.image}
                      alt={item.productName}
                      className="w-12 h-12 mr-2"
                    />
                    <div>
                      <p className="text-sm">
                        {item.productName.length > 90
                          ? item.productName.slice(0, 90) + "..."
                          : item.productName}
                      </p>
                      <p className="text-xs text-gray-500">
                        {item.variantName}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    {item.salePrice > 0 ? (
                      <>
                        <p className="text-gray-500 line-through">
                          {item.price.toLocaleString()}đ
                        </p>
                        <p className="text-red-500">
                          {item.salePrice.toLocaleString()}đ
                        </p>
                      </>
                    ) : (
                      <p className="text-red-500">
                        {item.price.toLocaleString()}đ
                      </p>
                    )}
                    <p>x{item.quantity.toLocaleString()}</p>
                  </div>
                </div>
              ))}

              <div className="flex justify-between items-center mt-2 border-t pt-2">
                <span>Thành tiền: </span>
                <div className="text-right">
                  {totalOriginalPrice !== totalSalePrice && (
                    <p className="text-gray-500 line-through">
                      {totalOriginalPrice.toLocaleString()}đ
                    </p>
                  )}
                  <p className="text-red-500 font-bold">
                    {totalSalePrice.toLocaleString()}đ
                  </p>
                </div>
              </div>

              <div className="flex justify-end mt-2 space-x-2">
                <button
                  onClick={() => handleBuyAgain(order)}
                  className="bg-orange-500 text-white py-1 px-2 rounded hover:bg-orange-600"
                >
                  Mua Lại
                </button>
                <button
                  onClick={() => handleContactSeller(order)}
                  className="text-blue-500 hover:underline"
                >
                  Liên Hệ Người Bán
                </button>
              </div>

              {latestStatus.status === "DELIVERD" && (
                <div className="text-green-500 flex items-center mt-2">
                  <span>ⓘ Giao hàng thành công</span>
                  <span className="ml-2 text-blue-500 cursor-pointer">
                    ĐÁNH GIÁ
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserOrders;
