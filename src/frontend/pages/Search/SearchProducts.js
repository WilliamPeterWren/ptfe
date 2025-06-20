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

  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [activeFilter, setActiveFilter] = useState("Phổ Biến");
  const [sortOrder, setSortOrder] = useState("asc");

  const filters = ["Phổ Biến", "Mới Nhất", "Bán Chạy"];

  // const [searchParams] = useSearchParams();

  // const query = searchParams.get("query");

  const { productname } = useParams();

  const getProductBySearch = async () => {
    await apiProduct
      .searchProductByProductName(productname, currentPage)
      .then((res) => {
        const data = res.data;
        console.log(data);
        setProducts(data.content);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductBySearchCreatedDesc = async () => {
    await apiProduct
      .searchProductByProductName(productname, currentPage)
      .then((res) => {
        const data = res.data;
        console.log(data);

        const sorted1 = [...data.content].sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        setProducts(sorted1);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductBySearchSold = async () => {
    await apiProduct
      .searchProductByProductName(productname, currentPage)
      .then((res) => {
        const data = res.data;
        console.log(data);

        const sorted1 = [...data.content].sort(
          (a, b) => new Date(b.sold) - new Date(a.sold)
        );

        setProducts(sorted1);
        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (activeFilter === "Phổ Biến") {
      getProductBySearch();
    }

    if (activeFilter === "Mới Nhất") {
      getProductBySearchCreatedDesc();
    }

    if (activeFilter === "Bán Chạy") {
      getProductBySearchSold();
    }
  }, [productname, activeFilter]);

  const getProductBySearchPriceAsc = async () => {
    await apiProduct
      .searchProductByProductName(productname, currentPage)
      .then((res) => {
        const data = res.data;
        console.log(data);

        const sorted1 = [...data.content].sort(
          (a, b) => a.variants[0].price - b.variants[0].price
        );

        setProducts(sorted1);

        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getProductBySearchPriceDesc = async () => {
    await apiProduct
      .searchProductByProductName(productname, currentPage)
      .then((res) => {
        const data = res.data;
        console.log(data);

        const sorted1 = [...data.content].sort(
          (a, b) => b.variants[0].price - a.variants[0].price
        );

        setProducts(sorted1);

        setCurrentPage(data.number);
        setTotalPages(data.totalPages);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (sortOrder === "asc") {
      console.log(sortOrder);
      getProductBySearchPriceAsc();
    }

    if (sortOrder === "desc") {
      console.log(sortOrder);
      getProductBySearchPriceDesc();
    }
  }, [sortOrder]);

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
      {/* <div className="w-1/5  mr-2">
        <Sidebar />
      </div> */}
      <div className="w-full ml-2">
        <CategorySlider />

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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}

export default SearchProducts;
