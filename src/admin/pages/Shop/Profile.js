import React, { useState } from "react";

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Thông tin cơ bản");

  // Dummy data for the shop information
  const shopInfo = {
    name: "MANOFTHEMATCH-FASHION",
    logoUrl: "https://placehold.co/100x100/E0E0E0/333333?text=Shop+Logo",
    logoGuidelines: [
      "Kích thước hình ảnh tiêu chuẩn: Chiều rộng 300px, Chiều cao 300px",
      "Dung lượng tệp tối đa: 2.0MB",
      "Định dạng tệp được hỗ trợ: JPG, JPEG, PNG",
    ],
    description: "",
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-6 font-sans">
      <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Tabs Navigation */}
        <div className="border-b border-gray-200 px-4 sm:px-6 py-3">
          <div className="flex space-x-6 overflow-x-auto whitespace-nowrap scrollbar-hide">
            {["Thông tin cơ bản", "Thông tin Thuế", "Thông tin Định Danh"].map(
              (tab) => (
                <button
                  key={tab}
                  className={`pb-2 text-base font-medium ${
                    activeTab === tab
                      ? "border-b-2 border-orange-500 text-orange-500"
                      : "text-gray-600 hover:text-gray-800"
                  } transition-colors duration-200`}
                  onClick={() => setActiveTab(tab)}
                >
                  {tab}
                </button>
              )
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-4 sm:p-6">
          {activeTab === "Thông tin cơ bản" && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Thông tin cơ bản
                </h2>
                <div className="flex space-x-3">
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 transition-colors text-sm">
                    Xem Shop của tôi
                  </button>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors text-sm">
                    Chỉnh sửa
                  </button>
                </div>
              </div>

              <div className="space-y-6">
                {/* Tên Shop */}
                <div className="flex flex-col sm:flex-row sm:items-center">
                  <label
                    htmlFor="shopName"
                    className="w-full sm:w-1/4 text-gray-600 text-sm font-medium mb-1 sm:mb-0"
                  >
                    Tên Shop
                  </label>
                  <input
                    className="w-full sm:w-3/4 text-gray-900 text-base"
                    defaultValue={shopInfo.name}
                    disabled={true}
                  />
                </div>

                {/* Logo của Shop */}
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <label
                    htmlFor="shopLogo"
                    className="w-full sm:w-1/4 text-gray-600 text-sm font-medium mb-2 sm:mb-0"
                  >
                    Logo của Shop
                  </label>
                  <div className="w-full sm:w-3/4 flex items-center space-x-4">
                    <div className="flex-shrink-0 w-24 h-24 rounded-md overflow-hidden border border-gray-200">
                      <img
                        src={shopInfo.logoUrl}
                        alt="Shop Logo"
                        className="w-full h-full object-contain p-2"
                        onError={(e) => {
                          e.target.onerror = null;
                          e.target.src =
                            "https://placehold.co/100x100/E0E0E0/333333?text=Error";
                        }}
                      />
                    </div>
                    <div className="text-sm text-gray-500 space-y-1">
                      {shopInfo.logoGuidelines.map((line, index) => (
                        <p key={index}>- {line}</p>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Mô tả Shop */}
                <div className="flex flex-col sm:flex-row sm:items-start">
                  <label
                    htmlFor="shopDescription"
                    className="w-full sm:w-1/4 text-gray-600 text-sm font-medium mb-1 sm:mb-0"
                  >
                    Mô tả Shop
                  </label>
                  <input
                    className="w-full sm:w-3/4 text-gray-900 text-base"
                    defaultValue={shopInfo.description || "Chưa có mô tả"}
                    disabled={true}
                  />
                </div>
              </div>
            </div>
          )}

          {activeTab === "Thông tin Thuế" && (
            <div className="text-gray-700">
              <h2 className="text-xl font-bold mb-4">Thông tin Thuế</h2>
              <p>Nội dung về thông tin thuế sẽ được hiển thị tại đây.</p>
            </div>
          )}

          {activeTab === "Thông tin Định Danh" && (
            <div className="text-gray-700">
              <h2 className="text-xl font-bold mb-4">Thông tin Định Danh</h2>
              <p>Nội dung về thông tin định danh sẽ được hiển thị tại đây.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
