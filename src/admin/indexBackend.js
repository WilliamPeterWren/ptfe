import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import UserContext from "../context/userContext";
import Sidebar from "./components/Sidebar";
import Login from "./pages/auth/Login";

function IndexAdmin() {
  const navigate = useNavigate();
  const adminCookie = Cookies.get("adminCookie");
  const { user } = useContext(UserContext);

  const username = adminCookie || user;

  useEffect(() => {
    if (!username) {
      navigate("/admin/login");
    }
  }, []);

  if (!username) {
    return <Login />;
  }

  return (
    <div className="flex just-center bg-white">
      <Sidebar />
      <div className="min-w-[1500px]">
        <Outlet />
      </div>
    </div>
  );
}

export default IndexAdmin;
