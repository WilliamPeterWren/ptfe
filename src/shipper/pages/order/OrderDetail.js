import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Link, useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { v4 as uuidv4 } from "uuid";

import apiOrder from "../../../api/apiOrder";
import { formatDateTime } from "../../../utils/FormatDateTime";

import {
  getLatestStatus,
  statusTranslations,
  getNextStatus,
} from "../../../utils/OrderStatus";
import { imageUrl } from "../../../api/config";

export default function OrderDetail() {
  const navigate = useNavigate();
  const accessToken = Cookies.get("accessToken");
  // console.log(accessToken)

  useEffect(() => {
    if (accessToken.length < 10) {
      navigate("/shipper/login");
    }
  }, []);

  const { orderId } = useParams();

  const [order, setOrder] = useState();
  const [loading, setLoading] = useState(true);
  const [totalPromotion, setTotalPromotion] = useState(0);
  const [totalPay, setTotalPay] = useState(0);
  const [updateStatus, setUpdateStatus] = useState(true);
  const [nextStatus, setNextStatus] = useState(null);
  const [latestStatus, setLatestStatus] = useState(null);
  const [isCancelled, setCancelled] = useState(false);

  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState("");

  const getOrder = async () => {
    try {
      const res = await apiOrder.getByIdShipper(orderId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = res.data;

      const sortedStatus = [...data.orderStatus].sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );

      // console.log(sortedStatus);

      let tot =
        data.peterVoucher +
        (data.shippingVoucherPrice - data.shippingPrice > 0
          ? data.shippingPrice
          : data.shippingVoucherPrice);

      setTotalPromotion(tot);

      let tot2 = 0;
      data.items.forEach((item) => {
        tot2 +=
          (item.salePrice > 0 ? item.salePrice : item.price) * item.quantity;
      });

      setTotalPay(tot2);

      const hasFinalStatus = data?.orderStatus.some((item) =>
        ["CANCELLED", "SELLER_CANCELLED", "DELIVERD"].includes(item.status)
      );

      const hasFinalStatusSeller = data?.orderStatus.some((item) =>
        ["SELLER_PREPAIRED"].includes(item.status)
      );

      setUpdateStatus(!hasFinalStatus && hasFinalStatusSeller);

      const finalStatus = data?.orderStatus.some((item) =>
        ["CANCELLED", "SELLER_CANCELLED"].includes(item.status)
      );

      setCancelled(finalStatus);

      setLatestStatus(getLatestStatus(sortedStatus).status);

      setNextStatus(getNextStatus(getLatestStatus(sortedStatus).status));
      console.log(data);
      setOrder({ ...data, orderStatus: sortedStatus });
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (orderId.length > 0 && loading) {
      // console.log(orderId);
      getOrder();
      setLoading(!loading);
    }
  }, [loading]);

  const handleUpdateNextStatus = async () => {
    console.log(nextStatus.status);

    if (selectedImage) {
      const formData = new FormData();
      let uuidFileName = uuidv4() + "_" + selectedImage.name;
      formData.append("files", selectedImage, uuidFileName);

      try {
        await fetch("http://localhost:8889/api/files/upload/order", {
          method: "POST",
          body: formData,
        });
      } catch (error) {
        console.error("Error uploading image for avatar:", error);
      }

      const orderDataUpdate = {
        orderStatus: nextStatus.status,
        recieveImage: uuidFileName,
      };

      console.log(orderDataUpdate);

      await apiOrder
        .updateStatusByShipper(order.id, orderDataUpdate, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          const data = res.data;
          console.log(data);
          setLoading(!loading);
          Swal.fire({
            title: "Cập nhật thành công",
            text: "Trạng thái đơn hàng được cập nhật",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          setImagePreviewUrl(imageUrl + "order/" + uuidFileName);
        })
        .catch((err) => console.log(err));
    } else {
      const orderDataUpdate = {
        orderStatus: nextStatus.status,
      };
      await apiOrder
        .updateStatusByShipper(order.id, orderDataUpdate, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((res) => {
          const data = res.data;
          console.log(data);
          setLoading(!loading);
          Swal.fire({
            title: "Cập nhật thành công",
            text: "Trạng thái đơn hàng được cập nhật",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSellerCancel = () => {
    // console.log("huy don hang");
    Swal.fire({
      title: "Hủy đơn hàng?",
      text: "Bạn có chắc hủy đơn hàng này?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Tôi đã kiểm tra!",
      cancelButtonText: "Không! Tôi không muốn hủy!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        const orderDataUpdate = {
          orderStatus: "CANCELLED",
        };
        await apiOrder
          .updateStatusBySeller(order.id, orderDataUpdate, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            const data = res.data;
            console.log(data);
            setLoading(!loading);
          })
          .catch((err) => console.log(err));
      } else if (result.isDismissed) {
        console.log("User chose No or closed");
      }
    });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      if (file.size > 1 * 512 * 1024) {
        setUploadStatus("Kích thước tệp tối đa 0.5MB.");
        setSelectedImage(null);
        return;
      }
      if (!["image/jpeg", "image/png"].includes(file.type)) {
        setUploadStatus("Định dạng tệp không hợp lệ. Chỉ chấp nhận JPEG, PNG.");
        setSelectedImage(null);
        return;
      }

      setSelectedImage(file);
      setUploadStatus("");
    } else {
      setSelectedImage(null);
      setUploadStatus("");
    }
  };

  useEffect(() => {
    if (selectedImage) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result);
      };
      reader.readAsDataURL(selectedImage);
    } else {
      setImagePreviewUrl("");
    }
    return () => {
      if (imagePreviewUrl && imagePreviewUrl.startsWith("blob:")) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [selectedImage]);

  if (!order) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <Link
              to={`/shipper/order/order-list`}
              className="text-gray-500 hover:text-gray-700 mr-3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </Link>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
              Chi tiết đơn hàng
            </h2>
          </div>
          <div>
            {!isCancelled && latestStatus !== "DELIVERD" && (
              <button
                className="p-2 bg-red-500 text-white rounded hover:bg-red-600"
                onClick={handleSellerCancel}
              >
                Hủy đơn hàng
              </button>
            )}
          </div>
        </div>
        <div>
          {getLatestStatus(order?.orderStatus).status === "CANCELLED" ||
          getLatestStatus(order?.orderStatus).status === "SELLER_CANCELLED" ? (
            <div className="p-4 sm:p-6 bg-red-50 border-b border-red-200">
              <div
                className={`flex items-center text-red-700 font-semibold mb-2`}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586l-1.293-1.293z"
                    clipRule="evenodd"
                  />
                </svg>
                {getLatestStatus(order?.orderStatus).translatedStatus}
              </div>
            </div>
          ) : (
            <div className="p-4 sm:p-6 bg-green-100 border-b border-green-200">
              <div
                className={`flex items-center text-green-600 font-semibold mb-2`}
              >
                <span className="mr-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 48 48"
                    width="20px"
                    height="20px"
                  >
                    <path
                      fill="#4caf50"
                      d="M44,24c0,11.045-8.955,20-20,20S4,35.045,4,24S12.955,4,24,4S44,12.955,44,24z"
                    />
                    <path
                      fill="#ccff90"
                      d="M34.602,14.602L21,28.199l-5.602-5.598l-2.797,2.797L21,33.801l16.398-16.402L34.602,14.602z"
                    />
                  </svg>
                </span>
                {getLatestStatus(order?.orderStatus).translatedStatus}
              </div>
            </div>
          )}
        </div>

        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-2">
                Mã đơn hàng
              </h3>
              <p className="text-sm text-gray-900 hover:text-blue-500">
                {order?.id}
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-2">
                Địa chỉ nhận hàng
              </h3>
              <p className="text-sm text-gray-900 hover:text-blue-500">
                {order?.addressId}
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-2">
                SĐT người gửi
              </h3>
              <p className="text-lg font-bold text-gray-900 hover:text-blue-500">
                {order?.sellerPhone}
              </p>
            </div>

            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-2">
                SĐT người nhận
              </h3>
              <p className="text-lg font-bold text-gray-900 hover:text-blue-500">
                {order?.receiverPhone}
              </p>
            </div>

            <div className="md:col-span-2">
              <h3 className="text-base font-semibold mb-2 text-blue-600">
                Thông tin vận chuyển
              </h3>
              <div className="text-sm text-gray-900">
                <span className="font-medium text-yellow-800">
                  {order?.shippingName}
                </span>
                <span className="ml-2 text-gray-600">
                  {order?.shippingPrice.toLocaleString()} đồng
                </span>
              </div>
              <div>
                <div>
                  {order?.orderStatus?.length > 0 &&
                    order?.orderStatus
                      .slice()
                      .reverse()
                      .map((item, index) => {
                        return (
                          <div
                            key={index}
                            className="flex items-center mt-2 font-medium text-sm"
                          >
                            {item.status === "SELLER_CANCELLED" ||
                            item.status === "CANCELLED" ? (
                              <span className="text-red-700 flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5 mr-2"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586l-1.293-1.293z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {statusTranslations[item.status]}
                                <span className="ml-2 text-gray-500 text-xs">
                                  {formatDateTime(item.createdAt)}
                                </span>
                              </span>
                            ) : (
                              <span className="text-green-600 flex items-center">
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-4 w-4 mr-1"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                                {statusTranslations[item.status]}
                                <span className="ml-2 text-gray-500 text-xs">
                                  {formatDateTime(item.createdAt)}
                                </span>
                              </span>
                            )}
                          </div>
                        );
                      })}
                </div>

                <div>
                  {nextStatus.status === "DELIVERD" && (
                    <div className="mt-8">
                      <img
                        src={imagePreviewUrl}
                        alt={order.id}
                        className="w-36 h-36 rounded-lg object-cover border-4 border-gray-200 shadow-sm mb-4"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/150x150/e0e0e0/ffffff?text=Lỗi+Ảnh";
                        }}
                      />
                      <input
                        type="file"
                        accept="image/jpeg, image/png"
                        onChange={handleImageChange}
                        className="hidden"
                        id="imageUpload"
                        disabled={uploading}
                      />
                      <div>
                        <label
                          htmlFor="imageUpload"
                          className={`cursor-pointer px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition duration-300 ease-in-out rounded-md mb-2
                        ${uploading ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          Chọn Ảnh
                        </label>
                        <p className="text-sm text-gray-500 text-center">
                          Dung lượng tệp tối đa 0.5MB
                          <br />
                          Định dạng: JPEG, PNG
                          <br />
                          <span className="text-red-500">
                            Hình không hiển thị là vì
                            <br />
                            sai định dạng hoặc dung lượng
                          </span>
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  {updateStatus && (
                    <button
                      className="mt-4 border border-blue-500 p-2 rounded hover:bg-blue-500 hover:text-white"
                      onClick={handleUpdateNextStatus}
                    >
                      Cập nhật trạng thái{" "}
                      <span className="text-red-500 hover:text-white">
                        {nextStatus.translatedStatus}
                      </span>
                    </button>
                  )}
                </div>

                <div className="mt-4">
                  <hr className=" border border-t border-red-800" />
                  {latestStatus === "DELIVERD" && (
                    <div className="">
                      <h3 className="text-yellow-700 font-semibold">
                        Hình ảnh nhận hàng
                      </h3>
                      <img
                        alt=""
                        src={imageUrl + "order/" + order.recieveImage}
                        className="w-44 h-44 object-cover mt-4 border border-blue-500 p-2 rounded"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-b border-gray-200 flex justify-between items-center">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              />
            </svg>
            <span className="font-semibold text-gray-800">
              {order?.username}
            </span>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-700 mb-3">
            Thông tin thanh toán
          </h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 mb-4">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    STT
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Sản phẩm
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Đơn giá
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Số lượng
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Thành tiền
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order?.items.map((product, index) => {
                  const total =
                    (product.salePrice > 0
                      ? product.salePrice
                      : product.price) * product.quantity;
                  return (
                    <tr key={index}>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                        {product.quantity}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden border border-gray-200">
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
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">
                              {product.productName.slice(0, 50)}
                            </div>
                            <div className="text-xs text-gray-500">
                              {product.variantName}
                            </div>
                          </div>
                        </div>
                      </td>
                      {product.salePrice > 0 ? (
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          <p className="text-gray-500 line-through">
                            {product.price.toLocaleString("vi-VN")}
                          </p>
                          <p>{product.salePrice.toLocaleString("vi-VN")}</p>
                        </td>
                      ) : (
                        <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                          {product.price.toLocaleString("vi-VN")}
                        </td>
                      )}

                      <td className="px-4 py-2 whitespace-nowrap text-center text-sm text-gray-900">
                        {product.quantity}
                      </td>
                      <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900 text-red-500">
                        {total.toLocaleString("vi-VN")}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            <div className="w-full flex justify-between items-center">
              <p>Khuyến mãi sàn</p>
              <p className="text-red-500">
                {order?.peterVoucher.toLocaleString()}{" "}
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p>Cước vận chuyển</p>
              <p className="text-red-500">
                {order?.shippingPrice.toLocaleString()}{" "}
              </p>
            </div>
            <div className="w-full flex justify-between items-center">
              <p>Khuyến mãi vận chuyển</p>
              <p className="text-red-500">
                {order?.shippingVoucherPrice.toLocaleString()}{" "}
              </p>
            </div>
            <div className="w-full flex justify-between items-center border-t border-red-500">
              <p>Tổng khuyến mãi</p>
              <p className="text-red-500">{totalPromotion.toLocaleString()} </p>
            </div>
          </div>

          <div className="text-right text-sm text-gray-700 space-y-1">
            <p>
              Tổng tiền sản phẩm:{" "}
              <span className="font-semibold text-red-500">
                {totalPay.toLocaleString("vi-VN")}
              </span>
            </p>
            <p>
              Tổng phí vận chuyển ước tính:{" "}
              <span className="font-semibold">
                {(order?.shippingVoucherPrice - order?.shippingPrice > 0
                  ? 0
                  : order?.shippingPrice - order?.shippingVoucherPrice
                ).toLocaleString("vi-VN")}
              </span>
            </p>

            <p>
              Doanh thu của đơn hàng ước tính:{" "}
              <span className="font-semibold">
                {(
                  totalPay -
                  totalPromotion +
                  order?.shippingPrice
                ).toLocaleString("vi-VN")}
              </span>
            </p>
          </div>
        </div>

        <div className="p-4 sm:p-6 border-b border-gray-200 text-right">
          <h3 className="text-base font-semibold text-gray-700 mb-2">
            Số tiền cuối cùng
          </h3>
          <p className="text-lg font-bold text-orange-500">
            {(totalPay - totalPromotion + order?.shippingPrice).toLocaleString(
              "vi-VN"
            )}
          </p>
        </div>

        <div className="p-4 sm:p-6">
          <h3 className="text-base font-semibold text-gray-700 mb-3">
            Thanh toán của Người Mua
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>Tổng tiền sản phẩm</span>
              <span className="font-semibold">
                {totalPay.toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span className="font-semibold">
                {order?.shippingPrice.toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Peter Voucher</span>
              <span className="font-semibold">
                {order?.peterVoucher.toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Mã giảm giá vận chuyển</span>
              <span className="font-semibold">
                {order?.shippingVoucherPrice.toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t border-gray-200">
              <span>Tổng tiền Thanh toán</span>
              <span className="text-orange-500">
                {(
                  totalPay -
                  totalPromotion +
                  order?.shippingPrice
                ).toLocaleString("vi-VN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
