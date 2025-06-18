import { useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

import apiUser from "../../../api/apiUser";

const Register = () => {
  const navigate = useNavigate();

  const [shopName, setShopName] = useState("");
  const [pickupAddress, setPickupAddress] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");

  const handleSellerRegister = async () => {
    try {
      const data = {
        email,
        password,
        username: shopName,
        address: pickupAddress,
        phone: phoneNumber,
      };
      const response = await apiUser.sellerRegister(data);
      console.log(response);
      Swal.fire({
        title: "Đăng ký thành công",
        text: "Bạn đã trở thành nhà bán hàng Peter",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/seller/login");
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Thất bại!",
        text: "Bạn đã đăng ký rồi!",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 sm:p-6 lg:p-8 font-inter">
      <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8 lg:p-10 w-full max-w-4xl">
        <div className="border-b border-gray-500 pb-4">
          <h1 className="font-semibold text-orange-500">
            Trang đăng ký bán hàng
          </h1>
        </div>

        <div className="space-y-6 mt-10">
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label
              htmlFor="shopName"
              className="block text-gray-700 font-medium w-full sm:w-1/3 mb-1 sm:mb-0"
            >
              <span className="text-red-500">*</span> Tên Shop
            </label>
            <div className="flex-grow flex items-center border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-orange-200">
              <input
                type="text"
                id="shopName"
                className="flex-grow p-2.5 outline-none rounded-l-lg"
                value={shopName}
                onChange={(e) => setShopName(e.target.value.slice(0, 30))}
                maxLength="30"
                placeholder="Tên shop / tối đa 30 kí tự"
              />
              <span className="text-gray-500 text-sm pr-2.5">
                {shopName.length}/30
              </span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <label
              htmlFor="pickupAddress"
              className="block text-gray-700 font-medium w-full sm:w-1/3 mb-1 sm:mb-0"
            >
              <span className="text-red-500">*</span> Địa chỉ lấy hàng
            </label>
            <div className="flex-grow flex items-center space-x-2">
              <input
                type="text"
                id="pickupAddress"
                className="flex-grow p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
                value={pickupAddress}
                onChange={(e) => setPickupAddress(e.target.value)}
                placeholder="Thêm địa chỉ"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <label
              htmlFor="email"
              className="block text-gray-700 font-medium w-full sm:w-1/3 mb-1 sm:mb-0"
            >
              <span className="text-red-500">*</span> Email
            </label>
            <input
              type="email"
              id="email"
              className="flex-grow p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Địa chỉ email"
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center">
            <label
              htmlFor="phoneNumber"
              className="block text-gray-700 font-medium w-full sm:w-1/3 mb-1 sm:mb-0"
            >
              <span className="text-red-500">*</span> Số điện thoại
            </label>
            <input
              type="tel"
              id="phoneNumber"
              className="flex-grow p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Số điện thoại liên hệ"
            />
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center">
            <label
              htmlFor="password"
              className="block text-gray-700 font-medium w-full sm:w-1/3 mb-1 sm:mb-0"
            >
              <span className="text-red-500">*</span> Mật khẩu
            </label>
            <input
              type="password"
              id="password"
              className="flex-grow p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-200"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
            />
          </div>
        </div>

        <div className="mt-8 flex justify-end space-x-4">
          <button
            onClick={handleSellerRegister}
            className="px-6 py-2.5 bg-orange-500 text-white rounded-lg font-semibold hover:bg-orange-600 transition-colors duration-200 shadow-md"
          >
            Đăng ký
          </button>
        </div>
      </div>
    </div>
  );
};

export default Register;
