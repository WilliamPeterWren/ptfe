import { useState, useEffect } from "react";

import Sidebar from "./SideBar";
import Profile from "./main/Profile";
import UserOrder from "./main/UserOrder";
// import Notification from "./main/Notification";
// import Account from "./main/Account";
// import Bank from "./main/Bank";
import Address from "./main/Address";
// import ChangePassword from "./main/ChangePassword";
// import Library from "./main/Library";
import Voucher from "./main/Voucher";
// import PeterXu from "./main/PeterXu";
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
      <main className="">
        {activeSection === "profile" && <Profile />}
        {activeSection === "order" && <UserOrder />}
        {/* {activeSection === "notification" && <Notification />} */}
        {/* {activeSection === "account" && <Account />} */}
        {/* {activeSection === "bank" && <Bank />} */}
        {activeSection === "address" && <Address />}
        {/* {activeSection === "changePassword" && <ChangePassword />} */}
        {/* {activeSection === "library" && <Library />} */}
        {activeSection === "voucher" && <Voucher />}
        {/* {activeSection === "peterXu" && <PeterXu />} */}
        {activeSection === "sale" && <Sale />}
      </main>
    </section>
  );
}

export default MyProfile;
