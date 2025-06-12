import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import UserContext from "../context/userContext";
import Sidebar from "./components/Sidebar";
import Login from "./pages/auth/Login";

function IndexSeller() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const accessToken = Cookies.get("accessToken");

  useEffect(() => {
    if (!accessToken) {
      navigate("/seller/login");
    }
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="w-full flex just-center bg-gray-200">
      <Sidebar />
      <div className="w-4/5 ml-4 bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default IndexSeller;
