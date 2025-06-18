import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import UserContext from "../../../context/userContext";
import apiUser from "../../../api/apiUser";
import { imageUrl } from "../../../api/config";

function Login() {
  const email = Cookies.get("email");
  const password = Cookies.get("password");

  const pageTitle = "Đăng nhập";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  const [formData, setFormData] = useState({
    email: email,
    password: password,
  });

  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    await apiUser
      .login(formData)
      .then((res) => {
        // console.log(res);

        if (res.status === 200) {
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

          // console.log(peterVoucher);

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

          const follower = Object.entries(data.follower).map(
            ([key, value]) => ({
              value,
            })
          );

          Cookies.set("follower", JSON.stringify(follower), {
            expires: 1,
          });

          const following = Object.entries(data.following).map(
            ([key, value]) => ({
              value,
            })
          );

          Cookies.set("following", JSON.stringify(following), {
            expires: 1,
          });

          setUser(data);

          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        if (err.response.data.message === "user is not verified") {
          Swal.fire({
            title: "Chưa kích hoạt tài khoản",
            text: "Bạn hãy vào email để kích hoạt!",
            icon: "warning",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      });
  };

  const handleRegister = () => {
    console.log("to register page");
    navigate("/register");
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8889/api/auth/google";
  };

  return (
    <section className="bg-white">
      <div className="h-[4px] bg-red-700 my-4"></div>

      <div className=" flex justify-items items-center">
        <div className="w-1/2 p-4  h-full flex flex-col items-center">
          <img
            alt="logo"
            src={imageUrl + "logo/logo.png"}
            onError={(e) => {
              e.target.onerror = null;
              // e.target.src = defaultImage(item);
            }}
            loading="lazy"
            width={200}
            className="mb-4"
          />
          <img
            alt="peter"
            src={imageUrl + "logo/peter black.jpg"}
            onError={(e) => {
              e.target.onerror = null;
              // e.target.src = defaultImage(item);
            }}
            loading="lazy"
            width={200}
          />
        </div>
        <div className="w-1/2  flex items-center justify-center p-4">
          <div className="p-6 bg-gray-200 rounded-lg shadow-lg w-full max-w-md">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-orange-500">Đăng nhập</h2>
            </div>
            <div className="space-y-4">
              <input
                name="email"
                type="email"
                onChange={handleChange}
                placeholder="Email hoặc số điện thoại"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                name="password"
                type="password"
                onChange={handleChange}
                placeholder="Mật khẩu"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleLogin}
                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200"
              >
                ĐĂNG NHẬP
              </button>
            </div>
            <div className="text-center my-4">
              <Link to="/forgot-password">
                <span className="text-gray-500 hover:text-blue-500">
                  Quên mật khẩu?
                </span>
              </Link>
            </div>
            <div className="my-4 flex items-center">
              <hr className="flex-1 border-t border-gray-300" />
              <span className="mx-2 text-blue-500">HOẶC</span>
              <hr className="flex-1 border-t border-gray-300" />
            </div>
            <div className="space-y-2">
              <button
                className="w-full bg-white py-2 border rounded-lg hover:bg-red-50 flex items-center justify-center"
                onClick={handleGoogleLogin}
              >
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
            </div>
            <p className="text-center text-gray-600 mt-4 text-sm">
              Bạn mới biết đến Peter?{" "}
              <button onClick={handleRegister}>
                <span className="text-blue-500">Đăng ký</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
