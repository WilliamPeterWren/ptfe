import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import unidecode from 'unidecode';


import apiCategory from '../../../api/apiCategory';
import capitalizeFirstLetter from '../../pages/Capitalieze/capitalize';


function AddCategory() {
  
  const createSlug = (str) => {
    return unidecode(str)
    .toLowerCase() // Chuyển đổi tất cả các ký tự thành chữ thường
    .replace(/[^\w\s]/gi, '') // Loại bỏ các ký tự không phải là chữ cái hoặc số
    .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
    .trim(); // Loại bỏ các khoảng trắng ở đầu và cuối chuỗi
    };

    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    
    useEffect(() => {
        apiCategory.getAll().then(res => {
          try{
            const categoryData = res.data.map(item =>{
              return {
                id: item.id,
                name: item.attributes.category_name,
                parent: item.attributes.parent_id,
                slug: item.attributes.slug,
              }
            });
            setCategories(categoryData);
            // console.log("Category:",categoryData);
          }
          catch(err){
              console.log("Category Error:",err.message);
          }
    
        })}, [])

    const [formData, setFormData] = useState({
        category_name:'',
        parent_id: 0,
        slug:''
    });
    
    const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.name === 'parent_id' ? parseInt(e.target.value) : e.target.value
        });
    };
   
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        var check = false;        
        categories.forEach((cate) => {
            if(cate.name.toLowerCase() === formData.category_name.toLowerCase()){
              check = !check
            }                             
        })        

        if(!check){

          const newSlug = createSlug(formData.category_name);
          console.log('new slug: ', newSlug);
          formData.slug = newSlug;
          console.log("form data", formData);

          try {
            const response = await apiCategory.createCategory({data: formData});
            console.log('response:',response);
            
            toast.success(`Add ${formData.category_name} to Database`, {
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
            navigate('/admin/dashboard/category-admin')
          } catch (error) {
              console.error('Error saving data:', error);
          }
        }    
        else{
          toast.error(`Category ${formData.category_name} already exist!`, {
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
      <h1>Add New Category</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='category_name'>Category Name:</label>
        <input type="text" name="category_name" placeholder="Category Name" value={formData.category_name} onChange={handleChange} />

        <br/>
        <label htmlFor='parent_id'>Category Parent:</label>
        <select type="number" name="parent_id" placeholder="Category Parent" value={formData.parent_id} onChange={handleChange} >
        <option value="0">None Parent</option>
        {
            categories.map((item, index) => {
                return (
                    <option key={index} value={item.id}> {capitalizeFirstLetter(item.name)} </option>
                )
            })
        }
        </select>
        <br/>
        
        <input type="submit" value="Add" />
      </form>
    </div>
  )
}

export default AddCategory
