import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";

import SellerInfo from "./SellerInfo";
import GridProduct from "./GridProduct";
import Sidebar from "./SideBar";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

import apiProduct from "../../../api/apiProduct";
import apiCategory from "../../../api/apiCategory";

function SellerPage() {
  const { sellerId } = useParams();
  // console.log(sellerId);

  const pageTitle = "Trang người bán";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  const [products, setProducts] = useState([]);
  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const getProduct = useCallback(async () => {
    try {
      const res = await apiProduct.getRandomProductBySellerIdLimit(sellerId, 6);

      const data = res.data.result;

      // console.log(data);

      const sorted1 = [...data].sort((a, b) => b.sold - a.sold);

      setProducts2(sorted1);

      setProducts1(data);
      // setOnload(!onload);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    getProduct();
  }, []);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const getSellerCategories = async () => {
    await apiCategory
      .getAll(sellerId)
      .then((res) => {
        const data = res.data.result;
        // console.log(data);
        setCategories(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getSellerCategories();
  }, [sellerId]);

  const getRandomProductBySellerIdLimit = async () => {
    await apiProduct
      .getRandomProductBySellerIdLimit(sellerId, 10)
      .then((res) => {
        const data = res.data.result;
        // console.log(data);
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getRandomProductBySellerIdLimit();
  }, [sellerId]);

  const getProductBySellerIdAndCategoryId = async () => {
    await apiProduct
      .getProductBySellerIdAndCategoryId(sellerId, category)
      .then((res) => {
        const data = res.data.result.content;
        // console.log(data);
        setProducts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (category.length > 0) {
      console.log("categoryid: " + category);

      getProductBySellerIdAndCategoryId();
    }
  }, [category]);

  return (
    <div className="mt-4 bg-gray-200">
      <div className=" bg-white my-4">
        <SellerInfo categories={categories} />
      </div>
      <div className=" bg-white my-4">
        <GridProduct name={"gợi ý cho bạn"} products={products1} />
      </div>

      <div className=" bg-white my-4">
        <GridProduct name={"sản phẩm bán chạy"} products={products2} />
      </div>

      <div className=" bg-white my-4">
        <div className="container mx-auto p-4 flex justify-center">
          <div className="w-1/5  mr-2">
            <Sidebar categories={categories} setCategory={setCategory} />
          </div>
          <div className="w-4/5 ml-2">
            <FilterBar />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products?.length > 0 &&
                products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerPage;
