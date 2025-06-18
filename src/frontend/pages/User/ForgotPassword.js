import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import apiUser from "../../../api/apiUser";
import { imageUrl } from "../../../api/config";

function ForgotPassword() {
  const pageTitle = "Quên mật khẩu?";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  const [formData, setFormData] = useState({
    email: "",
    phone: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    await apiUser
      .forgotpassword(formData)
      .then((res) => {
        console.log(res);

        if (res.status === 200) {
          const data = res.data;

          console.log(data);

          Swal.fire({
            title: "Hãy kiểm tra email của bạn!",
            text: "Bấm xác nhận trong email để được nhận mật khẩu mới!",
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
        if (err.response.data.message === "user is not verified") {
          Swal.fire({
            title: "Thông tin không khớp!",
            text: "Kiểm tra lại email và số điện thoại đăng ký!",
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
              <h2 className="text-2xl font-bold text-orange-500">
                Quên mật khẩu?
              </h2>
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
                name="phone"
                type="text"
                onChange={handleChange}
                placeholder="Số điện thoại"
                className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              <button
                onClick={handleForgotPassword}
                className="w-full bg-orange-500 text-white py-2 rounded hover:bg-orange-600 transition duration-200"
              >
                XÁC NHẬN QUA EMAIL
              </button>
            </div>
            <div className="text-center my-4">
              <Link to="/login">
                <span className="text-gray-500 hover:text-blue-500">
                  Đăng nhập
                </span>
              </Link>{" "}
            </div>
            <div className="my-4 flex items-center">
              <hr className="flex-1 border-t border-gray-300" />
              <span className="mx-2 text-blue-500">HOẶC</span>
              <hr className="flex-1 border-t border-gray-300" />
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

export default ForgotPassword;
