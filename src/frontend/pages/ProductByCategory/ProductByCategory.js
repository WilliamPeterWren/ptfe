import React, { useEffect } from "react";
import CategorySlider from "./CategorySlider";
import PeterMall from "./PeterMall";
import ProductList from "./ProductList";
import { useParams } from "react-router-dom";

function ProductByCategory() {
  const { category } = useParams();

  console.log(category);

  const pageTitle = "Tìm kiếm sản phẩm theo ngành hàng";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  return (
    <div className="py-4 bg-gray-200">
      <CategorySlider />
      <PeterMall />
      <ProductList category={category} />
    </div>
  );
}

export default ProductByCategory;
