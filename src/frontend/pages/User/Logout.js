import React, { useEffect, useContext } from "react";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import UserContext from "../../../context/userContext";

function Logout() {
  const { setUser } = useContext(UserContext);

  // Remove cookies
  Cookies.remove("authId");
  Cookies.remove("authEmail");
  Cookies.remove("authPassword");

  Cookies.remove("authFirstname");
  Cookies.remove("authLastname");

  const navigate = useNavigate();

  useEffect(() => {
    setUser("");
    navigate("/login");
  });

  return (
    <div>
      <h1>logout page</h1>
    </div>
  );
}

export default Logout;
