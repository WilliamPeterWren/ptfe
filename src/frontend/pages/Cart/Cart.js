import CartItem from "./CartItem";
import Perhap from "./Perhap";
import userContext from "../../../context/userContext";
import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";

function Cart() {
  const { user } = useContext(userContext);
  console.log(user);
  const navigate = useNavigate();

  if (!user) {
    navigate("/login");
  }

  const pageTitle = "Giỏ hàng";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  return (
    <section className="mx-auto bg-gray-200">
      <div className="h-[4px] bg-red-400 my-4"></div>
      <div className="">
        <CartItem />
      </div>

      <div className="">
        <Perhap />
      </div>
    </section>
  );
}

export default Cart;
