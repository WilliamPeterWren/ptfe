import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { imageUrl } from "../../../api/config";

import apiOrder from "../../../api/apiOrder";
import {
  ADD_CHECKOUT,
  TOTAL_CHECKOUT,
  REMOVE_CHECKOUT,
  CLEAR_CHECKOUT,
} from "../../../redux/action/checkoutAction";

import { getAllCheckoutItems } from "../../../redux/reducers/checkoutReducer";
import AddressSection from "./AddressSection";
import SellerSection from "./SellerSection";
import PaymentSummary from "./PaymentSummary";

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

  return (
    <div className="min-h-screen bg-gray-100">
      <AddressSection />
      {checkouts.map((seller) => (
        <SellerSection key={seller.sellerId} seller={seller} />
      ))}
      <PaymentSummary data={checkouts} />
    </div>
  );
}

export default CheckOut;
