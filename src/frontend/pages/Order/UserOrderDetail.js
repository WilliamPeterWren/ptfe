import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import Cookies from "js-cookie";

import apiOrderDetail from "../../../api/apiOrderDetail";

import UserOrderDetailItem from "./UserOrderDetailItem";

function UserOrderDetail() {
  const [orderDetail, setOrderDetail] = useState();

  const userId = Cookies.get("authId");
  //   console.log(userId);
  const navigate = useNavigate();

  const { id } = useParams();

  useEffect(() => {
    if (!userId) {
      navigate("/login");
    } else {
      apiOrderDetail.getOrderDetailByOrderId(id).then((res) => {
        // console.log(res.data);
        const formOrderDetail = res.data.map((item) => {
          return {
            id: item.id,
            order_id: parseInt(item.attributes.order_id),
            product_id: parseInt(item.attributes.product_id),
            quantity: parseInt(item.attributes.quantity),
            price: item.attributes.price,
          };
        });

        setOrderDetail(formOrderDetail);
        // console.log(formOrderDetail);
      });
    }
  }, [userId, id, navigate]);

  var totalPrice = 0;

  return (
    <section className="">
      <h1>user order detail</h1>
    </section>
  );
}

export default UserOrderDetail;
