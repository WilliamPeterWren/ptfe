import React, { useState, useEffect, useCallback } from "react";
import SellerInfo from "./SellerInfo";
import GridProduct from "./GridProduct";
import Sidebar from "./SideBar";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";

function SellerPage() {
  const { sellerId } = useParams();
  console.log(sellerId);

  const pageTitle = "Trang người bán";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  const [products1, setProducts1] = useState([]);
  const [products2, setProducts2] = useState([]);
  const getProduct = useCallback(async () => {
    try {
      const res = await apiProduct.getRandomProductBySellerIdLimit(
        sellerId,
        10
      );

      const data = res.data.result;

      console.log(data);

      const sorted1 = [...data].sort(
        (a, b) => b.sold - a.sold
      );

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

  return (
    <div className="mt-4 bg-gray-200">
      <div className=" bg-white my-4">
        <SellerInfo />
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
            <Sidebar />
          </div>
          <div className="w-4/5 ml-2">
            <FilterBar />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {/* {products.map((product, index) => (
                <ProductCard key={index} {...product} />
              ))} */}
            </div>
            <Pagination />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerPage;
