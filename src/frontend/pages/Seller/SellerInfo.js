import React, { useState, useEffect } from "react";
import apiUser from "../../../api/apiUser";
import { useParams } from "react-router-dom";

import { calculateDuration } from "../../../utils/CountDate";

const SellerInfo = ({ categories }) => {
  const { sellerId } = useParams();

  const [sellerInfo, setSellerInfo] = useState();

  const getSellerInfo = async () => {
    await apiUser
      .getSellerInfo(sellerId)
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setSellerInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSellerInfo();
  }, [sellerId]);

  return (
    <div className="bg-gray-900 text-white p-4 flex flex-col">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
          <span className="text-pink-400">🐰</span>
        </div>
        <div>
          <h2 className="text-lg font-bold"> {sellerInfo?.sellerUsername} </h2>
          <p className="text-sm text-gray-400">Online 18 phút trước</p>
        </div>
      </div>

      <div className="flex space-x-4 mt-2 text-sm">
        <div>📦 Sản Phẩm: {sellerInfo?.countProduct} </div>
        <div>👥 Người Theo Dõi: {sellerInfo?.follower} </div>
        <div>
          📈 Đánh Giá: {sellerInfo?.star} ({sellerInfo?.rating} Đánh Giá)
        </div>
        <div>⏰ Đang Theo: {sellerInfo?.following} </div>
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
        <div>
          👤 Tham Gia:{" "}
          {sellerInfo?.createdAt && calculateDuration(sellerInfo?.createdAt)}{" "}
        </div>
      </div>

      <div className="flex space-x-4 mt-4 border-t border-gray-700 pt-2 text-sm">
        {categories.map((item, index) => {
          return (
            <button key={index} className="text-gray-400 uppercase">
              {item.categoryName}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SellerInfo;
