import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Swal from "sweetalert2";

import { imageUrl } from "../../../api/config";

import apiUser from "../../../api/apiUser";

function Register() {
  const navigate = useNavigate();

  const pageTitle = "Đăng ký";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  useEffect(() => {}, []);

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log(formData);

    await apiUser
      .register(formData)
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          Swal.fire({
            title: "Đăng ký thành công",
            text: "Bạn hãy vào email để kích hoạt!",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8889/api/auth/google";
  };

  return (
    <section className="bg-white">
      <div className="h-[4px] bg-red-700 my-4"></div>

      <div className=" flex justify-items items-center">
        <div className="w-1/2 p-4 flex flex-col items-center">
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
        <div className="w-1/2 flex items-center justify-center p-4">
          <div className="bg-gray-200 p-6 rounded-lg shadow-lg w-full max-w-md">
            <div className="text-center mb-4">
              <h2 className="text-2xl font-bold text-orange-500">Đăng ký</h2>
            </div>
            <div className="space-y-4">
              <input
                name="email"
                type="email"
                defaultValue={formData.email}
                onChange={handleChange}
                placeholder="Email hoặc số điện thoại"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <input
                name="password"
                type="password"
                defaultValue={formData.password}
                onChange={handleChange}
                placeholder="Mật khẩu"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleRegister}
                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200"
              >
                ĐĂNG KÝ
              </button>
            </div>

            <div className="my-4 flex items-center">
              <hr className="flex-1 border-t border-gray-300" />
              <span className="mx-2 text-blue-500">HOẶC</span>
              <hr className="flex-1 border-t border-gray-300" />
            </div>
            <div className="space-y-2">
              <button
                className="w-full bg-white border border-gray-600 text-black py-2 rounded hover:bg-gray-100 flex items-center justify-center"
                onClick={handleGoogleLogin}
              >
                <svg
                  className="w-8 h-8 mr-2"
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
              Đã có tài khoản?{" "}
              <button onClick={handleLogin}>
                <span className="text-blue-500">Đăng nhập</span>
              </button>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Register;
