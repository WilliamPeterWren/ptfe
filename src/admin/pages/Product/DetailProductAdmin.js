import React,{useState, useEffect} from 'react';
import {Link, useNavigate, useParams } from 'react-router-dom';

import apiCategory from '../../../api/apiCategory';
import apiBrand from '../../../api/apiBrand';
import apiProduct from '../../../api/apiProduct';
import { imageUrl } from '../../../api/config';

import capitalizeFirstLetter from '../../pages/Capitalieze/capitalize';
import axiosInstance from '../../../api/axios';


function DetailProductAdmin() {

  const {id} = useParams();

  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [selectedFiles, setSelectedFiles] = useState([]); 
  const [allProducts, setAllProducts] = useState([]);
  const [productDetail, setProductDetail] = useState() 

  useEffect(() => {
    apiCategory.getAll().then(res => {
        try{
            const categoryData = res.data.map(item =>{
            return {
                id: item.id,
                name: item.attributes.category_name,
                parent: item.attributes.parent_id,
                slug: item.attributes.slug,
            }});
            setCategories(categoryData);                
        }
        catch(err){
            console.log("Category Error:",err.message);
        }    
    })

    apiBrand.getAll().then(res => {       
        try{
            const brandData = res.data.map(item =>{
                return {
                    id: item.id,
                    name: item.attributes.brand_name,               
                    slug: item.attributes.slug,
                    address: item.attributes.address
                }});
            setBrands(brandData);                
        }
        catch(err){
              console.log("Category Error:",err.message);
        }
    }); 

    apiProduct.getProductById(id).then(res => {
        // console.log("data: "  + JSON.stringify(res.data.attributes))
        const productData = res.data.attributes;
        const form = [{
            name: productData.product_name,
            description: productData.description,
            price: productData.price,
            is_on_sale: productData.is_on_sale,
            sale_price: productData.sale_price,
            image: productData.image,
            slug: productData.slug,
            views: productData.views,              
            brand_name: productData.brand.data.attributes.brand_name,
            brand_slug: productData.brand.data.attributes.slug,
            category_name: productData.category.data.attributes.category_name,
            category_slug: productData.category.data.attributes.slug
        }]

        setProductDetail(form); 
    });

  }, [id,])

  

  return (
    productDetail && 
    <div>
      <br/>
      <h1 className='mb-4 ml-4'>Detail Product Admin</h1>
      <table className="product-admin-list">
        <thead>
          <tr>        
            <th>Name</th>            
            <th>Image</th> 
            <th>Description</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Price</th>
            <th>is_on_sale</th>
            <th>Sale Price</th>
            <th>Slug</th>
            <th>Views</th>            
          </tr>
        </thead>
              
        <tbody>
          <tr>        
            <td>{productDetail[0].name}</td>            
            <td>
            {              
              productDetail[0].image.data.map((item, index)=>{
                return <img loading='lazy' style={{maxHeight: '14rem', margin: '4px'}} src={imageUrl + item.attributes.url} alt={productDetail[0].name+index}/>
              })
            }
            </td> 
            <td>{capitalizeFirstLetter(productDetail[0].description)}</td>
            <td>{capitalizeFirstLetter(productDetail[0].category_name)}</td>
            <td>{capitalizeFirstLetter(productDetail[0].brand_name)}</td>
            <td>{productDetail[0].price}</td>
            <td>{productDetail[0].is_on_sale === true ? "Sale" : "Not Sale"}</td>
            <td>{productDetail[0].sale_price}</td>
            <td>{productDetail[0].slug}</td>
            <td>{productDetail[0].views}</td>            
          </tr>
        </tbody>        

      </table>
    </div>
  )
}

export default DetailProductAdmin
