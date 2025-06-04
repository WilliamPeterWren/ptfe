import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import AddressSection from "./AddressSection";
import SellerSection from "./SellerSection";
import PaymentSummary from "./PaymentSummary";
import apiPeterVoucher from "../../../api/apiPeterVoucher";

function CheckOut() {
  // const userId = Cookies.get("id");

  // const navigate = useNavigate();
  // const dispatch = useDispatch();

  const checkouts = useSelector((state) => state.checkout.checkouts);
  console.log(checkouts);

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
        const data = res.data.result;
        console.log(data);
        setPeterVouchers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getPeterVouchers();
  }, []);

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
        peterVouchers={peterVouchers}
        setPeterVoucher={setPeterVoucher}
        peterVoucher={peterVoucher}
        setPeterVoucherId={setPeterVoucherId}
        peterVoucherId={peterVoucherId}
      />
    </div>
  );
}

export default CheckOut;
