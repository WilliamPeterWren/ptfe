import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import apiProduct from "../../../api/apiProduct";
import { useParams } from "react-router-dom";

import Sidebar from "./SideBar";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

import { imageUrl } from "../../../api/config";
import CategorySlider from "./CategorySlider";

function SearchProducts() {
  const [products, setProducts] = useState([]);

  // const [searchParams] = useSearchParams();

  // const query = searchParams.get("query");

  const { productname } = useParams();

  const getProductBySearch = async () => {
    await apiProduct
      .searchProductByProductName(productname)
      .then((res) => {
        const data = res.data.content;
        console.log(data);
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getProductBySearch();
  }, [productname]);

  const pageTitle = "Tìm kiếm sản phẩm";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <img alt="not found" src={imageUrl + "icons/notfound.png"} />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-1/5  mr-2">
        <Sidebar />
      </div>
      <div className="w-4/5 ml-2">
        <CategorySlider />

        <FilterBar />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        <Pagination />
      </div>
    </div>
  );
}

export default SearchProducts;
