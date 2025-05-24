import React from "react";
import CategorySlider from "./CategorySlider";
import BrandsSection from "./BrandsSection";
import ProductList from "./ProductList";
import { useParams } from "react-router-dom";

function ProductByCategory() {

  const {category} = useParams();

  console.log(category)

  return (
    <div className="py-4 bg-gray-200 pl-80 pr-96">
      <CategorySlider />
      <BrandsSection />
      <ProductList />
    </div>
  );
}

export default ProductByCategory;
