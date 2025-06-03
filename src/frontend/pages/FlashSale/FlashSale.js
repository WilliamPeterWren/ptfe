import React, { useEffect } from "react";
import CountDown from "./CountDown";
import Banner from "./Banner";
import ProductGrid from "./ProductGrid";

function FlashSale() {
  const pageTitle = "Flashsale";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  return (
    <div className="py-4 bg-gray-200">
      <CountDown />
      <Banner />

      <div className="mx-auto">
        <ProductGrid />
      </div>
    </div>
  );
}

export default FlashSale;
