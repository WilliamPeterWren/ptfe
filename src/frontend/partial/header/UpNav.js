import React, { useState, useContext } from "react";

import { imageUrl } from "../../../api/config";

import Cookies from "js-cookie";

import UserContext from "../../../context/userContext";
import { Link, useNavigate } from "react-router-dom";

function UpNav() {
  const { user } = useContext(UserContext);
  
  const email = Cookies.get("email");
  const username = Cookies.get("username");
  
  const [showDropdown, setShowDropdown] = useState(false);

  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };


  const handleLogout = () => {
    setShowDropdown(!showDropdown);
    navigate("/logout");
  };

  const handleUsernameClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div>
      <div className="text-customText flex justify-between max-h-8">
        <div className="flex justify-between py-1">
          <div className="mr-2 border-r-2 border-white pr-2">
            <Link to={`/seller/login`}>Kênh Người Bán</Link>
          </div>
          <div className="mr-2 border-r-2 border-white pr-2">Tải ứng dụng</div>
          <div className="flex justify-items-center">
            <div className="mr-1 pr-1">Kết nối</div>
            <div className="mr-1 pr-1">
              <img
                alt="icon-facebook"
                src={imageUrl + "icons/facebook.png"}
                width={20}
                onError={(e) => {
                  const target = e.target;
                  target.onerror = null;
                  const retryInterval = 2000;
                  let retryCount = 0;
                  const maxRetries = 5;
                  const retryLoad = () => {
                    if (retryCount < maxRetries) {
                      retryCount++;
                      target.src =
                        imageUrl + `icons/facebook.png?retry=${retryCount}`;
                      target.onerror = () => {
                        setTimeout(retryLoad, retryInterval);
                      };
                    } else {
                      target.src =
                        "https://placehold.co/32x32/cccccc/333333?text=N/A";
                    }
                  };
                  setTimeout(retryLoad, retryInterval);
                }}
                loading="lazy"
              />
            </div>
            <div>
              <img
                alt="icon-instagram"
                src={imageUrl + "icons/instagram.png"}
                width={20}
                onError={(e) => {
                  const target = e.target;
                  target.onerror = null;
                  const retryInterval = 2000;
                  let retryCount = 0;
                  const maxRetries = 5;
                  const retryLoad = () => {
                    if (retryCount < maxRetries) {
                      retryCount++;
                      target.src =
                        imageUrl + `icons/instagram.png?retry=${retryCount}`;
                      target.onerror = () => {
                        setTimeout(retryLoad, retryInterval);
                      };
                    } else {
                      target.src =
                        "https://placehold.co/32x32/cccccc/333333?text=N/A";
                    }
                  };
                  setTimeout(retryLoad, retryInterval);
                }}
                loading="lazy"
              />
            </div>
          </div>
        </div>

        <div className="flex just-items-center py-2">
          <div className="flex justify-items-center mr-2 pr-2 e">
            <div className="mr-1">
              <img
                alt="notification"
                src={imageUrl + "icons/notification.png"}
                width={20}
                onError={(e) => {
                  const target = e.target;
                  target.onerror = null;
                  const retryInterval = 2000;
                  let retryCount = 0;
                  const maxRetries = 5;
                  const retryLoad = () => {
                    if (retryCount < maxRetries) {
                      retryCount++;
                      target.src =
                        imageUrl + `icons/notification.png?retry=${retryCount}`;
                      target.onerror = () => {
                        setTimeout(retryLoad, retryInterval);
                      };
                    } else {
                      target.src =
                        "https://placehold.co/32x32/cccccc/333333?text=N/A";
                    }
                  };
                  setTimeout(retryLoad, retryInterval);
                }}
                loading="lazy"
              />
            </div>
            <div className="">Thông báo</div>
          </div>
          <div className="flex justify-items-center mr-2 pr-2 ">
            <div className="mr-1 pr-1">
              <img
                alt="help"
                src={imageUrl + "icons/question.png"}
                width={22}
                onError={(e) => {
                  const target = e.target;
                  target.onerror = null;
                  const retryInterval = 2000;
                  let retryCount = 0;
                  const maxRetries = 5;
                  const retryLoad = () => {
                    if (retryCount < maxRetries) {
                      retryCount++;
                      target.src =
                        imageUrl + `icons/question.png?retry=${retryCount}`;
                      target.onerror = () => {
                        setTimeout(retryLoad, retryInterval);
                      };
                    } else {
                      target.src =
                        "https://placehold.co/32x32/cccccc/333333?text=N/A";
                    }
                  };
                  setTimeout(retryLoad, retryInterval);
                }}
                loading="lazy"
              />
            </div>
            <div className="">Hỗ trợ</div>
          </div>
          <div className="flex justify-items-center mr-2 pr-2 ">
            <div>Tiếng Việt</div>
            <div className="mt-1 ml-1">
              <img
                alt="down-arrow"
                src={imageUrl + "icons/down-arrow.png"}
                width={16}
                onError={(e) => {
                  e.target.onerror = null;
                  // e.target.src = defaultImage(item);
                }}
                loading="lazy"
              />
            </div>
          </div>
          <div>
            {username ? (
              <div className="relative">
                {" "}
                <button
                  onClick={handleUsernameClick}
                  className="hover:text-blue-500"
                >
                  {username}
                </button>
                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg z-10">
                    <Link
                      to={`user/account/profile`}
                      className="block px-4 py-2 text-gray-800 hover:bg-gray-100"
                      onClick={() => setShowDropdown(false)}
                    >
                      Trang cá nhân
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <button
                  className="border-r-2 border-white pr-2 hover:text-blue-500"
                  onClick={handleLogin}
                >
                  Đăng nhập
                </button>
                <button
                  className="pl-2 hover:text-blue-500"
                  onClick={handleRegister}
                >
                  Đăng ký
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UpNav;
