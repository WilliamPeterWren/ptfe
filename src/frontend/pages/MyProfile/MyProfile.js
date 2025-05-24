import React from "react";
import { Link, Route, Routes } from "react-router-dom";

import Sidebar from "./SideBar";

function MyProfile() {
  const menuItems = [
    { label: "Thông Báo", icon: "🔔", color: "text-red-500" },
    { label: "Tài Khoản Của Tôi", icon: "👤", color: "text-blue-500" },
    { label: "Hồ Sơ", icon: "📝", color: "text-blue-500", active: true },
    { label: "Ngân Hàng", icon: "🏦", color: "text-blue-500" },
    { label: "Địa Chỉ", icon: "📍", color: "text-blue-500" },
    { label: "Đổi Mật Khẩu", icon: "🔒", color: "text-blue-500" },
    { label: "Cài Đặt Thông Báo", icon: "⚙️", color: "text-blue-500" },
    { label: "Thư Viện Thành Lập Riêng", icon: "📚", color: "text-blue-500" },
    { label: "Đơn Mua", icon: "📦", color: "text-blue-500" },
    { label: "Kho Voucher", icon: "🎟️", color: "text-blue-500" },
    { label: "Peter Xu", icon: "💰", color: "text-yellow-500" },
    {
      label: "25.5 Sale Cuối Tháng",
      icon: "🔥",
      color: "text-blue-500",
      badge: "New",
    },
  ];
  return (
    <section className="max-h-full pl-80 pr-80 flex min-h-screen bg-gray-100">
      <div className="max-h-[570px] w-64 bg-white shadow-md mt-6 rounded">
        <div className="p-4 flex items-center space-x-3 border-b">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full"
          />
          <div>
            <p className="font-semibold">pykenhamster</p>
            <p className="text-sm text-orange-500 cursor-pointer hover:underline">
              SỬA HỒ SƠ
            </p>
          </div>
        </div>
        <ul className="mt-2">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={`flex items-center px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                item.active ? "bg-gray-100 font-semibold" : ""
              }`}
            >
              <span className={`mr-3 ${item.color}`}>{item.icon}</span>
              <span className="flex-1">{item.label}</span>
              {item.badge && (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded">
                  {item.badge}
                </span>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex-1 p-6">
        <div className="max-w-3xl mx-auto bg-white shadow-md rounded p-6">
          <h2 className="text-xl font-bold mb-4 text-center">Hồ Sơ Của Tôi</h2>
          <p className="text-center text-gray-600 mb-6">
            Quản lý thông tin hồ sơ để bảo mật tài khoản
          </p>

          <div className="flex flex-col md:flex-row gap-6">
            <div className="space-y-4 flex-1">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên đăng nhập
                </label>
                <input
                  type="text"
                  placeholder="pykenhamster"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Tên
                </label>
                <input
                  type="text"
                  placeholder="william"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  placeholder="py******@gmail.com"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Số điện thoại
                </label>
                <input
                  type="text"
                  placeholder="******24"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm bg-gray-100"
                  disabled
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Giới tính
                </label>
                <div className="mt-1 flex space-x-4">
                  <label className="flex items-center">
                    <input
                      type="radio"
                      name="gender"
                      className="mr-2"
                      defaultChecked
                    />
                    Nam
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="gender" className="mr-2" />
                    Nữ
                  </label>
                  <label className="flex items-center">
                    <input type="radio" name="gender" className="mr-2" />
                    Khác
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Ngày sinh
                </label>
                <input
                  type="date"
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div className="flex justify-start">
                <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">
                  Lưu
                </button>
              </div>
            </div>

            <div className="flex flex-col items-center mt-4 md:mt-0">
              <img
                src="https://via.placeholder.com/150"
                alt="profile 0"
                className="w-36 h-36 rounded-full mb-2"
              />
              <button className="text-blue-500 hover:underline mb-2">
                Chọn Ảnh
              </button>
              <p className="text-sm text-gray-500 text-center">
                Dung lượng tệp tối đa 1MB
                <br />
                Định dạng: JPEG, PNG
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyProfile;
