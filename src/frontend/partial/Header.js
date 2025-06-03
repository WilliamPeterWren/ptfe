import React, { useContext, useEffect } from "react";
import Cookies from "js-cookie";

import UserContext from "../../context/userContext";

import UpNav from "./header/UpNav";
import DownNav from "./header/DownNav";

function Header() {
  const { user } = useContext(UserContext);
  var username = user ? user : "";
  // console.log("user", user);

  const authFirstname = Cookies.get("authFirstname");
  const authLastname = Cookies.get("authLastname");

  if (authFirstname) {
    username = authFirstname + " " + authLastname;
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <header className="pl-80 bg-customeBg pr-96">
      <UpNav />
      <DownNav />
    </header>
  );
}

export default Header;
