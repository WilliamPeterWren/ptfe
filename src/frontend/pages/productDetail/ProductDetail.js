import React from "react";

import { useParams } from "react-router-dom";

import Detail from "./Detail";
import SellerInfo from "./SellerInfo";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import FromSeller from "./FromSeller";
import Perhap from "./Perhap";

function ProductDetail() {

  const {slug} = useParams();

  console.log("slug: " + slug);
  
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
