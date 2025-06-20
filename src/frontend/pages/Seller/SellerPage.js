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
  const [pagable, setPagable] = useState();

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [activeFilter, setActiveFilter] = useState("Phổ Biến");
  const [sortOrder, setSortOrder] = useState("asc");

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

      setCurrentPage(0);
      setTotalPages(1);

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
      .getRandomProductBySellerIdLimit(sellerId, 8)
      .then((res) => {
        const data = res.data.result;
        // console.log(res.data);
        setProducts(data);
        setCurrentPage(0);
        setTotalPages(1);
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
        const data = res.data.result;
        // console.log(data);
        setProducts(data);
        setCurrentPage(0);
        setTotalPages(1);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (category?.length > 0) {
      console.log("categoryid: " + category);

      getProductBySellerIdAndCategoryId();
    } else {
      getRandomProductBySellerIdLimit();
    }
  }, [category]);

  const filters = ["Phổ Biến", "Mới Nhất", "Bán Chạy"];

  const getProducts = async () => {
    await apiProduct
      .getProductBySellerIdAndCategoryId(sellerId, category)
      .then((res) => {
        const data = res.data;
        // console.log(data);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
        setPagable(data.pageable);
        setProducts(data.result.content);
      })
      .catch((err) => console.log(err));
  };

  const getProductByPeterCategoryOrderByCreatedAtDesc = async () => {
    await apiProduct
      .getProductBySellerIdAndCategoryId(sellerId, category)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
        setPagable(data.pageable);
        setProducts(data.result);
      })
      .catch((err) => console.log(err));
  };

  const getProductByPeterCategoryOrderBySoldDesc = async () => {
    await apiProduct
      .getProductBySellerIdAndCategoryId(sellerId, category)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
        setPagable(data.pageable);
        setProducts(data.result);
      })
      .catch((err) => console.log(err));
  };

  const getProductsDesc = async () => {
    await apiProduct
      .getRandomProductBySellerIdLimit(sellerId, 8)
      .then((res) => {
        const data = res.data;

        const sorted1 = [...data.result].sort(
          (a, b) => b.variants[0].price - a.variants[0].price
        );
        // console.log(sorted1);

        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
        setPagable(data.pageable);
        setProducts(sorted1);
      })
      .catch((err) => console.log(err));
  };

  const getProductsAsc = async () => {
    await apiProduct
      .getRandomProductBySellerIdLimit(sellerId, 8)
      .then((res) => {
        const data = res.data;
        // console.log(data);

        const sorted1 = [...data.result].sort(
          (a, b) => a.variants[0].price - b.variants[0].price
        );
        // console.log(sorted1);

        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
        setPagable(data.pageable);
        setProducts(sorted1);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    if (activeFilter === "Phổ Biến") {
      getProducts();
    }

    if (activeFilter === "Mới Nhất") {
      getProductByPeterCategoryOrderByCreatedAtDesc();
    }

    if (activeFilter === "Bán Chạy") {
      getProductByPeterCategoryOrderBySoldDesc();
    }
  }, [category, activeFilter]);

  useEffect(() => {
    if (sortOrder === "asc") {
      // console.log(sortOrder);
      getProductsAsc();
    }

    if (sortOrder === "desc") {
      console.log(sortOrder);
      getProductsDesc();
    }
  }, [sortOrder]);

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
            <FilterBar
              currentPage={currentPage}
              totalPages={totalPages}
              setCurrentPage={setCurrentPage}
              filters={filters}
              setActiveFilter={setActiveFilter}
              activeFilter={activeFilter}
              setSortOrder={setSortOrder}
              sortOrder={sortOrder}
            />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products?.length > 0 &&
                products.map((product, index) => (
                  <ProductCard key={index} product={product} />
                ))}
            </div>
            <Pagination
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              totalPages={totalPages}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SellerPage;
