import React, {useState, useEffect} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import unidecode from 'unidecode';


import capitalizeFirstLetter from '../../pages/Capitalieze/capitalize';
import apiBrand from '../../../api/apiBrand';


function EditBrand() {

    const createSlug = (str) => {
        return unidecode(str)
        .toLowerCase() // Chuyển đổi tất cả các ký tự thành chữ thường
        .replace(/[^\w\s]/gi, '') // Loại bỏ các ký tự không phải là chữ cái hoặc số
        .replace(/\s+/g, '-') // Thay thế khoảng trắng bằng dấu gạch ngang
        .trim(); // Loại bỏ các khoảng trắng ở đầu và cuối chuỗi
    };

    const {id} = useParams();
    
    const [brandEdit, setBrandEdit] = useState([]);
    const [brands, setBrands] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        
        apiBrand.getBrandById(id).then(res => {         
            const brandData = res.data.attributes
            console.log("brand edit",brandData);
            setBrandEdit(brandData);
            return brandData;    
        });

        apiBrand.getAll().then(res => {
            try{
              const brandData = res.data.map(item =>{
                return {
                  id: item.id,
                  name: item.attributes.brand_name,
                  address: item.attributes.address,
                  slug: item.attributes.slug,
                }
              });
              setBrands(brandData);       
            }
            catch(err){
                console.log("Brand Error:",err.message);
            }


        })
    }, [id,])


    const [formData, setFormData] = useState({
        brand_name:'',
        address: '',
        slug:'',        
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
        brands.map((brand) => {            
            if(brand.name?.toLowerCase() == formData.brand_name?.toLowerCase()){
              check = !check
            }            
        })

        if(!check){

            if(formData.brand_name === ''){
                formData.brand_name = brandEdit[0]?.brand_name;
            }

            if(formData.brand_name){                
                const newSlug = createSlug(formData.brand_name);
                console.log('new slug: ', newSlug);
                formData.slug = newSlug;
            }
            else{
                formData.slug = brandEdit[0]?.slug;
            }

            if(formData.address === ''){
                formData.address = brandEdit[0]?.address;
            }

            console.log("form data", formData);

            try {
                const response = await apiBrand.editBrand(id, {data: formData});
    
                toast.info(`Update ${formData.brand_name} successfully!`, {
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
                navigate('/admin/dashboard/brand-admin')
            } catch (error) {
                console.error('Error saving data:', error);
                toast.error(`Something Happen with database. Can't add ${formData.brand_name} to database!`, {
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
      <h1>edit brand</h1>

      <form onSubmit={handleSubmit}>
        <label htmlFor='brand_name'>Brand Name:</label>        
        <input type="text" name="brand_name" placeholder={brandEdit.brand_name} onChange={handleChange} />

        <br/>
        <label htmlFor='address'>Address:</label>
        <input type="text" name="address" placeholder={brandEdit.address} onChange={handleChange} />    
        <br/>
       
        <br/>       

        <br/>
        <input type="submit" value="Add" />
      </form>
    </div>
  )
}

export default EditBrand
