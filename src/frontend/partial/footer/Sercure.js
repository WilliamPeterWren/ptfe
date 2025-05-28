import React from "react";
import { imageUrl } from "../../../api/config";

function Sercure() {
  return (
    <div className=" py-6 px-4 px-80">
      <nav className="flex justify-center space-x-4 mb-6 text-sm text-gray-600">
        <a href="/" className="hover:underline">
          Chính sách bảo mật
        </a>
        <a href="/" className="hover:underline">
          Quy chế hoạt động
        </a>
        <a href="/" className="hover:underline">
          Chính sách vận chuyển
        </a>
        <a href="/" className="hover:underline">
          Chính sách trả hàng và hoàn tiền
        </a>
      </nav>
      <div className="flex justify-center space-x-4 mb-6">
        <img
          src={imageUrl + "registed/dangky-blue.webp"}
          alt="Bộ Công Thương Certification 1"
          className="w-45 h-20"
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = defaultImage(item);
          }}
          loading="lazy"
        />
        <img
          src={imageUrl + "registed/dangky-red.webp"}
          className="w-45 h-20"
          alt="Bộ Công Thương Certification 2"
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = defaultImage(item);
          }}
          loading="lazy"
        />
        <img
          src={imageUrl + "registed/dangky-blue.webp"}
          className="w-45 h-20"
          alt="Bộ Công Thương Certification 3"
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = defaultImage(item);
          }}
          loading="lazy"
        />
      </div>
      <div className="text-center text-sm text-gray-600">
        <p className="font-semibold">Công ty TNHH Peter</p>
        <p className="mt-2">
          Địa chỉ: Tầng 4-5-6, Tòa nhà Capital Place, số 29 đường Liễu Giai,
          Phường Ngọc Khánh, Quận Ba Đình, Thành phố Hà Nội, Việt Nam. Chăm sóc
          khách hàng: Gọi tổng đài Peter (miễn phí) hoặc Trò chuyện với Peter
          ngay trên Trung tâm trợ giúp
        </p>
        <p className="mt-2">
          Chi nhánh TP. Hồ Chí Minh và Đà Nẵng: Bưu điện Tự Nhiên
        </p>
        <p className="mt-2">
          Mã số doanh nghiệp: 0106773786 do Sở Kế hoạch và Đầu tư TP. Hà Nội cấp
          lần đầu ngày 10/02/2015
        </p>
        <p className="mt-2">© 2015 - Bản quyền thuộc về Công ty TNHH Peter</p>
      </div>
    </div>
  );
}

export default Sercure;
