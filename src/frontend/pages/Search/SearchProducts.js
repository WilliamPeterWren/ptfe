import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";

import apiProduct from "../../../api/apiProduct";


function SearchProducts() {
  const [products, setProducts] = useState([]);

  const { query } = useParams();

  console.log("query: " + query);

  useEffect(() => {
    apiProduct.getProductBySearch(query).then((res) => {
      const products = res.data;
      console.log("products: ", products);

      try {
        const productData = products.map((product) => {
          return {
            id: product.id,
            name: product.attributes.product_name,
            catid: product.attributes.cat_id,
            description: product.attributes.description,
            price: product.attributes.price,
            is_on_sale: product.attributes.is_on_sale,
            sale_price: product.attributes.sale_price,
            slug: product.attributes.slug,
            brand_id: product.attributes.brand_id,
            image: product.attributes.image,
            category_name:
              product.attributes.category.data.attributes.category_name,
            category_slug: product.attributes.category.data.attributes.slug,
            brand_name: product.attributes.brand.data.attributes.brand_name,
          };
        });
        setProducts(productData);
        console.log("Product:", productData);
      } catch (err) {
        console.log("Product Error:", err.message);
      }
    });
  }, [query]);

  return (
    <div>
      <h1>search page</h1>
    </div>
  );
}

export default SearchProducts;
