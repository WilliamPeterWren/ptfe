import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import UserContext from "../context/userContext";
import Sidebar from "./components/Sidebar";
import Login from "./pages/auth/Login";

function IndexSeller() {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  useEffect(() => {
    if (!user) {
      navigate("/seller/login");
    }
  }, []);

  if (!user) {
    return <Login />;
  }

  return (
    <div className="flex just-center bg-gray-200">
      <Sidebar />
      <div className="ml-4 min-w-[1500px] max-w-[1500px] bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default IndexSeller;
