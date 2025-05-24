import React from "react";

import { imageUrl } from "../../../api/config";

function UpNav() {
  return (
    <div>
      <div className="UpNav text-customText flex justify-between">
        <div className="flex justify-between py-2">
          <div className="mr-2 border-r-2 border-white pr-2">
            Kênh Người Bán
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
                  e.target.onerror = null;
                  // e.target.src = defaultImage(item);
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
                  e.target.onerror = null;
                  // e.target.src = defaultImage(item);
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
                  e.target.onerror = null;
                  // e.target.src = defaultImage(item);
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
                  e.target.onerror = null;
                  // e.target.src = defaultImage(item);
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
          <div>Login</div>
        </div>
      </div>
    </div>
  );
}

export default UpNav;
