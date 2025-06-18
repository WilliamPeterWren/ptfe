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
    <div className="bg-gray-200">
      <Header />

      <div ref={topRef} className="w-2/3 mx-auto ">
        <Outlet />
      </div>

      <Footer />
    </div>
  );
}

export default Index;
