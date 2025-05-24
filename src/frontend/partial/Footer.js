import React from "react";

import AboutPeter from "./footer/AboutPeter";
import ServiceCustomer from "./footer/ServiceCustomer";
import Chat from "./footer/Chat";

function Footer() {
  return (
    <footer className="mt-4">
      <div className="h-[4px] bg-red-700 "></div>
      <AboutPeter />
      <ServiceCustomer />
      <Chat />
    </footer>
  );
}

export default Footer;
