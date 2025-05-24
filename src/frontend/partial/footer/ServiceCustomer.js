import React from 'react'
import { imageUrl } from "../../../api/config";

function ServiceCustomer() {
  return (
    <div className="flex justify-center mt-6">
      <div className="mx-4">
        <h1 className="font-bold uppercase">DỊCH VỤ KHÁCH HÀNG</h1>
        <p>Trung Tâm Trợ Giúp</p>
        <p>Peter Blog</p>
        <p>Peter Mall</p>
        <p>Hướng Dẫn Mua Hàng/Đặt Hàng</p>
        <p>Hướng Dẫn Bán Hàng</p>
        <p>Ví PeterPay</p>
        <p>Peter Xu</p>
        <p>Đơn Hàng</p>
        <p>Trả Hàng/Hoàn Tiền</p>
        <p>Chính Sách Bảo Hành</p>
      </div>
      <div className="mx-4">
        <h1 className="font-bold uppercase">Peter VIỆT NAM</h1>
        <p>Về Peter</p>
        <p>Tuyển Dụng</p>
        <p>Điều Khoản Peter</p>
        <p>Chính Sách Bảo Mật</p>
        <p>Peter Mall</p>
        <p>Kênh Người Bán</p>
        <p>Flash Sale</p>
        <p>Tiếp Thị Liên Kết</p>
        <p>Liên Hệ Truyền Thông</p>
      </div>
      <div className="mx-4">
        <div>
          <h1 className="font-bold uppercase">Thanh toán</h1>
          <div className="grid grid-cols-3 gap-4">
            <img
              alt="americanexpress"
              src={imageUrl + "purchase/americanexpress.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="jbc"
              src={imageUrl + "purchase/jbc.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="mastercard"
              src={imageUrl + "purchase/mastercard.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="Peterpay"
              src={imageUrl + "purchase/shopepay.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="visa"
              src={imageUrl + "purchase/visa.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
          </div>
          <h1 className="font-bold uppercase mt-10">ĐƠN VỊ VẬN CHUYỂN</h1>
          <div className="grid grid-cols-3 gap-4">
            <img
              alt="ahamove"
              src={imageUrl + "shipping/ahamove.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="be"
              src={imageUrl + "shipping/be.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="ghn"
              src={imageUrl + "shipping/ghn.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="grabexpress"
              src={imageUrl + "shipping/grabexpress.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="jtexpress"
              src={imageUrl + "shipping/j&texpress.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="ninjavan"
              src={imageUrl + "shipping/ninjavan.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="shopeeexpress"
              src={imageUrl + "shipping/shopeeexpress.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="viettelpost"
              src={imageUrl + "shipping/viettelpost.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              alt="vnpost"
              src={imageUrl + "shipping/vnpost.png"}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
      <div className="mx-4">
        <h1 className="font-bold uppercase">THEO DÕI Peter</h1>
        <div className="flex justify-items-center mt-2">
          <img
            alt="facebook"
            src={imageUrl + "follow/facebook.png"}
            width={25}
            onError={(e) => {
              e.target.onerror = null;
              // e.target.src = defaultImage(item);
            }}
            loading="lazy"
          />
          <p className="ml-4">Facebook</p>
        </div>
        <div className="flex justify-items-center mt-2">
          <img
            alt="instagram"
            width={25}
            src={imageUrl + "follow/instagram.png"}
            onError={(e) => {
              e.target.onerror = null;
              // e.target.src = defaultImage(item);
            }}
            loading="lazy"
          />
          <p className="ml-4">Instagram</p>
        </div>
        <div className="flex justify-items-center mt-2">
          <img
            alt="linkdin"
            width={25}
            src={imageUrl + "follow/linkedin.png"}
            onError={(e) => {
              e.target.onerror = null;
              // e.target.src = defaultImage(item);
            }}
            loading="lazy"
          />
          <p className="ml-4">LinkdIn</p>
        </div>
      </div>
      <div className="mx-4">
        <h1 className="font-bold uppercase">TẢI ỨNG DỤNG Peter</h1>
        <div className="flex justify-between">
          <div>
            <img
              alt="qr"
              src={imageUrl + "peter/qr.jpg"}
              width={80}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
          </div>
          <div>
            <img
              className="mt-2"
              alt="appgallery"
              src={imageUrl + "peter/appgallery.png"}
              width={70}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              className="mt-2"
              alt="applestore"
              src={imageUrl + "peter/applestore.png"}
              width={70}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
            <img
              className="mt-2"
              alt="googleplay"
              src={imageUrl + "peter/googleplay.png"}
              width={70}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item);
              }}
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ServiceCustomer
