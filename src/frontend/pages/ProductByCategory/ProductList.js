import React, { useState, useEffect } from "react";
// import { useParams } from "react-router-dom";

// import { imageUrl } from "../../../api/config";
import apiProduct from "../../../api/apiProduct";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import Sidebar from "./SideBar";

function ProductList({ categories, setCategoryId, categoryId }) {
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [activeFilter, setActiveFilter] = useState("Phổ Biến");
  const [sortOrder, setSortOrder] = useState("asc");

  const filters = ["Phổ Biến", "Mới Nhất", "Bán Chạy"];

  const getProducts = async () => {
    await apiProduct
      .getProductByPeterCategory(categoryId, currentPage)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
        setProducts(data.content);
      })
      .catch((err) => console.log(err));
  };

  const getProductByPeterCategoryOrderByCreatedAtDesc = async () => {
    await apiProduct
      .getProductByPeterCategoryOrderByCreatedAtDesc(categoryId, currentPage)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
        setProducts(data.content);
      })
      .catch((err) => console.log(err));
  };

  const getProductByPeterCategoryOrderBySoldDesc = async () => {
    await apiProduct
      .getProductByPeterCategoryOrderBySoldDesc(categoryId, currentPage)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
        setProducts(data.content);
      })
      .catch((err) => console.log(err));
  };

  const getProductsDesc = async () => {
    await apiProduct
      .getProductByPeterCategory(categoryId, currentPage)
      .then((res) => {
        const data = res.data;

        const sorted1 = [...data.content].sort(
          (a, b) => b.variants[0].price - a.variants[0].price
        );
        console.log(sorted1);

        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
        setProducts(sorted1);
      })
      .catch((err) => console.log(err));
  };

  const getProductsAsc = async () => {
    await apiProduct
      .getProductByPeterCategory(categoryId, currentPage)
      .then((res) => {
        const data = res.data;

        const sorted1 = [...data.content].sort(
          (a, b) => a.variants[0].price - b.variants[0].price
        );
        console.log(sorted1);

        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
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
  }, [categoryId, activeFilter, currentPage]);

  useEffect(() => {
    if (sortOrder === "asc") {
      console.log(sortOrder);
      getProductsAsc();
    }

    if (sortOrder === "desc") {
      console.log(sortOrder);
      getProductsDesc();
    }
  }, [sortOrder]);

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-1/5  mr-2">
        <Sidebar categories={categories} setCategoryId={setCategoryId} />
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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          setCurrentPage={setCurrentPage}
        />
      </div>
    </div>
  );
}

export default ProductList;
