import React from "react";
import CountDown from "./CountDown";
import Banner from "./Banner";
import ProductGrid from "./ProductGrid";

function FlashSale() {
  return (
    <div className="py-4 bg-gray-200 w-full">
      <CountDown />
      <Banner />

      <div className="mx-auto mx-80">
        <ProductGrid />
      </div>
    </div>
  );
}

export default FlashSale;
