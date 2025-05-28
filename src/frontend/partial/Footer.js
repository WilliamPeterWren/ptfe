import React from "react";

import AboutPeter from "./footer/AboutPeter";
import ServiceCustomer from "./footer/ServiceCustomer";
import Chat from "./footer/Chat";
import Sercure from "./footer/Sercure";

function Footer() {
  return (
    <footer className="mt-4">
      <div className="h-[4px] bg-red-700 "></div>
      <AboutPeter />
      <div className="bg-red-500 h-[4px] my-2"></div>
      <ServiceCustomer />
      <div className="bg-red-500 h-[4px] my-2"></div>
      <Sercure />
      <Chat />
    </footer>
  );
}

export default Footer;
