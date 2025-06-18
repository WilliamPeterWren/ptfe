import React from "react";
import { Link } from "react-router-dom";
import { calculateDuration } from "../../../utils/CountDate";

const SellerInfo = ({ sellerInfo }) => {
  return (
    <div className="max-w-[1540px] mt-4 mx-auto bg-white rounded-lg shadow-md p-4 flex items-start space-x-4">
      <div className="flex-shrink-0">
        <div className="text-2xl font-bold text-black">
          {sellerInfo.sellerUsername}{" "}
        </div>
        <div className="text-sm text-gray-600"></div>
      </div>

      <div className="flex-1">
        <h1 className="text-xl font-semibold text-gray-800 mb-2">
         
        </h1>

        <div className="flex space-x-2 mb-3 border-b border-gray-500 pb-4">
          <span className="bg-red-500 text-white text-xs font-semibold px-2 py-1 rounded uppercase">
            PETER MALL
          </span>
          {/* <button className="border border-gray-300 text-gray-600 text-xs font-semibold px-2 py-1 rounded flex items-center">
            <span className="mr-1">💬</span> Chat Ngay
          </button> */}
          <button className="border border-gray-300 text-gray-600 text-xs font-semibold px-2 py-1 rounded flex items-center">
            <Link to={`/seller/page/${sellerInfo.sellerId}`}>
              <span className="mr-1">🏪</span> Xem Shop
            </Link>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Đánh Giá</span>
              <span className="text-gray-800 font-semibold">
                {sellerInfo.rating}{" "}
              </span>
            </div>
            <div className="flex justify-between mb-1">
              <span className="text-gray-600">Sản Phẩm</span>
              <span className="text-gray-800 font-semibold">
                {sellerInfo.countProduct}
              </span>
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
            <span className="text-gray-800 font-semibold">
              {sellerInfo?.createdAt &&
                calculateDuration(sellerInfo?.createdAt)}{" "}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600">Nguời Theo Dõi</span>
            <span className="text-gray-800 font-semibold">
              {sellerInfo.follower}{" "}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInfo;
