import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import unidecode from 'unidecode';

import apiBrand from '../../../api/apiBrand';

function AddBrand() {
  
  const createSlug = (str) => {
    return unidecode(str)
    .toLowerCase() // Chuyển đổi tất cả các ký tự thành chữ thường
    .replace(/[^\w\s]/gi, '') // Loại bỏ các ký tự không phải là chữ cái hoặc số
    .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
    .trim(); // Loại bỏ các khoảng trắng ở đầu và cuối chuỗi
    };

    const [brands, setBrands] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        apiBrand.getAll().then(res => {
          try{
            const brandData = res.data.map(item =>{
              return {
                id: item.id,
                name: item.attributes.brand_name,
                parent: item.attributes.parent_id,
                slug: item.attributes.slug,
              }
            });
            setBrands(brandData);
            // console.log("Brand:",brandData);
          }
          catch(err){
              console.log("Brand Error:",err.message);
          }
    
        })}, [])

    const [formData, setFormData] = useState({
        brand_name:'',
        address: '',
        slug:''
    });
    
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value
        });
    };
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        var check = false;        
        brands.forEach((brand) => {
            if(brand.name.toLowerCase() === formData.brand_name.toLowerCase()){
              check = !check
            }  
        })        

        if(!check){

            const newSlug = createSlug(formData.brand_name);
            console.log('new slug: ', newSlug);
            formData.slug = newSlug;
            console.log("form data", formData);

          try {
            const response = await apiBrand.createBrand({data: formData});
            console.log('response:',response);
            
            toast.success(`Add ${formData.brand_name} to Database`, {
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
            navigate('/admin/dashboard/brand-admin')
          } catch (error) {
              console.error('Error saving data:', error);
              toast.error(`Oh! Something happened?! Can't Add ${formData.brand_name}`, {
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
        else{
            toast.error(`Brand ${formData.brand_name} already exist!`, {
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

  return (
    <div>
      <h1>Add New Brand</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='brand_name'>Brand Name:</label>
        <input type="text" name="brand_name" placeholder="Brand Name" value={formData.brand_name} onChange={handleChange} />

        <br/>
        <label htmlFor='address'>Address:</label>
        <input type="text" name="address" placeholder="Address" value={formData.address} onChange={handleChange} />    
        <br/>
        
        <input type="submit" value="Add" />
      </form>
    </div>
  )
}

export default AddBrand
