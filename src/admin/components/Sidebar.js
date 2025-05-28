import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const location = useLocation();
  const [openSections, setOpenSections] = useState({
    taiChinh: false,
    vanChuyen: false,
    quanLyDonHang: false,
    quanLySanPham: false,
    quanLyShop: false,
  });

  const toggleSection = (sectionToToggle) => {
    setOpenSections((prevState) => {
      const newState = Object.keys(prevState).reduce((acc, key) => {
        acc[key] = false;
        return acc;
      }, {});

      return {
        ...newState,
        [sectionToToggle]: !prevState[sectionToToggle],
      };
    });
  };

  const isSectionActive = (paths) => {
    return paths.some((path) => location.pathname.startsWith(path));
  };

  return (
    <div className="w-64 border-r p-4">
      <h1 className="text-xl font-bold mb-8">Nhà bán hàng</h1>
      <hr className="flex-1 border-t border-red-300 mb-4" />
      <nav className="flex flex-col space-y-2">
        <div>
          <button
            onClick={() => toggleSection("quanLyDonHang")}
            className={`w-full text-left p-2 rounded hover:bg-gray-200 border ${
              isSectionActive([
                "/admin/order/order-list",
                "/admin/delivery/shipping-method",
                "/admin/order/returnrefundcancel",
              ])
                ? "bg-gray-200 font-semibold"
                : ""
            }`}
          >
            Quản lý đơn hàng
            <svg
              className={`w-4 h-4 ml-2 inline transform ${
                openSections.quanLyDonHang ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openSections.quanLyDonHang && (
            <div className="ml-4 mt-2 space-y-2">
              <Link
                to="/admin/order/order-list"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/order/order-list"
                    ? "bg-gray-200 font-semibold border-b border-purple-400"
                    : ""
                }`}
              >
                Tất cả
              </Link>

              {/* <Link
                to="/admin/order/shipping-method"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/delivery/shipping-method"
                    ? "bg-gray-200 font-semibold border-b border-purple-400"
                    : ""
                }`}
              >
                Bàn giao đơn hàng
              </Link> */}
              <Link
                to="/admin/delivery/shipping-method"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/delivery/shipping-method"
                    ? "bg-gray-200 font-semibold border-b border-purple-400"
                    : ""
                }`}
              >
                Cài đặt vận chuyển
              </Link>
              <Link
                to="/admin/order/returnrefundcancel"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname ===
                  "/admin/order/returnrefundcancel"
                    ? "bg-gray-200 font-semibold border-b border-purple-400"
                    : ""
                }`}
              >
                Trả hàng/Hoàn tiền/Hủy
              </Link>
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleSection("quanLySanPham")}
            className={`w-full text-left p-2 rounded hover:bg-gray-200 ${
              isSectionActive([
                "/admin/product/product-list",
                "/admin/product/create",
              ])
                ? "bg-gray-200 font-semibold"
                : ""
            }`}
          >
            Quản lý sản phẩm
            <svg
              className={`w-4 h-4 ml-2 inline transform ${
                openSections.quanLySanPham ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openSections.quanLySanPham && (
            <div className="ml-4 mt-2 space-y-2">
              <Link
                to="/admin/product/product-list"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/product/product-list"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Tất cả sản phẩm
              </Link>
              <Link
                to="/admin/product/create"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/product/create"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Thêm sản phẩm
              </Link>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => toggleSection("taiChinh")}
            className={`w-full text-left p-2 rounded hover:bg-gray-200 ${
              isSectionActive([
                "/admin/finance/revenue",
                "/admin/finance/balance",
                "/admin/finance/banking-account",
                "/admin/finance/payment-setting",
              ])
                ? "bg-gray-200 font-semibold"
                : ""
            }`}
          >
            Tài chính
            <svg
              className={`w-4 h-4 ml-2 inline transform ${
                openSections.taiChinh ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openSections.taiChinh && (
            <div className="ml-4 mt-2 space-y-2">
              <Link
                to="/admin/finance/revenue"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/finance/revenue"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Doanh thu
              </Link>
              <Link
                to="/admin/finance/balance"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/finance/balance"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Số dư TK Peter
              </Link>
              <Link
                to="/admin/finance/banking-account"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/finance/banking-account"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Tài khoản ngân hàng
              </Link>
              <Link
                to="/admin/finance/payment-setting"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/finance/payment-setting"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Cài đặt thanh toán
              </Link>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => toggleSection("quanLyShop")}
            className={`w-full text-left p-2 rounded hover:bg-gray-200 ${
              isSectionActive([
                "/admin/shop/profile",
                "/admin/category/category-list",
                "/admin/discount/seller-discount",
                "/admin/discount/product-discount",
              ])
                ? "bg-gray-200 font-semibold"
                : ""
            }`}
          >
            Quản lý shop
            <svg
              className={`w-4 h-4 ml-2 inline transform ${
                openSections.quanLyShop ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openSections.quanLyShop && (
            <div className="ml-4 mt-2 space-y-2">
              <Link
                to="/admin/shop/profile"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/shop/profile"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Hồ sơ shop
              </Link>
              <Link
                to="/admin/discount/seller-discount"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/discount/seller-discount"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Khuyến mãi của shop
              </Link>
              <Link
                to="/admin/discount/product-discount"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/discount/product-discount"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Khuyến mãi sản phẩm
              </Link>
              <Link
                to="/admin/category/category-list"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/admin/category/category-list"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Danh mục của shop
              </Link>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
}
