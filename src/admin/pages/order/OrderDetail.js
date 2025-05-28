import React from "react";

export default function OrderDetail() {
  // Dummy data for the order detail page, structured to match the image
  const orderDetail = {
    status: "Đã hủy",
    cancellationReason: "Yêu cầu hủy đơn hàng của Người mua đã được chấp nhận",
    orderId: "24020217QVYHUB",
    shippingAddress: {
      name: "Phương Anh Chiểu",
      address: "Thiên Phố Thủ Đức, TP Hồ Chí Minh",
    },
    shippingInfo: {
      package: "Kiện hàng 1: Nhanh SPX Express",
      trackingCode: "SPXVN040065508373",
      status: "Chờ lấy hàng",
      statusDate: "25/07", // Assuming this is a date or time
    },
    buyerReason: "Tôi muốn cập nhật địa chỉ nhận hàng",
    customerName: "dun2907",
    products: [
      {
        stt: 1,
        name: "Áo thun làm từ bã cà phê",
        variation: "Tất cả: Nâu,S",
        unitPrice: 375000,
        quantity: 1,
        total: 375000,
        imageUrl: "https://placehold.co/50x50/F3F4F6/6B7280?text=Product", // Placeholder image
      },
    ],
    paymentSummary: {
      totalProductPrice: 375000,
      estimatedShippingFee: 0,
      buyerVASSubtotal: 0,
      estimatedOrderRevenue: 0,
    },
    adjustment: {
      completedDate: "", // Empty as per image
      reason: "", // Empty as per image
      refundAmount: 0, // Empty as per image
      message: "Chưa có điều chế tàu được thực hiện theo thứ tự này",
    },
    finalAmount: 0, // Assuming 0 as per image
    buyerPayment: {
      totalProductPrice: 375000,
      shippingFee: 0,
      shopeeVoucher: 0,
      shopDiscountCode: 0,
      totalPayment: 375000,
    },
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="p-4 sm:p-6 border-b border-gray-200 flex items-center">
          <button className="text-gray-500 hover:text-gray-700 mr-3">
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
          </button>
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
            Chi tiết đơn hàng
          </h2>
        </div>

        {/* Status and Cancellation Reason */}
        <div className="p-4 sm:p-6 bg-red-50 border-b border-red-200">
          <div className="flex items-center text-red-700 font-semibold mb-2">
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
            {orderDetail.status}
          </div>
          <p className="text-sm text-red-600">
            {orderDetail.cancellationReason}
          </p>
        </div>

        {/* Order Information */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
            {/* Mã đơn hàng */}
            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-2">
                Mã đơn hàng
              </h3>
              <p className="text-sm text-gray-900">{orderDetail.orderId}</p>
            </div>

            {/* Địa chỉ nhận hàng */}
            <div>
              <h3 className="text-base font-semibold text-gray-700 mb-2">
                Địa chỉ nhận hàng
              </h3>
              <p className="text-sm text-gray-900">
                {orderDetail.shippingAddress.name}
              </p>
              <p className="text-sm text-gray-600">
                {orderDetail.shippingAddress.address}
              </p>
            </div>

            {/* Thông tin vận chuyển */}
            <div className="md:col-span-2">
              <h3 className="text-base font-semibold text-gray-700 mb-2">
                Thông tin vận chuyển
              </h3>
              <div className="text-sm text-gray-900">
                <span className="font-medium">
                  {orderDetail.shippingInfo.package}
                </span>
                <span className="ml-2 text-gray-600">
                  {orderDetail.shippingInfo.trackingCode}
                </span>
              </div>
              <div className="flex items-center mt-2 text-green-600 font-medium text-sm">
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
                {orderDetail.shippingInfo.status}
                <span className="ml-2 text-gray-500 text-xs">
                  {orderDetail.shippingInfo.statusDate}
                </span>
              </div>
            </div>

            {/* Lý do từ Người mua */}
            <div className="md:col-span-2">
              <h3 className="text-base font-semibold text-gray-700 mb-2">
                Lý do từ Người mua
              </h3>
              <p className="text-sm text-gray-900">{orderDetail.buyerReason}</p>
            </div>
          </div>
        </div>

        {/* Customer Info */}
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
              {orderDetail.customerName}
            </span>
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors">
              Theo dõi
            </button>
            <button className="px-3 py-1 text-sm bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors">
              Chat ngay
            </button>
          </div>
        </div>

        {/* Payment Information */}
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
                {orderDetail.products.map((product) => (
                  <tr key={product.stt}>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-500">
                      {product.stt}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 h-10 w-10 rounded-md overflow-hidden border border-gray-200">
                          <img
                            className="h-full w-full object-cover"
                            src={product.imageUrl}
                            alt={product.name}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src =
                                "https://placehold.co/50x50/E0E0E0/333333?text=Error";
                            }}
                          />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">
                            {product.name}
                          </div>
                          <div className="text-xs text-gray-500">
                            {product.variation}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {product.unitPrice.toLocaleString("vi-VN")}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {product.quantity}
                    </td>
                    <td className="px-4 py-2 whitespace-nowrap text-sm text-gray-900">
                      {product.total.toLocaleString("vi-VN")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="text-right text-sm text-gray-700 space-y-1">
            <p>
              Tổng tiền sản phẩm:{" "}
              <span className="font-semibold">
                {orderDetail.paymentSummary.totalProductPrice.toLocaleString(
                  "vi-VN"
                )}
              </span>
            </p>
            <p>
              Tổng phí vận chuyển ước tính:{" "}
              <span className="font-semibold">
                {orderDetail.paymentSummary.estimatedShippingFee.toLocaleString(
                  "vi-VN"
                )}
              </span>
            </p>
            <p>
              Buyer Value Added Service Subtotal:{" "}
              <span className="font-semibold">
                {orderDetail.paymentSummary.buyerVASSubtotal.toLocaleString(
                  "vi-VN"
                )}
              </span>
            </p>
            <p>
              Doanh thu của đơn hàng ước tính:{" "}
              <span className="font-semibold">
                {orderDetail.paymentSummary.estimatedOrderRevenue.toLocaleString(
                  "vi-VN"
                )}
              </span>
            </p>
          </div>
        </div>

        {/* Điều chỉnh đơn hàng */}
        <div className="p-4 sm:p-6 border-b border-gray-200">
          <h3 className="text-base font-semibold text-gray-700 mb-3">
            Điều chỉnh đơn hàng
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-700">
            <div>
              <p className="font-medium mb-1">
                Ngày hoàn thành điều chỉnh đơn hàng
              </p>
              <p>{orderDetail.adjustment.completedDate || "-"}</p>
            </div>
            <div>
              <p className="font-medium mb-1">Lý do điều chỉnh</p>
              <p>{orderDetail.adjustment.reason || "-"}</p>
            </div>
            <div className="text-right">
              <p className="font-medium mb-1">Số tiền hoàn</p>
              <p>
                {orderDetail.adjustment.refundAmount.toLocaleString("vi-VN")}
              </p>
            </div>
          </div>
          {orderDetail.adjustment.message && (
            <p className="text-sm text-gray-500 italic mt-4">
              {orderDetail.adjustment.message}
            </p>
          )}
        </div>

        {/* Số tiền cuối cùng */}
        <div className="p-4 sm:p-6 border-b border-gray-200 text-right">
          <h3 className="text-base font-semibold text-gray-700 mb-2">
            Số tiền cuối cùng
          </h3>
          <p className="text-lg font-bold text-orange-500">
            {orderDetail.finalAmount.toLocaleString("vi-VN")}
          </p>
        </div>

        {/* Thanh toán của Người Mua */}
        <div className="p-4 sm:p-6">
          <h3 className="text-base font-semibold text-gray-700 mb-3">
            Thanh toán của Người Mua
          </h3>
          <div className="text-sm text-gray-700 space-y-1">
            <div className="flex justify-between">
              <span>Tổng tiền sản phẩm</span>
              <span className="font-semibold">
                {orderDetail.buyerPayment.totalProductPrice.toLocaleString(
                  "vi-VN"
                )}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Phí vận chuyển</span>
              <span className="font-semibold">
                {orderDetail.buyerPayment.shippingFee.toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Shopee Voucher</span>
              <span className="font-semibold">
                {orderDetail.buyerPayment.shopeeVoucher.toLocaleString("vi-VN")}
              </span>
            </div>
            <div className="flex justify-between">
              <span>Mã giảm giá của Shop</span>
              <span className="font-semibold">
                {orderDetail.buyerPayment.shopDiscountCode.toLocaleString(
                  "vi-VN"
                )}
              </span>
            </div>
            <div className="flex justify-between font-bold text-base mt-2 pt-2 border-t border-gray-200">
              <span>Tổng tiền Thanh toán</span>
              <span className="text-orange-500">
                {orderDetail.buyerPayment.totalPayment.toLocaleString("vi-VN")}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
