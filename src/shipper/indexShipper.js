import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import UserContext from "../context/userContext";
import Sidebar from "./components/Sidebar";
import Login from "./pages/auth/Login";

function IndexShipper() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(UserContext);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/shipper/login");
    }
  }, []);

  if (!accessToken) {
    return <Login />;
  }

  return (
    <div className="flex just-center bg-gray-200">
      {location.pathname !== "/shipper/login" && <Sidebar />}
      <div className="ml-4 min-w-[1500px] max-w-[1500px] bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default IndexShipper;
