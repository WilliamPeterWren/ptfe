import React from "react";

const UserOrders = () => {
  const orders = [
    {
      store: "SHIN STORE - Máy móc ph...",
      items: [
        {
          name: "Đầu bơm xè hòi, bơm xè máy (có 2 loại) -SHINSTORE",
          variant: "Inox thượng",
          price: 20000,
          quantity: 1,
          image: "https://via.placeholder.com/50?text=Inox",
        },
        {
          name: "Đầu bơm xè hòi, bơm xè máy (có 2 loại) -SHINSTORE",
          variant: "Hộp kim TAIWAN xin",
          price: 30000,
          quantity: 1,
          image: "https://via.placeholder.com/50?text=Taiwan",
        },
      ],
      total: 50000,
    },
    {
      store: "Hoa Sim",
      items: [
        {
          name: "(Màu Trắng) Dây đồng hồ da bẻ mềm hoa tiết da trâu BO-29 KHOẢ CÁI chọn thấm nút 12 14 16",
          variant: "Trắng Khoa Bạc, 12mm",
          price: 53300,
          quantity: 1,
          image: "https://via.placeholder.com/50?text=White",
        },
      ],
      total: 54800,
    },
  ];

  const handleBuyAgain = (order) => {
    alert(`Buying again from ${order.store} with total ${order.total}đ`);
    // Add your buy again logic here
  };

  const handleContactSeller = (order) => {
    alert(`Contacting seller ${order.store}`);
    // Add your contact seller logic here
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto p-4 bg-white shadow-md">
        <div className="flex justify-between text-sm mb-4">
          <span className="text-orange-500">Tất cả</span>
          <span>Chờ thanh toán</span>
          <span>Vận chuyển</span>
          <span>Chờ giao hàng</span>
          <span>Hoàn thành</span>
          <span>Đã hủy</span>
          <span>Trả hàng/Hoàn tiền</span>
        </div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Bạn có thể tìm kiếm theo tên Shop, ID đơn hàng hoặc Tên Sản phẩm"
            className="w-full p-2 border rounded"
          />
        </div>
        {orders.map((order, index) => (
          <div
            key={index}
            className="mb-6 border rounded-lg p-4 bg-white shadow-sm"
          >
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center">
                <input type="checkbox" className="mr-2" />
                <span className="text-orange-500 font-bold">{order.store}</span>
                <button className="ml-2 text-blue-500">Chat</button>
                <button className="ml-2 text-blue-500">Xem Shop</button>
              </div>
              <div className="text-green-500 flex items-center">
                <span>ⓘ Giao hàng thành công</span>
                <span className="ml-2 text-red-500">HOÀN THÀNH</span>
              </div>
            </div>
            {order.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex items-center justify-between mb-2"
              >
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 mr-2"
                  />
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.variant}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-500 line-through">
                    {(item.price * 2).toLocaleString()}đ
                  </p>
                  <p className="text-red-500">{item.price.toLocaleString()}đ</p>
                  <p>x{item.quantity}</p>
                </div>
              </div>
            ))}
            <div className="flex justify-between items-center mt-2 border-t pt-2">
              <span>Thành tiền: </span>
              <span className="text-red-500 font-bold">
                {order.total.toLocaleString()}đ
              </span>
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
            <div className="text-green-500 flex items-center mt-2">
              <span>ⓘ Giao hàng thành công</span>
              <span className="ml-2 text-blue-500">ĐÁNH GIÁ</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserOrders;