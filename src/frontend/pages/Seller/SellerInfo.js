import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import apiUser from "../../../api/apiUser";
import { useParams } from "react-router-dom";

import { calculateDuration } from "../../../utils/CountDate";
import { imageUrl } from "../../../api/config";

const SellerInfo = ({ categories }) => {
  const { sellerId } = useParams();

  const following = JSON.parse(Cookies.get("following"));
  // console.log(following);

  const accessToken = Cookies.get("accessToken");

  const [sellerInfo, setSellerInfo] = useState(null);
  const [userFollowing, setUserFollowing] = useState(false);

  const getSellerInfo = async () => {
    await apiUser
      .getSellerInfo(sellerId)
      .then((res) => {
        const data = res.data;
        // console.log(data);

        setSellerInfo(data);

        const isFollowing = following.some((item) => item.value === sellerId);
        setUserFollowing(isFollowing);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSellerInfo();
  }, [sellerId]);

  const handleFollowing = async () => {
    if (!userFollowing) {
      try {
        const res = await apiUser.updateUser(
          { following: sellerId },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );

        const data = res.data;
        console.log(data);

        const updatedFollowing = [...following, { value: sellerId }];
        Cookies.set("following", JSON.stringify(updatedFollowing), {
          expires: 1,
        });

        setUserFollowing(true);
      } catch (error) {
        console.log(error);
      }
    } else {
    }
  };

  if (sellerInfo === null) {
    return null;
  }

  return (
    <div className="bg-gray-900 text-white p-4 flex flex-col">
      <div className="flex items-center space-x-4">
        <div className="w-12 h-12 bg-gray-700 rounded-full flex items-center justify-center">
          {sellerInfo.avatar && sellerInfo.avatar.length > 5 ? (
            <img
              alt={sellerInfo.sellerUsername}
              src={imageUrl + "avatar/" + sellerInfo.avatar}
              className="rounded-full object-cover"
            />
          ) : (
            <span className="text-pink-400">🐰</span>
          )}
        </div>
        <div>
          <h2 className="text-lg font-bold"> {sellerInfo?.sellerUsername} </h2>
          {/* <p className="text-sm text-gray-400">Online 18 phút trước</p> */}
        </div>
      </div>

      <div className="flex space-x-4 mt-2 text-sm">
        <div>📦 Sản Phẩm: {sellerInfo?.countProduct} </div>
        <div>👥 Người Theo Dõi: {sellerInfo?.follower} </div>
        <div>
          📈 Đánh Giá: {sellerInfo?.star.toFixed(1)} ({sellerInfo?.rating} Đánh
          Giá)
        </div>
        <div>⏰ Đang Theo Dõi: {sellerInfo?.following} </div>
      </div>

      <div className="flex space-x-2 mt-2">
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={handleFollowing}
        >
          {userFollowing ? "Đang" : "+"} Theo Dõi
        </button>
        {/* <button className="bg-gray-700 text-white px-4 py-2 rounded">
          Chat
        </button> */}
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
