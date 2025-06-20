import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "../../context/userContext";

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { setUser, user } = useContext(UserContext);
  const username = Cookies.get("username");

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

  const handleLogOut = async () => {
    setUser(null);
    Cookies.remove("id");
    Cookies.remove("email");
    Cookies.remove("username");
    Cookies.remove("accessToken");
    Cookies.remove("avatar");
    Cookies.remove("seller");

    navigate("/seller/login");
  };

  return (
    <div className="w-1/6 min-w-1/6 border-r p-4 bg-white">
      <h1 className="text-xl font-bold mb-8">Nhà bán hàng {username}</h1>
      <hr className="flex-1 border-t border-red-300 mb-4" />
      <nav className="flex flex-col space-y-2">
        <div>
          <button
            onClick={() => toggleSection("quanLyDonHang")}
            className={`w-full text-left p-2 rounded hover:bg-gray-200 border ${
              isSectionActive([
                "/seller/order/order-list",
                "/seller/delivery/shipping-method",
                "/seller/order/returnrefundcancel",
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
                to="/seller/order/order-list"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/order/order-list"
                    ? "bg-gray-200 font-semibold border-b border-purple-400"
                    : ""
                }`}
              >
                Tất cả
              </Link>

              {/* <Link
                to="/seller/delivery/shipping-method"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/delivery/shipping-method"
                    ? "bg-gray-200 font-semibold border-b border-purple-400"
                    : ""
                }`}
              >
                Cài đặt vận chuyển
              </Link>
              <Link
                to="/seller/order/returnrefundcancel"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/order/returnrefundcancel"
                    ? "bg-gray-200 font-semibold border-b border-purple-400"
                    : ""
                }`}
              >
                Trả hàng/Hoàn tiền/Hủy
              </Link> */}
            </div>
          )}
        </div>

        <div>
          <button
            onClick={() => toggleSection("quanLySanPham")}
            className={`w-full text-left p-2 rounded hover:bg-gray-200 ${
              isSectionActive([
                "/seller/product/product-list",
                "/seller/product/create",
                "/seller/product/flashsale",
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
                to="/seller/product/product-list"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/product/product-list"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Tất cả sản phẩm
              </Link>
              <Link
                to="/seller/product/create"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/product/create"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Thêm sản phẩm
              </Link>
              <Link
                to="/seller/product/flashsale"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/product/flashsale"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                FlashSale
              </Link>
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => toggleSection("taiChinh")}
            className={`w-full text-left p-2 rounded hover:bg-gray-200 ${
              isSectionActive([
                "/seller/finance/revenue",
                // "/seller/finance/balance",
                // "/seller/finance/banking-account",
                // "/seller/finance/payment-setting",
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
                to="/seller/finance/revenue"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/finance/revenue"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Doanh thu
              </Link>
              {/* <Link
                to="/seller/finance/balance"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/finance/balance"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Số dư TK Peter
              </Link> */}
              {/* <Link
                to="/seller/finance/banking-account"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/finance/banking-account"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Tài khoản ngân hàng
              </Link> */}
              {/* <Link
                to="/seller/finance/payment-setting"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/finance/payment-setting"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Cài đặt thanh toán
              </Link> */}
            </div>
          )}
        </div>
        <div>
          <button
            onClick={() => toggleSection("quanLyShop")}
            className={`w-full text-left p-2 rounded hover:bg-gray-200 ${
              isSectionActive([
                "/seller/shop/profile",
                "/seller/category/category-list",
                "/seller/discount/seller-discount",
                "/seller/discount/product-discount",
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
                to="/seller/shop/profile"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/shop/profile"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Hồ sơ shop
              </Link>
              {/* <Link
                to="/seller/discount/seller-discount"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/discount/seller-discount"
                    ? "bg-gray-200 font-semibold"
                    : ""
                }`}
              >
                Khuyến mãi của shop
              </Link> */}

              <Link
                to="/seller/category/category-list"
                className={`block p-2 rounded hover:bg-gray-200 ${
                  location.pathname === "/seller/category/category-list"
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

      <div className="mt-16 border border-red-500 p-2 rounded hover:border-blue-500 hover:bg-blue-500 hover:text-white">
        <button onClick={handleLogOut}>Đăng xuất</button>
      </div>
    </div>
  );
}
