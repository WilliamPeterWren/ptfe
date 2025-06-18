import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import apiUser from "../../../api/apiUser";
import UserContext from "../../../context/userContext";

function Login() {
  const { setUser } = useContext(UserContext);

  const accessToken = Cookies.get("accessToken");

  setUser(null);
  const navigate = useNavigate();

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
        console.log(data);
        const roles = data.roles;
        let isSeller = false;

        roles.forEach((r) => {
          if (r.name === "ROLE_SELLER") {
            isSeller = true;
          }
        });

        if (isSeller) {
          setUser(data.username);
          Cookies.set("id", data.id, { expires: 7 });
          Cookies.set("email", data.email, { expires: 7 });
          Cookies.set("username", data.username, { expires: 7 });
          Cookies.set("accessToken", data.accessToken, { expires: 7 });
          Cookies.set("avatar", data.avatar, { expires: 1 });
          Cookies.set("seller", true, { expires: 1 });

          const rating = Object.entries(data.rating).map(([stars, count]) => ({
            stars,
            count,
          }));

          Cookies.set("rating", JSON.stringify(rating), {
            expires: 1,
          });

          navigate("/seller/finance/revenue");
        } else {
          setError("Không được truy cập: Chỉ dành cho người bán");
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

  useEffect(() => {
    if (accessToken !== undefined) {
      // console.log(accessToken);
      setUser(Cookies.get("username"));
      navigate("/seller/product/product-list");
    }
  }, [accessToken]);

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
          <h1 className="text-2xl font-bold text-gray-700">Peter Seller</h1>
        </div>
        <h2 className="text-3xl font-semibold text-gray-800 text-center mb-2">
          Trang người bán hàng
        </h2>
        <p className="text-gray-600 text-center mb-6">
          Truy cập vào trang quản lý bán hàng của bạn
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
          Bán hàng cùng Peter!{" "}
          <Link to="/seller/register" className="text-indigo-500">
            Đăng ký bán hàng
          </Link>
        </p>
        <div className="flex items-center my-6">
          <div className="flex-1 h-px bg-gray-300"></div>
          <div className="flex-1 h-px bg-gray-300"></div>
        </div>
     
      </div>
    </div>
  );
}

export default Login;
