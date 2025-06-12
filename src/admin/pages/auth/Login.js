import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import apiUser from "../../../api/apiUser";
import UserContext from "../../../context/userContext";
// import Dashboard from "../dashboard/Dashboard";
// import IndexAdmin from "../../indexAdmin";

function Login() {
  const { setUser } = useContext(UserContext);
  setUser(null);

  const navigate = useNavigate();

  // const accessToken = Cookies.get("accessToken");

  const [formLogin, setFormLogin] = useState({
    email: "",
    password: "",
  });

  const [passwordVisible, setPasswordVisible] = useState(false);
  const [error, setError] = useState("");

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handleChangeFormLogin = (e) => {
    const { name, value } = e.target;
    setFormLogin((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formLogin.email || !formLogin.password) {
      setError("Please enter both email and password.");
      return;
    }

    try {
      const res = await apiUser.login(formLogin);

      if (res.status === 200) {
        const data = res.data.result;
        const roles = data.roles;
        let isAdmin = false;

        roles.forEach((r) => {
          if (r.name === "ROLE_ADMIN") {
            isAdmin = true;
          }
        });

        if (isAdmin) {
          // console.log(data);

          setUser(data.email);
          Cookies.set("id", data.id, { expires: 7 });
          Cookies.set("email", data.email, { expires: 7 });
          Cookies.set("username", data.username, { expires: 7 });
          Cookies.set("accessToken", data.accessToken, { expires: 7 });
          // Cookies.set("avatar", data.avatar, { expires: 1 });
          // console.log("navigate");

          navigate("/admin/dashboard");
        } else {
          setError("Không được phép truy cập: Trang người giao hàng");
        }
      } else {
        setError(
          res.data.message || "Login failed. Please check your credentials."
        );
      }
    } catch (err) {
      console.error("Login error:", err);

      setError(
        err.response?.data?.message ||
          "An error occurred during login. Please try again."
      );
    }
  };

  // if (accessToken !== undefined) {
  //   return <IndexAdmin />;
  // }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-center mb-6">
          <svg
            className="w-8 h-8 mr-2 text-indigo-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 2a10 10 0 00-8.66 5H3a9 9 0 000 2h.34A10 10 0 1012 2zm0 4a6 6 0 00-5.2 3H5a7 7 0 000 2h1.8A6 6 0 1012 6z"
            />
          </svg>
          <h1 className="text-2xl font-bold text-gray-700">Peter Admin</h1>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          Trang quản trị Peter
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Truy cập vào trang quản trị Peter
        </p>
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <strong className="font-bold">Error!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {" "}
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Email
            </label>
            <input
              type="text"
              name="email"
              placeholder="Enter your email address or username"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
              onChange={handleChangeFormLogin}
              value={formLogin.email}
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-semibold mb-1">
              Mật khẩu
            </label>
            <div className="relative">
              <input
                type={passwordVisible ? "text" : "password"}
                name="password"
                placeholder="Enter your passcode"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                onChange={handleChangeFormLogin}
                value={formLogin.password}
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d={
                      passwordVisible
                        ? "M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 7c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm0-14c-3.314 0-6 2.686-6 6s2.686 6 6 6 6-2.686 6-6-2.686-6-6-6z"
                        : "M13.875 18.825A10.05 10.05 0 0112 19c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8c0 1.03-.195 2.015-.547 2.928M15 12a3 3 0 11-6 0 3 3 0 016 0zm-3 7c-3.314 0-6-2.686-6-6s2.686-6 6-6 6 2.686 6 6-2.686 6-6-6zM3 3l18 18"
                    }
                  />
                </svg>
              </button>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-500 text-white py-3 rounded-lg font-semibold hover:bg-indigo-600 transition-colors uppercase"
          >
            ĐĂNG NHẬP
          </button>
        </form>
        <p className="text-center text-gray-600 mt-4">
          Bạn chưa có tài khoản?{" "}
          <a href="/" className="text-indigo-500">
            Đăng ký làm người giao hàng
          </a>
        </p>
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <p className="mx-4 text-gray-500">hoặc</p>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
        <div className="flex justify-center gap-4">
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100">
            <svg
              className="w-5 h-5 mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.99.66-2.26 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
            </svg>
            Google
          </button>
          <button className="flex items-center px-4 py-2 border rounded-lg hover:bg-gray-100">
            <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21 5.973 22 12 22z" />
            </svg>
            Facebook
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
