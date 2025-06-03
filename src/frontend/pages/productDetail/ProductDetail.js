import React, { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";

import Detail from "./Detail";
import SellerInfo from "./SellerInfo";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./ProductReviews";
import FromSeller from "./FromSeller";
import Perhap from "./Perhap";

import apiProduct from "../../../api/apiProduct";

function ProductDetail() {
  const { slug } = useParams();

  const [onload, setOnload] = useState(false);
  const [product, setProduct] = useState();
  const getProduct = useCallback(async () => {
    try {
      const res = await apiProduct.getBySlug(slug);
      // console.log(res.data.result);
      setProduct(res.data.result);
      setOnload(!onload);
    } catch (err) {
      console.log(err);
    }
  }, [slug]);

  useEffect(() => {
    getProduct();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageTitle = "Chi tiết sản phẩm";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  if (product === undefined) {
    return;
  }

  return (
    <div className="py-4 bg-gray-200">
      <Detail productData={product} />
      <SellerInfo sellerId={product.sellerId} />
      <ProductInfo product={product} />
      {/* <ProductReviews /> */}
      <FromSeller sellerId={product.sellerId} />
      <Perhap />
    </div>
  );
}

export default ProductDetail;
