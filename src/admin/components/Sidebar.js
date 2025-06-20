import { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import UserContext from "../../context/userContext";

export default function Sidebar() {
  const { setUser } = useContext(UserContext);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    setUser(null);
    Cookies.remove("id");
    Cookies.remove("email");
    Cookies.remove("username");
    Cookies.remove("accessToken");
    Cookies.remove("avatar");

    navigate("/admin/login");
  };

  return (
    <div className="w-64 h-full border-r p-4 bg-white min-h-screen">
      <h1 className="sm:w-48 lg:w-64 text-xl font-bold mb-8">Quản trị Peter</h1>
      <hr className="flex-1 border-t border-red-300 mb-4" />
      <nav className="flex flex-col space-y-2">
        {/* <Link
          to={`/admin/dashboard`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/admin/dashboard"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Dashboard</button>
        </Link> */}

        <Link
          to={`/admin/flashsale`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/admin/flashsale"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Flashsale</button>
        </Link>

        <Link
          to={`/admin/shippingfee`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/admin/shippingfee"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Phí giao hàng</button>
        </Link>

        <Link
          to={`/admin/shippingvoucher`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/admin/shippingvoucher"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Khuyến mãi giao hàng</button>
        </Link>

        <Link
          to={`/admin/petervoucher`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/admin/petervoucher"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Khuyến mãi Peter</button>
        </Link>

        <Link
          to={`/admin/petercategory`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/admin/petercategory"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Ngành hàng</button>
        </Link>

        <Link
          to={`/admin/manageuser`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/admin/manageuser"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Quản lý khách hàng</button>
        </Link>

        <Link
          to={`/admin/manageseller`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/admin/manageseller"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Quản lý người bán</button>
        </Link>
        <Link
          to={`/admin/manageshipper`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/admin/manageshipper"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button className="text-left">Quản lý nhân viên vận chuyển</button>
        </Link>
        <Link
          to={`/admin/manageproduct`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/admin/manageproduct"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Quản lý sản phẩm</button>
        </Link>
        <Link
          to={`/admin/manageorder`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/admin/manageorder"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Quản lý đơn hàng</button>
        </Link>
      </nav>
      <div className="mt-16 border border-red-500 p-2 rounded hover:border-blue-500 hover:bg-blue-500 hover:text-white">
        <button onClick={handleLogOut}>Đăng xuất</button>
      </div>
    </div>
  );
}
