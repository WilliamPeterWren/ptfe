import { Link } from "react-router-dom";
import { calculateDuration } from "../../../../utils/CountDate";
import EmbeddedGoogleMap from "../components/EmbeddedGoogleMap";

function UserInfo({ userInfo, address }) {
  return (
    <div className="p-8">
      <div className="flex justify-items">
        <Link
          to={`/admin/manageuser`}
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
        <p className="font-bold text-orange-600 text-xl mb-2 underline">
          Thông tin khách hàng
        </p>
      </div>

      <div className="flex justify-items">
        <div className="mr-4">
          <p>
            <span className="font-semibold text-lg mr-4">Tên shop:</span>
            <span className="font-semibold text-yellow-600 text-lg">
              {userInfo.username}
            </span>
          </p>
          <p>
            <span className="font-semibold text-lg mr-4">Email:</span>
            <span className="font-semibold text-yellow-600 text-lg">
              {userInfo.email}
            </span>
          </p>
          <p>
            <span className="font-semibold text-lg mr-4">Tham gia từ:</span>
            <span className="font-semibold text-yellow-600 text-lg">
              {calculateDuration(userInfo.createdAt)} trước
            </span>
          </p>
        </div>
        <div className="ml-4">
          <p>
            <span className="font-semibold text-lg mr-4">Họ:</span>
            <span className="font-semibold text-yellow-600 text-lg">
              {address.firstName}
            </span>
          </p>
          <p>
            <span className="font-semibold text-lg mr-4">Tên:</span>
            <span className="font-semibold text-yellow-600 text-lg">
              {address.lastName}
            </span>
          </p>
          <p>
            <span className="font-semibold text-lg mr-4">Số điện thoại:</span>
            <span className="font-semibold text-yellow-600 text-lg">
              {address.phone}
            </span>
          </p>
        </div>
      </div>
      <div className="mt-2">
        <p className="font-semibold text-purple-800 text-lg">
          Địa chỉ: {address.address}
        </p>
        {address.length !== 0 && address?.address !== undefined ? (
          <div className="text-gray-800 text-sm">
            <EmbeddedGoogleMap userAddress={address.address} />
          </div>
        ) : (
          <div className="text-red-500 font-semibold">
            Chưa có địa chỉ lấy hàng!
          </div>
        )}
      </div>
    </div>
  );
}

export default UserInfo;
