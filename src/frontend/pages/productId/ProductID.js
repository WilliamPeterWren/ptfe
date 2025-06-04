import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";

function ProductID() {
  const { productId } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState();
  const getProductById = async () => {
    await apiProduct
      .getProductById(productId)
      .then((res) => {
        console.log(res.data.result);
        setProduct(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductById();
  }, [productId]);

  if (product) {
    navigate(`/product-detail/${product.slug}`);
  }
  return <div>trang chuyển hướng từ id sang slug</div>;
}

export default ProductID;
