import React, {useState, useEffect} from 'react';
import {Link, useParams } from 'react-router-dom';

import apiProduct from '../../../api/apiProduct';


function ProductList() {
  
  const [products, setProducts] = useState([]);

  const [pages, setPages] = useState(1);

    var page = parseInt(useParams().page) 



    if(isNaN(page)){
      page = 1;
    }

    const limit = 8;

  useEffect(() => {
      apiProduct.getProductPagination(page, limit).then(res => {
        try {
          const numberOfPages = Math.ceil(res.meta.pagination.total/res.meta.pagination.pageSize);
          setPages(numberOfPages);

          // console.log(res.data);

          const productData = res.data.map(product => {
            return {
              id: product.id,
              name: product.attributes.product_name,
              cat_id: product.attributes.category.data.id,
              description: product.attributes.description,   
              price: product.attributes.price,   
              is_on_sale: product.attributes.is_on_sale === true ? "1" : "0",
              sale_price: product.attributes.sale_price,
              slug: product.attributes.slug,               
              brand_id: product.attributes.brand.data.id,
              image: product.attributes.image,
              category_name: product.attributes.category.data.attributes.category_name,
              category_slug: product.attributes.category.data.attributes.slug,
              brand_name: product.attributes.brand.data.attributes.brand_name,
              publishedAt: product.attributes.publishedAt,
              views: product.attributes.views
            }
          });
          setProducts(productData);        
          console.log("Product:",productData);
        }
        catch(err){
            console.log("Product Error:",err.message);
        }

      })   
  }, [page])

  return (
    <section className="">
      <h1>product list</h1>
    </section>

  )
}

export default ProductList