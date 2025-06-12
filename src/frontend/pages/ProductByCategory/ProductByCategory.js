import React, { useEffect, useState } from "react";
import CategorySlider from "./CategorySlider";
import PeterMall from "./PeterMall";
import ProductList from "./ProductList";
import { useParams } from "react-router-dom";
import apiPeterCategory from "../../../api/apiPeterCategory";

function ProductByCategory() {
  const { category } = useParams();

  const pageTitle = "Tìm kiếm sản phẩm theo ngành hàng";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState(category);

  const getCategories = async () => {
    await apiPeterCategory
      .getAll()
      .then((res) => {
        // console.log(res.data.result);
        setCategories(res.data.result);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="py-4 bg-gray-200">
      <CategorySlider />
      <PeterMall categories={categories} setCategoryId={setCategoryId} />
      <ProductList
        categories={categories}
        setCategoryId={setCategoryId}
        categoryId={categoryId}
      />
    </div>
  );
}

export default ProductByCategory;
