import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/userContext";

function Logout() {
  const { setUser } = useContext(UserContext);

  const navigate = useNavigate();

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

    navigate("/login");
  });

  return (
    <div>
      <h1>logout page</h1>
    </div>
  );
}

export default Logout;
