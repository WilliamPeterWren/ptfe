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

    navigate("/shipper/login");
  };

  return (
    <div className="w-64 h-full border-r p-4 bg-white">
      <h1 className="sm:w-48 lg:w-64 text-xl font-bold mb-8">
        Nhân viên giao hàng
      </h1>
      <hr className="flex-1 border-t border-red-300 mb-4" />
      <nav className="flex flex-col space-y-2">
        <Link
          to={`/shipper/order/recieve`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/shipper/order/recieve"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Nhận đơn hàng</button>
        </Link>

        <Link
          to={`/shipper/order/order-list`}
          className={`border border-gray-200 p-2 rounded-lg block text-left w-full
            ${
              location.pathname === "/shipper/order/order-list"
                ? "bg-blue-500 text-white"
                : "hover:bg-gray-200"
            }`}
        >
          <button>Danh sách đơn hàng</button>
        </Link>
      </nav>
      <div className="mt-16 border border-red-500 p-2 rounded hover:border-blue-500 hover:bg-blue-500 hover:text-white">
        <button onClick={handleLogOut}>Đăng xuất</button>
      </div>
    </div>
  );
}
