import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import UserContext from "../context/userContext";
import Sidebar from "./components/Sidebar";
// import Login from "./pages/auth/Login";

function IndexSeller() {
  const navigate = useNavigate();
  const location = useLocation();

  const seller = Cookies.get("seller");

  useEffect(() => {
    const currentPath = location.pathname;
    // console.log(currentPath);
    // console.log("seller: " + typeof seller);
    if (!seller && currentPath !== "/seller/register") {
      navigate("/seller/login");
    }
  }, [location.pathname]);

  return (
    <div className="w-full flex just-center bg-gray-200">
      {location.pathname !== "/seller/register" &&
        location.pathname !== "/seller/login" && <Sidebar />}

      <div className="w-full ml-4 bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default IndexSeller;
