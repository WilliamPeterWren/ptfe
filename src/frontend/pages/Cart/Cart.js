import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { TOTAL, CLEAR } from "../../../redux/action/cartAction";
import CartItem from "./CartItem";

function Cart() {
  const id = Cookies.get("authId");
  console.log(id);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) {
      navigate("/login");
    }
  }, [id]);

  var totalSalePrice = 0;
  const getDataCart = useSelector((state) => state.cart.carts);

  const dispatch = useDispatch();
  dispatch(TOTAL());
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const clearCart = () => {
    dispatch(CLEAR());
  };

  return (
    <section className="">
      <h1>cart</h1>
    </section>
  );
}

export default Cart;
