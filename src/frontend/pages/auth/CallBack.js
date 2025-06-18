import React, { useEffect, useState, useContext } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import UserContext from "../../../context/userContext";
import apiUser from "../../../api/apiUser";

const Callback = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { setUser: setContextUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const queryParams = new URLSearchParams(location.search);
        const email = queryParams.get("email");
        const name = queryParams.get("name");
        const id = queryParams.get("id");

        if (!email || !name || !id) {
          throw new Error("Missing user information in callback URL");
        }

        const userData = { id, email, username: name };
        setUser(userData);

        console.log("email: " + email);
        const checkEmail = await apiUser.checkEmail(email);
        console.log(checkEmail);
        if (!checkEmail.data) {
          const registerRes = await apiUser.register({ email });
          console.log("User registered:", registerRes);
        }

        // const cleanedEmail = email.replace(/"/g, "");
        const res = await apiUser.loginWithGoogle({ email: email });

        const data = res.data.result;

        console.log(data);

        // Remove cookies
        Cookies.remove("id");
        Cookies.remove("email");
        Cookies.remove("accessToken");
        Cookies.remove("refreshToken");
        Cookies.remove("username");
        Cookies.remove("addressId");
        Cookies.remove("avatar");
        Cookies.remove("addressId");

        Cookies.set("accessToken", data.accessToken, {
          expires: 1,
        });
        Cookies.set("refreshToken", data.refreshToken, {
          expires: 7,
        });
        Cookies.set("id", data.id, { expires: 1 });
        Cookies.set("email", data.email, { expires: 1 });
        Cookies.set("username", data.username, { expires: 1 });
        if (data.addressId != null) {
          Cookies.set("addressId", data.addressId, { expires: 1 });
        }
        Cookies.set("avatar", data.avatar, { expires: 1 });

        const peterVoucher = Object.entries(data.peterVoucher).map(
          ([id, value]) => ({
            id,
            value,
          })
        );

        Cookies.set("peterVoucher", JSON.stringify(peterVoucher), {
          expires: 1,
        });

        const shippingVoucher = Object.entries(data.shippingVoucher).map(
          ([id, value]) => ({
            id,
            value,
          })
        );

        Cookies.set("shippingVoucher", JSON.stringify(shippingVoucher), {
          expires: 1,
        });

        // const COOKIES_EXPIRE_DAYS = 1;
        // Cookies.set("id", id, { expires: COOKIES_EXPIRE_DAYS });
        // Cookies.set("email", email, { expires: COOKIES_EXPIRE_DAYS });
        // Cookies.set("username", name, { expires: COOKIES_EXPIRE_DAYS });
        // Cookies.set("avatar", "", { expires: COOKIES_EXPIRE_DAYS });
        // Cookies.set("accessToken", "", { expires: COOKIES_EXPIRE_DAYS });
        // Cookies.set("refreshToken", "", { expires: 7 });

        setContextUser(userData);
        navigate("/home");
      } catch (error) {
        console.error("Callback error:", error);
        Swal.fire({
          title: "Đăng nhập thất bại",
          text: "Không thể lấy thông tin người dùng!",
          icon: "error",
          timer: 2000,
          timerProgressBar: true,
          showConfirmButton: false,
        });
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate, setContextUser, location]);

  const handleLogout = () => {
    window.location.href = "http://localhost:8889/api/auth/logout";
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-md space-y-4 text-center">
      <h1 className="text-2xl font-semibold">Chào mừng, {user.username}!</h1>
      <p>Email: {user.email}</p>
      <p>ID: {user.id}</p>
      <button
        onClick={handleLogout}
        className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
      >
        Đăng xuất
      </button>
    </div>
  );
};

export default Callback;
