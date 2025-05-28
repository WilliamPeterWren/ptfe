import React from "react";

const SellerInfo = () => {
  return (
    <div className="bg-gray-900 text-white p-4 flex flex-col">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-pink-400">🐰</span>
        </div>
        <div>
          <h2 className="text-lg font-bold">Housecleaning 24/24</h2>
          <p className="text-sm text-gray-400">Online 18 phút trước</p>
        </div>
      </div>

      <div className="flex space-x-4 mt-2 text-sm">
        <div>📦 Sản Phẩm: 66</div>
        <div>👥 Người Theo Dõi: 528</div>
        <div>📈 Đánh Giá: 4.8 (2.4k Đánh Giá)</div>
        <div>⏰ Đang Theo: 117</div>
      </div>

      <div className="flex space-x-2 mt-2">
        <button className="bg-red-500 text-white px-4 py-2 rounded">
          + Theo Dõi
        </button>
        <button className="bg-gray-700 text-white px-4 py-2 rounded">
          Chat
        </button>
      </div>

      <div className="flex space-x-4 mt-2 text-sm">
        <div>💬 Tỷ Lệ Phản Hồi Chat: 93% (Trong Vài Giờ)</div>
        <div>👤 Tham Gia: 8 Năm Trước</div>
      </div>

      {/* seller category  */}
      <div className="flex space-x-4 mt-4 border-t border-gray-700 pt-2 text-sm">
        <button className="text-gray-400">Dạo</button>
        <button className="text-gray-400">TẤT CẢ SẢN PHẨM</button>
        <button className="text-gray-400">Nhà Cửa & Đời Sống</button>
        <button className="text-gray-400">Thời Trang & Du Lịch</button>
        <button className="text-gray-400">Thiết Bị Điện Gia Dụng</button>
        <button className="text-gray-400">Sức Khỏe</button>
        <button className="text-gray-400">Thêm ▼</button>
      </div>
    </div>
  );
};

export default SellerInfo;
