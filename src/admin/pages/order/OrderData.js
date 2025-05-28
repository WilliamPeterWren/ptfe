import React, { useState } from "react";

// Dummy data for demonstration
const orderData = [
  {
    id: "2403021TGVYHUS-1",
    customerName: "dun2907",
    paymentMethod: "Thanh toán khi nhận hàng",
    status: "Đã hủy",
    statusDetail: "Yêu cầu hủy đơn hàng của Người mua đã được chấp nhận",
    shippingUnit: "Nhanh",
    shippingProvider: "SPX Express",
    shippingCode: "SPKVN040065508373",
    products: [
      {
        productName: "Áo thun làm từ bã cà phê",
        variation: "Variation Nu",
        quantity: 1,
        price: 375000,
        imageUrl: "https://placehold.co/50x50/E0E0E0/333333?text=Product A",
      },
      {
        productName: "Quần jean slim fit",
        variation: "Màu xanh, Size L",
        quantity: 2,
        price: 250000,
        imageUrl: "https://placehold.co/50x50/D0D0D0/333333?text=Product B",
      },
    ],
  },
  {
    id: "2403021TGVYHUS-2",
    customerName: "nguyen_van_a",
    paymentMethod: "Thanh toán online",
    status: "Chờ xác nhận",
    statusDetail: "",
    shippingUnit: "Giao Hàng Nhanh",
    shippingProvider: "GHN Express",
    shippingCode: "GHN123456789",
    products: [
      {
        productName: "Giày thể thao Nike",
        variation: "Trắng, Size 40",
        quantity: 1,
        price: 1200000,
        imageUrl: "https://placehold.co/50x50/C0C0C0/333333?text=Product C",
      },
    ],
  },
  {
    id: "2403021TGVYHUS-3",
    customerName: "tran_thi_b",
    paymentMethod: "Thanh toán khi nhận hàng",
    status: "Đang giao",
    statusDetail: "Đang trên đường giao đến bạn",
    shippingUnit: "Viettel Post",
    shippingProvider: "Viettel Post",
    shippingCode: "VTPOST987654321",
    products: [
      {
        productName: 'Sách "Lập trình React"',
        variation: "Bản cứng",
        quantity: 1,
        price: 150000,
        imageUrl: "https://placehold.co/50x50/B0B0B0/333333?text=Product D",
      },
    ],
  },
  {
    id: "2403021TGVYHUS-4",
    customerName: "le_thi_c",
    paymentMethod: "Thanh toán online",
    status: "Đã giao",
    statusDetail: "Đã giao thành công",
    shippingUnit: "SPX Express",
    shippingProvider: "SPX Express",
    shippingCode: "SPX987654321",
    products: [
      {
        productName: "Bàn phím cơ",
        variation: "RGB, Blue Switch",
        quantity: 1,
        price: 800000,
        imageUrl: "https://placehold.co/50x50/909090/333333?text=Product E",
      },
      {
        productName: "Chuột gaming",
        variation: "Không dây",
        quantity: 1,
        price: 300000,
        imageUrl: "https://placehold.co/50x50/808080/333333?text=Product F",
      },
    ],
  },
  {
    id: "2403021TGVYHUS-5",
    customerName: "pham_van_d",
    paymentMethod: "Thanh toán khi nhận hàng",
    status: "Trả hàng",
    statusDetail: "Người mua yêu cầu trả hàng",
    shippingUnit: "J&T Express",
    shippingProvider: "J&T Express",
    shippingCode: "JNT112233445",
    products: [
      {
        productName: "Điện thoại di động",
        variation: "Màu đen, 128GB",
        quantity: 1,
        price: 5000000,
        imageUrl: "https://placehold.co/50x50/707070/333333?text=Product G",
      },
    ],
  },
  {
    id: "2403021TGVYHUS-6",
    customerName: "hoang_thi_e",
    paymentMethod: "Thanh toán khi nhận hàng",
    status: "Chờ lấy hàng",
    statusDetail: "Đơn hàng đã được đóng gói",
    shippingUnit: "Viettel Post",
    shippingProvider: "Viettel Post",
    shippingCode: "VTPOST11223344",
    products: [
      {
        productName: "Sạc dự phòng",
        variation: "10000mAh",
        quantity: 2,
        price: 200000,
        imageUrl: "https://placehold.co/50x50/606060/333333?text=Product H",
      },
    ],
  },
  {
    id: "2403021TGVYHUS-7",
    customerName: "tran_van_f",
    paymentMethod: "Thanh toán online",
    status: "Giao không thành công",
    statusDetail: "Không liên hệ được người nhận",
    shippingUnit: "Giao Hàng Nhanh",
    shippingProvider: "GHN Express",
    shippingCode: "GHN998877665",
    products: [
      {
        productName: "Loa Bluetooth",
        variation: "Màu xanh",
        quantity: 1,
        price: 750000,
        imageUrl: "https://placehold.co/50x50/505050/333333?text=Product I",
      },
    ],
  },
];

const shippingUnits = [
  "Tất cả ĐVVC",
  "SPX Express",
  "Giao Hàng Nhanh",
  "Viettel Post",
  "J&T Express",
];

export default function OrderData() {
  const [activeTab, setActiveTab] = useState("Tất cả");
  const [orderCode, setOrderCode] = useState("");
  const [shippingUnitFilter, setShippingUnitFilter] = useState("Tất cả ĐVVC");

  // Filtered orders based on current state
  const filteredOrders = orderData.filter((order) => {
    const matchesOrderCode = orderCode === "" || order.id.includes(orderCode);
    const matchesShippingUnit =
      shippingUnitFilter === "Tất cả ĐVVC" ||
      order.shippingUnit === shippingUnitFilter ||
      order.shippingProvider === shippingUnitFilter;

    let matchesTab = true;
    if (activeTab === "Tất cả") {
      matchesTab = true;
    } else if (activeTab === "Đơn hủy") {
      matchesTab = order.status === "Đã hủy";
    } else if (activeTab === "Chờ xác nhận") {
      matchesTab = order.status === "Chờ xác nhận";
    } else if (activeTab === "Chờ lấy hàng") {
      matchesTab = order.status === "Chờ lấy hàng";
    } else if (activeTab === "Đang giao") {
      matchesTab = order.status === "Đang giao";
    } else if (activeTab === "Đã giao") {
      matchesTab = order.status === "Đã giao";
    } else if (activeTab === "Trả hàng/Hoàn tiền") {
      matchesTab = order.status === "Trả hàng" || order.status === "Hoàn tiền";
    } else if (activeTab === "Giao không thành công") {
      matchesTab = order.status === "Giao không thành công";
    }

    return matchesOrderCode && matchesShippingUnit && matchesTab;
  });

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-sans">
      <div className="max-w-7xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
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

        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 px-6 py-4">
          <div className="flex space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {[
              "Tất cả",
              "Chờ xác nhận",
              "Chờ lấy hàng",
              "Đang giao",
              "Đã giao",
              "Đơn hủy",
              "Trả hàng/Hoàn tiền",
              "Giao không thành công",
            ].map((tab) => (
              <button
                key={tab}
                className={`pb-2 text-sm font-medium ${
                  activeTab === tab
                    ? "border-b-2 border-orange-500 text-orange-500"
                    : "text-gray-600 hover:text-gray-800"
                } transition-colors duration-200`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Section */}
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
          <div className="col-span-1">
            <label
              htmlFor="shippingUnit"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Đơn vị vận chuyển
            </label>
            <select
              id="shippingUnit"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-sm bg-white"
              value={shippingUnitFilter}
              onChange={(e) => setShippingUnitFilter(e.target.value)}
            >
              {shippingUnits.map((unit) => (
                <option key={unit} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
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

        {/* Order List */}
        <div className="p-6">
          <p className="text-sm text-gray-600 mb-4">
            <span className="font-semibold">{filteredOrders.length}</span> Đơn
            hàng
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
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Đếm ngược
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/6">
                    Đơn vị vận chuyển
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-1/12">
                    Thao tác
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredOrders.map((order) => {
                  const totalOrderPrice = order.products.reduce(
                    (sum, product) => sum + product.quantity * product.price,
                    0
                  );
                  const numProducts = order.products.length;

                  return (
                    <React.Fragment key={order.id}>
                      <tr>
                        <td
                          colSpan="6"
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 bg-gray-50"
                        >
                          <span className="font-bold">
                            {order.customerName}
                          </span>
                          <span className="ml-4 text-gray-500">
                            Mã đơn hàng {order.id}
                          </span>
                        </td>
                      </tr>
                      {order.products.map((product, productIndex) => (
                        <tr key={`${order.id}-${productIndex}`}>
                          {/* Product Column */}
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-12 w-12 rounded-md overflow-hidden border border-gray-200">
                                <img
                                  className="h-full w-full object-cover"
                                  src={product.imageUrl}
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
                                  {product.quantity} {product.productName}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {product.variation}
                                </div>
                              </div>
                            </div>
                          </td>

                          {/* Order-level details (only for the first product row) */}
                          {productIndex === 0 && (
                            <>
                              <td
                                rowSpan={numProducts}
                                className="px-6 py-4 whitespace-nowrap align-top"
                              >
                                <div className="text-sm text-gray-900">
                                  {totalOrderPrice.toLocaleString("vi-VN")}
                                </div>
                                <div className="text-sm text-gray-500">
                                  {order.paymentMethod}
                                </div>
                              </td>
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
                                  {order.status}
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
                                {/* Countdown placeholder */}
                              </td>
                              <td
                                rowSpan={numProducts}
                                className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 align-top"
                              >
                                <div className="font-medium">
                                  {order.shippingUnit}
                                </div>
                                <div className="text-xs">
                                  {order.shippingProvider}
                                </div>
                                <div className="text-xs">
                                  {order.shippingCode}
                                </div>
                              </td>
                              <td
                                rowSpan={numProducts}
                                className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium align-top"
                              >
                                <button className="text-blue-600 hover:text-blue-900">
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

          {/* Footer message */}
          <p className="text-sm text-gray-500 mt-6">
            Chỉ đơn sau 28/05/2023 được hiển thị. Bạn đang cần tìm đơn cũ hơn?
            Bạn dùng mục Xuất báo cáo nhé.
          </p>

          {/* Pagination */}
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
