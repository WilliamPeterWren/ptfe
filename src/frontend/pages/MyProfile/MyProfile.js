import React, { useState, useEffect } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Sidebar from "./SideBar";
import Profile from "./Profile";
import UserOrder from "./UserOrder";
import Notification from "./Notification";
import Account from "./Account";
import Bank from "./Bank";
import Address from "./Address";
import ChangePassword from "./ChangePassword";
import Library from "./Library";
import Voucher from "./Voucher";
import PeterXu from "./PeterXu";
import Sale from "./Sale";

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
