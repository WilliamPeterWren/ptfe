import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { Link } from "react-router-dom";

import { imageUrl } from "../../../../api/config";
import apiOrder from "../../../../api/apiOrder";

import Review from "../components/Review";

import { getLatestStatus } from "../../../../utils/OrderStatus";
import Pagination from "../components/Pagination";

const UserOrders = () => {
  const pageTitle = "Đơn hàng";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  const accessToken = Cookies.get("accessToken");

  const [orderToReview, setOrderToReview] = useState(null);
  const [showReview, setShowReview] = useState(true);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("Tất cả");

  const [currentPage, setCurrentPage] = useState(0);
  const [totalpages, setTotalpages] = useState(1);

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
      const res = await apiOrder.getAll(currentPage, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });

      const data = res.data;
      console.log(data);
      setCurrentPage(data.number);
      setTotalpages(data.totalPages);

      const sortedOrders = [...data.content].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );

      const ordersWithSortedStatus = sortedOrders.map((order) => ({
        ...order,
        orderStatus: [...order.orderStatus].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        ),
      }));

      setOrders(ordersWithSortedStatus);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (accessToken) {
      getUserOrder();
    }
  }, [currentPage, accessToken]);

  const getOrderByStatusPending = async (statusToFetch) => {
    const dataToSend = statusToFetch;

    try {
      const res = await apiOrder.getOrderByUserIdAndStatus(
        dataToSend,
        currentPage,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      const data = res.data;
      console.log(data);

      setCurrentPage(data.number);
      setTotalpages(data.totalPages);

      const sorted1 = [...data.content].sort(
        (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
      );
      // console.log(sorted1);
      setOrders(sorted1 || []);
    } catch (err) {
      console.error("Error fetching orders by status:", err);
      Swal.fire({
        title: "Không có đơn hàng nào!",
        text: "Không tìm thấy đơn hàng nào!",
        icon: "warning",
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
      getOrderByStatusPending(statusToFetch);
    }
  }, [activeTab, accessToken, currentPage]);

  const handleReviewing = (order) => {
    // order.items.map((item) => {});
    setOrderToReview(order);
  };

  const handleCloseReviewModal = () => {
    setOrderToReview(null);
  };

  useEffect(() => {}, []);

  const handleSetActiveTab = (tab) => {
    setCurrentPage(0);
    setTotalpages(1);
    setActiveTab(tab);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 bg-white shadow-md">
        <div className="flex space-x-4 mb-4">
          {tabs.map((tab) => (
            <button
              key={tab}
              onClick={() => handleSetActiveTab(tab)}
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

        {orders.map((order, index) => {
          const latestStatus = getLatestStatus(order.orderStatus);

          let totalSalePrice = 0;
          let totalOriginalPrice = 0;
          let totalDiscount = 0;

          order.items.forEach((item) => {
            totalSalePrice +=
              item.salePrice > 0
                ? item.salePrice * item.quantity
                : item.price * item.quantity;

            totalOriginalPrice += item.price * item.quantity;

            totalDiscount += item.discount * item.quantity;
          });

          let tot =
            order.peterVoucher +
            (order.shippingVoucherPrice - order.shippingPrice > 0
              ? order.shippingPrice
              : order.shippingVoucherPrice);

          return (
            <div
              key={order.id || index}
              className="mb-6 border rounded-lg p-4 bg-white shadow-sm"
            >
              <div className="flex justify-between items-center mb-2">
                <div className="flex items-center">
                  <Link
                    to={`/seller/page/${order.sellerId}`}
                    className="ml-2 text-blue-500"
                  >
                    <span className="text-orange-500 font-bold hover:text-blue-600">
                      {order.sellerUsername}
                    </span>
                  </Link>

                  <span className="ml-4 text-blue-500">#{order.id}</span>
                </div>
                <div className="text-green-500 flex items-center">
                  <span>ⓘ {latestStatus.translatedStatus}</span>
                  {latestStatus.status === "DELIVERD" && (
                    <span className="ml-2 text-red-500">HOÀN THÀNH</span>
                  )}
                </div>
              </div>
              {order.items.map((item, itemIndex) => {
                return (
                  <div
                    key={item.id || itemIndex}
                    className="flex items-center justify-between mb-2"
                  >
                    <Link
                      to={`/product-detail/productid/${item.productId}`}
                      className="flex items-center"
                    >
                      <img
                        src={imageUrl + "product/" + item.image}
                        alt={item.productName}
                        className="w-20 h-20 mr-2 object-cover rounded"
                      />
                      <div className="hover:text-blue-600">
                        <p className="text-sm capitalize">
                          {item.productName.length > 90
                            ? item.productName.slice(0, 90) + "..."
                            : item.productName}
                        </p>
                        <p className="text-xs text-gray-500">
                          {item.variantName}
                        </p>
                      </div>
                    </Link>

                    <div className="text-right">
                      {item.salePrice > 0 ? (
                        <div>
                          <p className="text-gray-500 line-through">
                            {item.price.toLocaleString()}đ
                          </p>
                          <p className="text-red-500">
                            {item.salePrice.toLocaleString()}đ
                          </p>
                          {item.discount > 0 && (
                            <p className="text-orange-500">
                              {item.discount.toLocaleString()}đ
                            </p>
                          )}
                        </div>
                      ) : (
                        <div>
                          <p className="text-red-500">
                            {item.price.toLocaleString()}đ
                          </p>
                          {item.discount > 0 && (
                            <p className="text-orange-500">
                              {item.discount.toLocaleString()}đ
                            </p>
                          )}
                        </div>
                      )}
                      <p>x{item.quantity.toLocaleString()}</p>
                    </div>
                  </div>
                );
              })}
              <div className="flex justify-between items-center mt-2 border-t pt-2">
                <p>Khuyến mãi sàn</p>
                <p className="text-red-500">
                  {order.peterVoucher.toLocaleString()} đ
                </p>
              </div>
              <div className="flex justify-between items-center mt-2 border-t pt-2">
                <p>Cước vận chuyển</p>
                <p className="text-red-500">
                  {order.shippingPrice.toLocaleString()} đ
                </p>
              </div>
              <div className="flex justify-between items-center mt-2 border-t pt-2">
                <p>Khuyến mãi vận chuyển</p>
                <p className="text-red-500">
                  {order.shippingVoucherPrice.toLocaleString()} đ
                </p>
              </div>
              <div className="flex justify-between items-center mt-2 border-t pt-2">
                <span>Thành tiền: </span>
                <div className="text-right">
                  {totalOriginalPrice !== totalSalePrice && (
                    <p className="text-gray-500 line-through">
                      {totalOriginalPrice.toLocaleString()}đ
                    </p>
                  )}
                  <p className="text-red-500 font-semibold">
                    {totalSalePrice.toLocaleString()}đ
                  </p>
                </div>
              </div>
              <div className="flex justify-between items-center border-t mt-2 pt-2">
                <p>Tổng khuyến mãi</p>
                <p className="text-red-500 font-semibold">
                  {" "}
                  {tot.toLocaleString()}{" "}
                </p>
              </div>
              <div className="flex justify-between items-center border-t mt-2 pt-2">
                <p>Tổng flashsale</p>
                <p className="text-red-500 font-semibold">
                  {" "}
                  {totalDiscount.toLocaleString()}{" "}
                </p>
              </div>
              <div className="flex justify-between items-center border-t mt-2 pt-2">
                <p>Hình thức thanh toán</p>
                <p className="text-red-500 font-semibold">
                  {" "}
                  {order.paymentType}{" "}
                </p>
              </div>

              <div className="flex justify-between items-center border-t mt-2 pt-2">
                <p>Tổng thanh toán</p>
                <p className="text-red-500 font-bold">
                  {" "}
                  {(
                    totalSalePrice -
                    tot +
                    order.shippingPrice -
                    totalDiscount
                  ).toLocaleString()}{" "}
                </p>
              </div>
              {order.recieveImage !== null && order.recieveImage.length > 5 && (
                <div className="border-t pt-2 border-blue-500 mt-2 space-x-2">
                  <span className="py-1 px-2 rounded transition-colors duration-200">
                    Hình ảnh nhận hàng
                  </span>
                  <img
                    alt={order.id}
                    src={imageUrl + "order/" + order.recieveImage}
                    className="mt-4 h-24 w-24 object-cover border border-red-500"
                  />
                </div>
              )}

              {latestStatus.status === "DELIVERD" && (
                <div className="text-green-500 flex items-center mt-2">
                  <span>ⓘ Giao hàng thành công</span>

                  {order?.items?.length > 0 &&
                    showReview &&
                    order.items.some((item) => !item.alreadyReview) && (
                      <span className="ml-2 text-blue-500 cursor-pointer">
                        <button
                          onClick={() => handleReviewing(order)}
                          className="text-blue-500 hover:underline font-semibold"
                        >
                          ĐÁNH GIÁ
                        </button>
                      </span>
                    )}
                </div>
              )}
              {orderToReview && orderToReview.id === order.id && (
                <Review
                  setOpenModal={handleCloseReviewModal}
                  openModal={true}
                  order={orderToReview}
                  setShowReview={setShowReview}
                />
              )}
            </div>
          );
        })}
      </div>

      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalpages}
      />
    </div>
  );
};

export default UserOrders;
