import React, { useState, useEffect, useCallback } from "react";

import { useParams } from "react-router-dom";
import Cookies from "js-cookie";

import Detail from "./Detail";
import SellerInfo from "./SellerInfo";
import ProductInfo from "./ProductInfo";
import ProductReviews from "./reviews/ProductReviews";
import FromSeller from "./FromSeller";
import Perhap from "./Perhap";
import apiReview from "../../../api/apiReview";

import apiProduct from "../../../api/apiProduct";
import apiUser from "../../../api/apiUser";
import Swal from "sweetalert2";

function ProductDetail() {
  const { slug } = useParams();
  const latestFlashsale = Cookies.get("latestFlashsale");

  // const [onload, setOnload] = useState(false);
  const [product, setProduct] = useState();
  const [reviews, setReviews] = useState([]);
  const [sellerInfo, setSellerInfo] = useState([]);

  const getProduct = useCallback(async () => {
    try {
      let res = null;
      if (latestFlashsale === undefined) {
        console.log("no flashsale id");
        res = await apiProduct.getBySlug(slug);
      } else {
        console.log("yes flashsale id");

        res = await apiProduct.getBySlugAndFlashsaleId(slug, latestFlashsale);
      }

      const data = res.data.result;
      console.log(data);
      setProduct(data);

      if (data.blocked) {
        Swal.fire({
          title: "Sản phẩm tạm khóa!",
          text: "Sản phẩm đang được admin khóa!",
          icon: "warning",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }

      const reviewRes = await apiReview.getReview(data?.id);
      // console.log(reviewRes.data.content);
      setReviews(reviewRes.data.content);

      const sellerInfoResponse = await apiUser.getSellerInfo(data.sellerId);
      setSellerInfo(sellerInfoResponse.data);
      // console.log(sellerInfoResponse.data);

      // setOnload((prev) => !prev);
    } catch (err) {
      console.error(err);
    }
  }, [slug]);

  const updateProductViews = async () => {
    apiProduct.updateProductViews(slug);
  };

  useEffect(() => {
    getProduct();
    updateProductViews();
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
      <Detail productData={product} reviewsLength={reviews.length} />
      <SellerInfo sellerInfo={sellerInfo} />
      <ProductInfo product={product} />
      <ProductReviews
        variants={product.variants}
        rating={product.rating}
        reviews={reviews}
      />
      <FromSeller sellerId={product.sellerId} />
      <Perhap />
    </div>
  );
}

export default ProductDetail;
