import React from "react";
import ProductCard from "./ProductCard";
import FilterBar from "./FilterBar";
import Pagination from "./Pagination";
import Sidebar from "./SideBar";

function ProductList() {
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

  const categories = [
    {
      name: "Men's Belts",
      slug: "mens-belts",
    },
    {
      name: "Socks & Underwear",
      slug: "socks-underwear",
    },
    {
      name: "Casual Shirts",
      slug: "casual-shirts",
    },
    {
      name: "Pants & Joggers",
      slug: "pants-joggers",
    },
    {
      name: "Accessories",
      slug: "accessories",
    },
  ];

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-1/5  mr-2">
        <Sidebar />
      </div>
      <div className="w-4/5 ml-2">
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

export default ProductList;
