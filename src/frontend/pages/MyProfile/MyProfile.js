import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Sidebar from "./SideBar";
import Profile from "./main/Profile";
import UserOrder from "./UserOrder";
import Notification from "./main/Notification";
import Account from "./main/Account";
import Bank from "./main/Bank";
import Address from "./main/Address";
import ChangePassword from "./main/ChangePassword";
import Library from "./main/Library";
import Voucher from "./Voucher";
import PeterXu from "./main/PeterXu";
import Sale from "./main/Sale";

function MyProfile() {
  const [activeSection, setActiveSection] = useState("profile");

  const pageTitle = "Thông tin của bạn";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  return (
    <section className="max-h-full flex min-h-screen bg-gray-100">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
      />
      {activeSection === "profile" && <Profile />}
      {activeSection === "order" && <UserOrder />}
      {activeSection === "notification" && <Notification />}
      {activeSection === "account" && <Account />}
      {activeSection === "bank" && <Bank />}
      {activeSection === "address" && <Address />}
      {activeSection === "changePassword" && <ChangePassword />}
      {activeSection === "library" && <Library />}
      {activeSection === "voucher" && <Voucher />}
      {activeSection === "peterXu" && <PeterXu />}
      {activeSection === "sale" && <Sale />}
    </section>
  );
}

export default MyProfile;
