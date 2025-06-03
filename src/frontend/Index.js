import { useRef, useEffect } from "react";

import Header from "./partial/Header";
import Footer from "./partial/Footer";

import { Outlet } from "react-router-dom";

function Index() {
  const topRef = useRef();

  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  return (
    <div className="">
      <Header />

      <div ref={topRef} className="px-80 bg-gray-200">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Index;
