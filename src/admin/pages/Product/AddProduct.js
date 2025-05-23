import React,{useState, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import unidecode from 'unidecode';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import apiCategory from '../../../api/apiCategory';
import apiBrand from '../../../api/apiBrand';
import apiProduct from '../../../api/apiProduct';

import capitalizeFirstLetter from '../../pages/Capitalieze/capitalize';
import axiosInstance from '../../../api/axios';


function AddProduct() {

    // Hàm xử lý chuỗi để tạo slug từ tên sản phẩm
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
    const [products, setProducts] = useState([]);

    
  
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        product_name:'',
        description: '',
        price: 0,
        is_on_sale: false,
        sale_price: 0,  
        image:[],
        slug:'',
        category: '',
        brand: '', 
    });    
    

    const handleFileChange = (e) => {
        setSelectedFiles(Array.from(e.target.files));
    };
  
    
    const handleChange = (e) => {
      const { name, value } = e.target;    
        
      
      switch (name) {
        case 'category': // chưa ổn - chỉ lấy được 25 categories đầu tiên
            const selectedCategory = categories.find(category => category.name === value);
            setFormData({
                ...formData,
                [name]: selectedCategory || ''
            });
            break;

        case 'brand': // chưa ổn - chỉ lấy được 25 brands đầu tiên
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
                
              setProducts(productData);
        })

    }, [])

   

    const handleSubmit = async(e) =>{
        e.preventDefault();
        try {

            var check = false;

            if(formData.brand === ''){
                toast.error(`Not selected Brand yet!`, {
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
                check = true;
            }

            if(formData.category === ''){
                toast.error(`Not selected Category yet!`, {
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
                check = true;
            }
            
            if(!check){
                const file = new FormData();
            
                selectedFiles.forEach((item) => {
                    file.append(`files`, item);
                });
               
                await axios.post('http://localhost:1337/api/upload', file, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                .then(async(res) => {
                    
                    const fileId = res.data[0].id;
    
                    for(var i = 0 ; i < selectedFiles.length;i++){
                        formData.image.push(fileId + i);
                    }
        
                    axiosInstance.enableJson();
                    const newSlug = createSlug(formData.product_name);
                    console.log('new slug: ', newSlug);
                    products.map((product) => {
                        return product.slug === newSlug ? newSlug + "-0" : newSlug;                   
                    })
    
    
                    formData.slug = newSlug;
                    console.log('form data', formData);
        
                    const responseProduct = await apiProduct.createProduct({data: formData})
    
                    toast.success(`Add ${formData.product_name} to Database`, {
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
                     
                    navigate('/admin/dashboard/product-admin')
                    console.log('response product:',responseProduct);              
                        
                })
                .catch(err => {
                    console.log("Error:",err.message)
                    
                    toast.error(`Can't Add ${formData.product_name} to Database`, {
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
                    
                });   
            }
                     
                        
          } catch (error) {
            console.error('Error uploading file:', error.message);
            toast.error(`Can't upload Image to Database`, {
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
          }
    }

    const handleBackToProductAdmin = () => {
        navigate('/admin/dashboard/product-admin')
    }

  return (
    <div>
        <br/>
      <h1 className='ml-4'>Add Product</h1>
      <h5> <button className='btn btn-primary ml-4' onClick={handleBackToProductAdmin}>Back to Product Admin</button> </h5>
      <form className="add-product-admin-list ml-4 mt-4" onSubmit={handleSubmit}>

        <table>
            <tr>
                <th><label htmlFor='product_name'>Product Name</label></th>
                <td><input type="text" className="p-2" placeholder="Product Name" name='product_name' onChange={handleChange} require="true" /></td>
            </tr>

            <tr>
                <th><label htmlFor='description'>Description</label></th>
                <td><input type="text" className="p-2" placeholder="Description" name='description' onChange={handleChange} require="true" /></td>
            </tr>

            <tr>
                <th><label htmlFor='price'>Price</label></th>
                <td> <input type="number" className="p-2" placeholder="Price" name='price' min='0' onChange={handleChange} require="true" /></td>
            </tr>

            <tr>
                <th><label htmlFor='is_on_sale'>is_on_sale</label></th>
                <td><select type="number" className="p-2" placeholder="Price" name='is_on_sale' onChange={handleChange} title="Sale" >
            <option value="false">Not Sale</option>
            <option value="true">Sale</option>            
        </select></td>
            </tr>

            {
            formData.is_on_sale === true &&  (
                <tr>
                    <th><label htmlFor='price'>Sale Price</label></th>
                    <td><input type="number" className="p-2" placeholder="Sale Price" name='sale_price' min='0' onChange={handleChange} /></td>
                </tr>
            )
            }    

            <tr>
                <th><label htmlFor='image'>Images</label></th>
                <td><input type="file" placeholder="Image" name='image' min='0' onChange={handleFileChange} multiple     /></td>
            </tr>

            <tr>
                <th><label htmlFor='category'>Category</label></th>
                <td> <select className="p-2" placeholder="category" name = 'category' onChange={handleChange} title="Select a category" >
                    <option value="undefined">Select Category</option>

                    {
                        categories.map((item, index) => {                
                            return (
                                <option key={index} value={item.name}> {capitalizeFirstLetter(item.name)} </option>
                            )
                        })
                    }
                    </select></td>
            </tr>

            <tr>
                <th><label htmlFor='brand'>Brand</label></th>
                <td><select className="p-2" placeholder="Brand" name='brand' onChange={handleChange} title="Select a brand" >
        <option value="undefined">Select Brand</option>
        {
            brands.map((item, index) => {
                return (
                    <option key={index} value={item.name}> {capitalizeFirstLetter(item.name)} </option>
                )
            })
        }
        </select></td>
            </tr>

            

        </table>
     

      
        <button className={`ml-4 mt-4 btn ${selectedFiles.length === 0 ? 'btn-light' : 'btn-info' } `} type='submit' disabled={selectedFiles.length === 0}>submit</button>
      </form>
    </div>
  )
}

export default AddProduct
