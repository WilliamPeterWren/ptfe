import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

import { useDispatch } from "react-redux";
import UserContext from "../../../context/userContext";
import { CLEAR } from "../../../redux/action/cartAction";

function Logout() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    setUser(null);
    // Remove cookies
    Cookies.remove("id");
    Cookies.remove("email");
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    Cookies.remove("username");
    Cookies.remove("addressId");
    Cookies.remove("avatar");
    Cookies.remove("addressId");

    dispatch(CLEAR());

    navigate("/login");
  });

  return (
    <div>
      <h1>logout page</h1>
    </div>
  );
}

export default Logout;
