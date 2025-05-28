import Header from "./partial/Header";
import Footer from "./partial/Footer";

import { Outlet } from "react-router-dom";

function Index() {
  return (
    <div className="">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Index;
