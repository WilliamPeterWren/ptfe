import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { imageUrl } from "../../../api/config";

import apiUser from "../../../api/apiUser";

function Register() {
  const navigate = useNavigate();

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
          navigate("/login");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <section className="">
      <div className="h-[4px] bg-red-700 my-4"></div>

      <div className="px-80 flex justify-items items-center">
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
            src={imageUrl + "logo/peter 2.png"}
            onError={(e) => {
              e.target.onerror = null;
              // e.target.src = defaultImage(item);
            }}
            loading="lazy"
            width={200}
          />
        </div>
        <div className="w-1/2 bg-orange-500 flex items-center justify-center p-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
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
              <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 flex items-center justify-center">
                <span className="mr-2">
                  <img
                    alt="facebook00"
                    src={imageUrl + "icon/facebook00.png"}
                    onError={(e) => {
                      e.target.onerror = null;
                      // e.target.src = defaultImage(item);
                    }}
                    loading="lazy"
                    width={20}
                  />
                </span>{" "}
                Facebook
              </button>
              <button className="w-full bg-red-500 text-white py-2 rounded hover:bg-red-600 flex items-center justify-center">
                <span className="mr-2">
                  <img
                    alt="google00"
                    src={imageUrl + "icon/google00.png"}
                    onError={(e) => {
                      e.target.onerror = null;
                      // e.target.src = defaultImage(item);
                    }}
                    loading="lazy"
                    width={20}
                  />
                </span>{" "}
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
