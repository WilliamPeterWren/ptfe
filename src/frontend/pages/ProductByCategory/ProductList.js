import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { imageUrl } from "../../../api/config";
import apiProduct from "../../../api/apiProduct";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import Sidebar from "./SideBar";

function ProductList({ categories, setCategoryId, categoryId }) {

  const [products, setProducts] = useState([]);
  const [pagable, setPagable] = useState();

  const getProducts = async () => {
    await apiProduct
      .getProductByPeterCategory(categoryId)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setPagable(data.pageable);
        setProducts(data.content);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getProducts();
  }, [categoryId]);



  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-1/5  mr-2">
        <Sidebar categories={categories} setCategoryId={setCategoryId} />
      </div>
      <div className="w-4/5 ml-2">
        <FilterBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        <Pagination pagable={pagable} />
      </div>
    </div>
  );
}

export default ProductList;
