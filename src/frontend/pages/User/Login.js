import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

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
        // console.log(res.data);
        if (res.status === 200) {
          const data = res.data.result;
          Cookies.set("accessToken", data.accessToken, {
            expires: 1,
          });
          Cookies.set("refreshToken", data.refreshToken, {
            expires: 7,
          });
          Cookies.set("id", data.id, { expires: 1 });
          Cookies.set("email", data.email, { expires: 1 });
          Cookies.set("username", data.username, { expires: 1 });

          setUser(data.username);

          navigate("/home");
        }
      })
      .catch((err) => {
        console.log(err);
        throw err;
      });
  };

  const handleRegister = () => {
    console.log("to register page");
  };

  return (
    <section className="">
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
              <span className="text-gray-500">Quên mật khẩu?</span>{" "}
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
