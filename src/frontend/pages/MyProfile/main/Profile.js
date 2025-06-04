import React from "react";
import Cookies from "js-cookie";

function Profile() {
  const username = Cookies.get("username");
  const email = Cookies.get("email");
  return (
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
                Tên hiển thị
              </label>
              <input
                type="text"
                placeholder={username}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="text"
                placeholder={email}
                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
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
  );
}

export default Profile;
