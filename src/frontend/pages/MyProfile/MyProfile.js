import React, { useState } from "react";
import { Link, Route, Routes } from "react-router-dom";

import Sidebar from "./SideBar";
import Profile from "./Profile";
import UserOrder from "./UserOrder";

function MyProfile() {
  const [showProfile, setShowProfile] = useState(false);
  const [showOrder, setShowOrder] = useState(true);

  return (
    <section className="max-h-full pl-80 pr-80 flex min-h-screen bg-gray-100">
      <Sidebar setShowOrder={setShowOrder} setShowProfile={setShowProfile} />
      {showProfile && <Profile />}
      {showOrder && <UserOrder />}
    </section>
  );
}

export default MyProfile;
