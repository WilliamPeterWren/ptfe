import React, { useEffect } from "react";
import SellerInfo from "./SellerInfo";
import GridProduct from "./GridProduct";
import Sidebar from "./SideBar";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";
import { useParams } from "react-router-dom";

function SellerPage() {
  const { sellerId } = useParams();
  console.log(sellerId);

  const products = [
    {
      name: "Men's Belt",
      price: "25,500",
      originalPrice: "69,000",
      discount: "63",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Socks",
      price: "14,000",
      originalPrice: "32,500",
      discount: "57",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Belt",
      price: "25,500",
      originalPrice: "69,000",
      discount: "63",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Socks",
      price: "14,000",
      originalPrice: "32,500",
      discount: "57",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Belt",
      price: "25,500",
      originalPrice: "69,000",
      discount: "63",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Socks",
      price: "14,000",
      originalPrice: "32,500",
      discount: "57",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Belt",
      price: "25,500",
      originalPrice: "69,000",
      discount: "63",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Socks",
      price: "14,000",
      originalPrice: "32,500",
      discount: "57",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Belt",
      price: "25,500",
      originalPrice: "69,000",
      discount: "63",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Socks",
      price: "14,000",
      originalPrice: "32,500",
      discount: "57",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Belt",
      price: "25,500",
      originalPrice: "69,000",
      discount: "63",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Socks",
      price: "14,000",
      originalPrice: "32,500",
      discount: "57",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Belt",
      price: "25,500",
      originalPrice: "69,000",
      discount: "63",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Socks",
      price: "14,000",
      originalPrice: "32,500",
      discount: "57",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
    {
      name: "Men's Shirt",
      price: "79,000",
      originalPrice: "88,000",
      discount: "10",
      image: "https://via.placeholder.com/150",
    },
  ];

  const pageTitle = "Trang người bán";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  return (
    <div className="mt-4 bg-gray-200">
      <div className=" bg-white my-4">
        <SellerInfo />
      </div>
      <div className=" bg-white my-4">
        <GridProduct name={"gợi ý cho bạn"} />
      </div>

      <div className=" bg-white my-4">
        <GridProduct name={"sản phẩm bán chạy"} />
      </div>

      <div className=" bg-white my-4">
        <div className="container mx-auto p-4 flex justify-center">
          <div className="w-1/5  mr-2">
            <Sidebar />
          </div>
          <div className="w-4/5 ml-2">
            <FilterBar />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {products.map((product, index) => (
                <ProductCard key={index} {...product} />
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
