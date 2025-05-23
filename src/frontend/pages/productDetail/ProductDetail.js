import React from "react";

import Detail from "./Detail";
import SellerInfo from "./SellerInfo";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import FromSeller from "./FromSeller";
import Perhap from "./Perhap";

function ProductDetail() {
  return (
    <div className="py-4 bg-gray-200">
      <Detail />
      <SellerInfo />
      <ProductInfo />
      <ProductReviews />
      <FromSeller />
      <Perhap />
    </div>
  );
}

export default ProductDetail;
