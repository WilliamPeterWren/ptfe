import { useEffect } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";

import Sidebar from "./components/Sidebar";
import Login from "./pages/auth/Login";

function IndexAdmin() {
  const navigate = useNavigate();
  const location = useLocation();

  const admintoken = Cookies.get("admintoken");

  useEffect(() => {
    if (!admintoken) {
      navigate("/admin/login");
    }
  }, []);

  if (!admintoken) {
    return <Login />;
  }

  return (
    <div className="flex just-center bg-gray-200">
      {location.pathname !== "/admin/login" &&
        location.pathname !== "/admin" && <Sidebar />}

      <div className="ml-4 min-w-[1500px] max-w-[1500px] bg-white">
        <Outlet />
      </div>
    </div>
  );
}

export default IndexAdmin;
