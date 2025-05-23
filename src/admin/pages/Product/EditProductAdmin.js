import React,{useState, useEffect} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import unidecode from 'unidecode';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import apiCategory from '../../../api/apiCategory';
import apiBrand from '../../../api/apiBrand';
import apiProduct from '../../../api/apiProduct';
import { imageUrl } from '../../../api/config';

import capitalizeFirstLetter from '../../pages/Capitalieze/capitalize';
import axiosInstance from '../../../api/axios';



function EditProductAdmin() {
    const {id} = useParams();

    const createSlug = (str) => {
        return unidecode(str)
        .toLowerCase() // Chuyển đổi tất cả các ký tự thành chữ thường
        .replace(/[^\w\s]/gi, '') // Loại bỏ các ký tự không phải là chữ cái hoặc số
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
        .trim(); // Loại bỏ các khoảng trắng ở đầu và cuối chuỗi
    };

    const [categories, setCategories] = useState([]);
    const [brands, setBrands] = useState([]);
    const [selectedFiles, setSelectedFiles] = useState([]); 
    const [allProducts, setAllProducts] = useState([]);
    const [productDetail, setProductDetail] = useState()    
  
    const navigate = useNavigate();

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };  
    
    const handleChange = (e) => {
      const { name, value } = e.target;    
        
      
      switch (name) {
          case 'category':
              const selectedCategory = categories.find(category => category.name === value);
              setFormData({
                  ...formData,
                  [name]: selectedCategory || ''
              });
              break;

          case 'brand':
              const selectedBrand = brands.find(brand => brand.name === value);
              setFormData({
                  ...formData,
                  [name]: selectedBrand || ''
              });
              break;      
          
          case 'is_on_sale':
              const booleanIs_on_sale = (value === "true");           
              setFormData({
                  ...formData,
                  [name]: booleanIs_on_sale
              });              
              break;
          case 'price':
          case 'sale_price':             
              const floatValue = parseFloat(value);
              setFormData({
                  ...formData,
                  [name]: floatValue
              });
              break;
        case 'slug':
            setFormData({
                ...formData,
                [name]: createSlug(formData.product_name)
            });
            break;
          default:
              setFormData({
                  ...formData,
                  [name]: value
              });
      }     

    };
  
    
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
        
        apiProduct.getAll().then(res => {
            const productData = res.data.map(product => {
                return {             
                    slug: product.attributes.slug,              
                }                
              });                
              setAllProducts(productData);
        })

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

    

    const [formData, setFormData] = useState({
        product_name: '',
        description: '',
        price: 0,
        is_on_sale: false,
        sale_price: 0,  
        image:[],    
        slug: '',
        category:  '', 
        brand:  '',  
    }); 

    const handleSubmit = async(e) =>{
        e.preventDefault();
        console.log("form data: ", formData); 

        axiosInstance.enableJson();

        try {

            if(selectedFiles.length > 0){
                const file = new FormData();
            
                selectedFiles.forEach((item) => {                   
                    file.append(`files`, item);
                    console.log(item);
                });
               
                // console.log("file: ", file);

                await axios.post('http://localhost:1337/api/upload', file, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }).then(async(res) => {
                    
                    const fileId = res.data[0].id;
    
                    for(var i = 0 ; i < selectedFiles.length;i++){
                        formData.image.push(fileId + i);
                    }
        
                    axiosInstance.enableJson();

                    if(formData.product_name === ''){
                        formData.product_name = productDetail[0].name;
                    }

                    if(formData.description === ''){
                        formData.description = productDetail[0].description;
                    }

                    if(formData.price === 0){
                        formData.price = productDetail[0].price;
                    }

                    if(formData.is_on_sale === false){
                        formData.is_on_sale = productDetail[0].is_on_sale;
                    }

                    if(formData.sale_price === 0){
                        formData.sale_price = productDetail[0].sale_price;
                    }

                    if(formData.category === ''){
                        formData.category = productDetail[0].category_name;
                    }

                    if(formData.brand === ''){
                        formData.brand = productDetail[0].brand_name;
                    }

                    const newSlug = createSlug(formData.product_name);
                    // console.log('new slug: ', newSlug);
                    allProducts.map((product) => {
                        return product.slug === newSlug ? newSlug + "-0" : newSlug;                   
                    })
                    formData.slug = newSlug;                  

                    if(formData.brand === ''){
                        formData.brand = productDetail[0].brand;
                    }

                    console.log('form data', formData);        
                    
                    const responseProduct = await apiProduct.editProduct(id, {data: formData});
                    
                    toast.info(`Update quantity ${formData.product_name}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: {
                            top: "-50%",
                            transform: "translateY(50%)",
                            marginRight: "2%",
                            width: "fit-content",
                        },
                    });
                     
                    // navigate('/admin/dashboard/product-admin')
                    // console.log('response product:',responseProduct);              
                        
                }).catch(err => console.log("Error:",err.message)); 
            }
            else{
                try {
                    axiosInstance.enableJson();                   

                    if(formData.product_name === ''){
                        formData.product_name = productDetail[0].name;
                    }

                    if(formData.description === ''){
                        formData.description = productDetail[0].description;
                    }

                    if(formData.price === 0){
                        formData.price = productDetail[0].price;
                    }

                    if(formData.is_on_sale === false){
                        formData.is_on_sale = productDetail[0].is_on_sale;
                    }

                    if(formData.sale_price === 0){
                        formData.sale_price = productDetail[0].sale_price;
                    }

                    if(formData.category === ''){
                        formData.category = productDetail[0].category_name;
                    }

                    if(formData.brand === ''){
                        formData.brand = productDetail[0].brand_name;
                    }

                    console.log("i: " + JSON.stringify(productDetail[0].image.data));

                    // if(!formData.image.includes(item.id)){
                    //     formData.image.push(item.id);
                    // }

                    if(formData.image.length === 0){
                        productDetail[0].image.data.map( item => {
                            formData.image.push(item.id);
                        })
                    }                   

                    const newSlug = createSlug(formData.product_name);
                    // console.log('new slug: ', newSlug);
                    allProducts.map((product) => {
                        return product.slug === newSlug ? newSlug + "-0" : newSlug;                   
                    })
                    formData.slug = newSlug;



                    console.log('form data: ', formData); 

                    const response = await apiProduct.editProduct(id, {data: formData});
                    
                    toast.info(`Update quantity ${formData.product_name}`, {
                        position: "top-right",
                        autoClose: 2000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        style: {
                            top: "-50%",
                            transform: "translateY(50%)",
                            marginRight: "2%",
                            width: "fit-content",
                        },
                    });
                    console.log('response:',response);
                    navigate('/admin/dashboard/product-admin')
                } catch (error) {
                    console.error('Error saving data:', error.message);
                }
            }
           
                       
                        
          } catch (error) {
            console.error('Error uploading file:', error.message);
          }
    }

    const handleBackToProductAdmin = () => {
        navigate('/admin/dashboard/product-admin')
    }

  return (
    <div>
      <h1>Edit Product</h1>
    
      <h5> <button className='btn btn-primary' onClick={handleBackToProductAdmin}>Back to Product Admin</button> </h5>
      {
        productDetail && (
          <form className="add-product-admin-list" onSubmit={handleSubmit}>

        <label htmlFor='product_name'>Product Name</label>
        <input type="text" className="" placeholder={productDetail[0]?.name} name='product_name'  onChange={handleChange} />
        <br/>

        <label htmlFor='description'>Description</label>
        <input type="text" className="" placeholder={productDetail[0]?.description} name='description' onChange={handleChange} />
        <br/>

        <label htmlFor='price'>Price</label>
        <input type="number" className="" placeholder={productDetail[0]?.price} name='price' min='0' onChange={handleChange} />
        <br/>

        <label htmlFor='is_on_sale'>is_on_sale</label>
        <select type="number" className="" placeholder={"false"} name='is_on_sale' onChange={handleChange} title="Sale" >
            <option value="false">Not Sale</option>
            <option value="true">Sale</option>            
        </select>
        <br/>

        {
            (
                <div>
                    <label htmlFor='price'>Sale Price</label>
                    <input type="number" className="" placeholder={productDetail[0]?.sale_price} name='sale_price' min='0' onChange={handleChange} />
                    <br/>
                </div>
                
            )
        }
        
        {
            productDetail[0]?.image?.data?.map((item, index) => {
                return(
                    <img key={index} style={{height: '300px'}} src={`${imageUrl + item.attributes.url}`} alt="hinh" />
                )
            })
        }  

        <br/>
        <label htmlFor='image'>Images</label>
        <input 
            type="file" 
            className="" 
            placeholder="Image" 
            name='image'
            onChange={handleFileChange} 
            multiple     
            accept=".jpg, .jpeg, .png"
            />
        <br/>       

        <label htmlFor='category'>Category</label>        
        <select className="" name='category' onChange={handleChange} title="Select a category" >
        <option value="undefined">Select Category</option>
        {
            categories.map((item, index) => {                
                return (
                    <option 
                        key={index} 
                        value={item.name}
                        // selected={item.name === productDetail[0]?.category_name}
                        > 
                        {capitalizeFirstLetter(item.name)} 
                    </option>
                )
            })
        }
        </select>
        <br/>

        <label htmlFor='brand'>Brand</label>
        <select className="" placeholder="Brand" name='brand' onChange={handleChange} title="Select a brand" >
        <option value="undefined">Select Brand</option>
        {
            brands.map((item, index) => {
                return (
                    <option 
                        key={index} 
                        value={item.name}
                        // selected={item.name === productDetail[0]?.brand_name}
                        > 
                        {capitalizeFirstLetter(item.name)} 
                    </option>
                )
            })
        }
        </select>
        <br/>
      
        <button className='btn btn-info' type='submit'>submit</button>
      </form>
        )
      }
      
      
    </div>
  )
}

export default EditProductAdmin