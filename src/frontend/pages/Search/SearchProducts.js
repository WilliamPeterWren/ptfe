import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";

import apiProduct from "../../../api/apiProduct";

import Sidebar from "./SideBar";
import FilterBar from "./FilterBar";
import ProductCard from "./ProductCard";
import Pagination from "./Pagination";

import { imageUrl } from "../../../api/config";

function SearchProducts() {
  const [products, setProducts] = useState([]);

  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  useEffect(() => {
    // apiProduct.getProductBySearch(query).then((res) => {
    //   const products = res.data;
    //   console.log("products: ", products);
    //   try {
    //     const productData = products.map((product) => {
    //       return {
    //         id: product.id,
    //         name: product.attributes.product_name,
    //         catid: product.attributes.cat_id,
    //         description: product.attributes.description,
    //         price: product.attributes.price,
    //         is_on_sale: product.attributes.is_on_sale,
    //         sale_price: product.attributes.sale_price,
    //         slug: product.attributes.slug,
    //         brand_id: product.attributes.brand_id,
    //         image: product.attributes.image,
    //         category_name:
    //           product.attributes.category.data.attributes.category_name,
    //         category_slug: product.attributes.category.data.attributes.slug,
    //         brand_name: product.attributes.brand.data.attributes.brand_name,
    //       };
    //     });
    //     setProducts(productData);
    //     console.log("Product:", productData);
    //   } catch (err) {
    //     console.log("Product Error:", err.message);
    //   }
    // });
  }, [query]);

  return (
    <div className="container mx-auto p-4 flex justify-center">
      <div className="w-1/5  mr-2">
        <Sidebar />
      </div>
      <div className="w-4/5 ml-2">
        <img
          alt="xu_ly"
          src={imageUrl + "search/xuly.png"}
          onError={(e) => {
            e.target.onerror = null;
            // e.target.src = defaultImage(item);
          }}
          loading="lazy"
          className="w-full h-32 bg-blue-100"
        />

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
