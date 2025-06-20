import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Swal from "sweetalert2";

import AddressSection from "./AddressSection";
import SellerSection from "./SellerSection";
import PaymentSummary from "./PaymentSummary";
import apiPeterVoucher from "../../../api/apiPeterVoucher";

function CheckOut() {
  // const userId = Cookies.get("id");

  const navigate = useNavigate();
  // const dispatch = useDispatch();

  const addressId = Cookies.get("addressId");
  useEffect(() => {
    if (addressId === undefined || addressId?.length < 5) {
      Swal.fire({
        title: "Cập nhật địa chỉ",
        text: "Bạn hãy vào trang cá nhân cập nhật địa chỉ!",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });

      navigate("/user/account/profile");
    }
  }, [addressId]);

  const checkouts = useSelector((state) => state.checkout.checkouts);
  // console.log(checkouts);

  const pageTitle = "Thanh toán";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  const [peterVouchers, setPeterVouchers] = useState([]);
  const [peterVoucher, setPeterVoucher] = useState(0);
  const [peterVoucherId, setPeterVoucherId] = useState("");

  const getPeterVouchers = async () => {
    await apiPeterVoucher
      .getAll()
      .then((res) => {
        console.log(res);
        const data = res.data.result;
        setPeterVouchers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPeterVouchers();
  }, []);

  // console.log(addressId);

  if (addressId?.length < 5) {
    Swal.fire({
      title: "Bạn chưa cập nhật địa chỉ!",
      text: "Vào trang cá nhân cập nhật địa chỉ để đặt hàng!",
      icon: "error",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  }

  if (addressId === undefined) {
    // navigate("/user/account/profile");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <AddressSection />
      {checkouts.map((seller) => (
        <SellerSection
          key={seller.sellerId}
          seller={seller}
          peterVouchers={peterVouchers}
          setPeterVoucher={setPeterVoucher}
          peterVoucher={peterVoucher}
          setPeterVoucherId={setPeterVoucherId}
          peterVoucherId={peterVoucherId}
        />
      ))}
      <PaymentSummary
        data={checkouts}
        peterVoucher={peterVoucher}
        peterVoucherId={peterVoucherId}
        addressId={addressId}
      />
    </div>
  );
}

export default CheckOut;
