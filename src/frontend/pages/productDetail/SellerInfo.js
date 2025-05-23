import React from "react";

const SellerInfo = () => {
  return (
    <div className="max-w-[1540px] mt-4 mx-auto bg-white rounded-lg shadow-md p-4 flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="text-2xl font-bold text-black">VENTAS</div>
        <div className="text-sm text-gray-600">Ventas Home Life</div>
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
          Online 17 Phút Trước
        </h1>

        <div className="flex space-x-2 mb-3">
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded">
            SHOPEE MALL
          </span>
          <button className="border border-gray-300 text-gray-600 text-xs font-semibold px-2 py-1 rounded flex items-center">
            <span className="mr-1">💬</span> Chat Ngay
          </button>
          <button className="border border-gray-300 text-gray-600 text-xs font-semibold px-2 py-1 rounded flex items-center">
            <span className="mr-1">🏪</span> Xem Shop
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Đánh Giá</span>
              <span className="text-gray-800 font-semibold">34,7K</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Sản Phẩm</span>
              <span className="text-gray-800 font-semibold">49</span>
            </div>
          </div>
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Tỉ Lệ Phản Hồi</span>
              <span className="text-gray-800 font-semibold">100%</span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Thời Gian Phản Hồi</span>
              <span className="text-gray-800 font-semibold">
                trong vài phút
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm mt-3">
          <div className="flex justify-between">
            <span className="text-gray-600">Tham Gia</span>
            <span className="text-gray-800 font-semibold">18 tháng trước</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Nguời Theo Dõi</span>
            <span className="text-gray-800 font-semibold">9,3K</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
