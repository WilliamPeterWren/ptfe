import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import unidecode from 'unidecode';


import capitalizeFirstLetter from '../../pages/Capitalieze/capitalize';
import apiCategory from '../../../api/apiCategory';


function EditCategory() {

    const createSlug = (str) => {
        return unidecode(str)
        .toLowerCase() // Chuyển đổi tất cả các ký tự thành chữ thường
        .replace(/[^\w\s]/gi, '') // Loại bỏ các ký tự không phải là chữ cái hoặc số
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
        .trim(); // Loại bỏ các khoảng trắng ở đầu và cuối chuỗi
    };

    const {id} = useParams();
    
    const [catEdit, setCatEdit] = useState([]);
    const [categories, setCategories] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        
        apiCategory.getCategoryById(id).then(res => {         
            const categoryData = res.data.attributes           
            setCatEdit(categoryData);
            console.log("cat edit: ",categoryData);
            return categoryData;    
        });

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
            }
            catch(err){
                console.log("Category Error:",err.message);
            }


        })
    }, [id,])


    const [formData, setFormData] = useState({
        category_name:'',
        parent_id: 0,
        slug:'',
        status:''
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
        categories.map((cate) => {
            console.log("cate name: " + cate.name + " \nformdata cat name:" + formData.category_name);
            if(cate.name.toLowerCase() == formData.category_name?.toLowerCase()){
              check = !check
            }            
        })

        if(!check){

            if(formData.category_name === ''){
                formData.category_name = catEdit[0]?.category_name;
            }

            if(formData.category_name){                
                const newSlug = createSlug(formData.category_name);
                console.log('new slug: ', newSlug);
                formData.slug = newSlug;
            }
            else{
                formData.slug = catEdit[0]?.slug;
            }

            if(formData.parent_id === 0){
                formData.parent_id = catEdit[0]?.parent_id;
            }           
            

            if(formData.status === ''){
                formData.status = catEdit[0]?.status;
            }

            console.log("form data", formData);


            try {
                const response = await apiCategory.editCategory(id, {data: formData});
    
                toast.info(`Update ${formData.category_name} successfully!`, {
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

    var catEditParent = '';
    categories.forEach((item) => {
        if(item.id === catEdit.parent_id){            
            catEditParent = item.name;
        }
    })


  return (
    catEdit && <div>
      <h1>edit category</h1>
    {
        console.log("cate edit: ", catEdit)
    }
      <form onSubmit={handleSubmit}>
        <label htmlFor='category_name'>Category Name:</label>        
        <input type="text" name="category_name" placeholder={catEdit.category_name}  onChange={handleChange} />

        <br/>
        <label htmlFor='parent_id'>Category Parent:</label>
        <select type="text" name="parent_id" placeholder={catEditParent} onChange={handleChange} >       
            <option value="0">Select Parent</option>
            {
                categories.map((item, index) => {                    
                    return (
                        <option key={index} value={item.id}> {capitalizeFirstLetter(item.name)} </option>
                    )
                })
            }
        
        </select>
        <br/>      
        
        <label htmlFor='slug'>Status:</label>
        <select type="text" name="status" placeholder={catEdit.status} onChange={handleChange} >       
            <option value="1">Online</option>            
            <option value="0">Not Online</option>
        </select>

        <br/>
        <input type="submit" value="Add" />
      </form>
    </div>
  )
}

export default EditCategory
