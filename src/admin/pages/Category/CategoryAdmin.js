import React,{useState, useEffect} from 'react'
import { Link, useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

import apiCategory from '../../../api/apiCategory'
import apiProduct from '../../../api/apiProduct'

import capitalizeFirstLetter from '../Capitalieze/capitalize';


function CategoryAdmin() {

  const [categories, setCategories] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const [deleteCategoryItem, setDeleteCategoryItem] = useState(false); 
  const [pages, setPages] = useState(1);

  var page = parseInt(useParams().page) ;

  if(isNaN(page)){
    page = 1;
  }

  const limit = 5;

  useEffect(() => {
    apiCategory.getCategoryPagination(page, limit).then(res => {
      try{
        const numberOfPages = Math.ceil(res.meta.pagination.total/res.meta.pagination.pageSize);
        setPages(numberOfPages);

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

    })

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
        setAllCategories(categoryData);
        // console.log("Category:",categoryData);
      }
      catch(err){
          console.log("Category Error:",err.message);
      }
    });
  }, [page, deleteCategoryItem])


  
    const handleDeleteCategory = (id) => {

      apiProduct.getProductByCatId(id).then(res => {     
        console.log("res: ", res.data)   
        try{
          const productData = res.data.length;
          if(productData){
            toast.error(`Warning! Can't Delete because there's at least One product has this Category`, {
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
          else{
            apiCategory.deleteCategoryById(id).then(res => {
              try{          
                setDeleteCategoryItem(id);     
                toast.warning(`Warning! Delete ${res.data.attributes.category_name} from Database`, {
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
              catch(err){
                  console.log("Category Error:",err.message);
              }
      
            });
          }
        }
        catch(err){
          console.log("err: " + err.message);
        }

         
    });

      
    }

  return (
    <div>
      <h1 className='ml-4'>Category Admin</h1>

      <Link to='/admin/dashboard/category-admin/add-category'>
        <button className='btn btn-info mb-4 ml-4'>      
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="Edit / Add_To_Queue">
              <path id="Vector" d="M3 9V19.4C3 19.9601 3 20.2399 3.10899 20.4538C3.20487 20.642 3.35774 20.7952 3.5459 20.8911C3.7596 21 4.0395 21 4.59846 21H15.0001M14 13V10M14 10V7M14 10H11M14 10H17M7 13.8002V6.2002C7 5.08009 7 4.51962 7.21799 4.0918C7.40973 3.71547 7.71547 3.40973 8.0918 3.21799C8.51962 3 9.08009 3 10.2002 3H17.8002C18.9203 3 19.4801 3 19.9079 3.21799C20.2842 3.40973 20.5905 3.71547 20.7822 4.0918C21.0002 4.51962 21.0002 5.07969 21.0002 6.19978L21.0002 13.7998C21.0002 14.9199 21.0002 15.48 20.7822 15.9078C20.5905 16.2841 20.2842 16.5905 19.9079 16.7822C19.4805 17 18.9215 17 17.8036 17H10.1969C9.07899 17 8.5192 17 8.0918 16.7822C7.71547 16.5905 7.40973 16.2842 7.21799 15.9079C7 15.4801 7 14.9203 7 13.8002Z" stroke="#000000" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </g>        
          </svg>
          Add a New Category
        </button>
      </Link>
      
      
      <table className='category-list-admin ml-4'>
        
        <thead>
          <tr>
            <th>ID</th>
            <th>Category</th>
            <th>Category Parent</th>
            <th>slug</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {
            categories.map((item, index) => { 
              
              return (
                <tr key={index}>
                  <td> {item.id} </td>
                  <td> {capitalizeFirstLetter(item.name)} </td>
                  <td> 
                  {
                    item.parent !== 0 && allCategories.map((subCat) => {
                      if(item.parent === subCat.id){
                        return subCat.name;
                      }
                    })                  
                  }                   
                  </td>
                  <td> {item.slug} </td>
                  <td>
                      <Link to={`/admin/dashboard/category-admin/edit-category/${item.id}`} >
                        <button className='btn btn-white'>
                          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M21.2799 6.40005L11.7399 15.94C10.7899 16.89 7.96987 17.33 7.33987 16.7C6.70987 16.07 7.13987 13.25 8.08987 12.3L17.6399 2.75002C17.8754 2.49308 18.1605 2.28654 18.4781 2.14284C18.7956 1.99914 19.139 1.92124 19.4875 1.9139C19.8359 1.90657 20.1823 1.96991 20.5056 2.10012C20.8289 2.23033 21.1225 2.42473 21.3686 2.67153C21.6147 2.91833 21.8083 3.21243 21.9376 3.53609C22.0669 3.85976 22.1294 4.20626 22.1211 4.55471C22.1128 4.90316 22.0339 5.24635 21.8894 5.5635C21.7448 5.88065 21.5375 6.16524 21.2799 6.40005V6.40005Z" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M11 4H6C4.93913 4 3.92178 4.42142 3.17163 5.17157C2.42149 5.92172 2 6.93913 2 8V18C2 19.0609 2.42149 20.0783 3.17163 20.8284C3.92178 21.5786 4.93913 22 6 22H17C19.21 22 20 20.2 20 18V13" stroke="#000000" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                      </Link>

                      <button className='btn btn-white'><svg 
                        onClick={() => handleDeleteCategory(item.id)} 
                        width="40" height="40" 
                        viewBox="0 0 1024 1024" 
                        className="icon"  version="1.1" xmlns="http://www.w3.org/2000/svg">
                      <path d="M960 160h-291.2a160 160 0 0 0-313.6 0H64a32 32 0 0 0 0 64h896a32 32 0 0 0 0-64zM512 96a96 96 0 0 1 90.24 64h-180.48A96 96 0 0 1 512 96zM844.16 290.56a32 32 0 0 0-34.88 6.72A32 32 0 0 0 800 320a32 32 0 1 0 64 0 33.6 33.6 0 0 0-9.28-22.72 32 32 0 0 0-10.56-6.72zM832 416a32 32 0 0 0-32 32v96a32 32 0 0 0 64 0v-96a32 32 0 0 0-32-32zM832 640a32 32 0 0 0-32 32v224a32 32 0 0 1-32 32H256a32 32 0 0 1-32-32V320a32 32 0 0 0-64 0v576a96 96 0 0 0 96 96h512a96 96 0 0 0 96-96v-224a32 32 0 0 0-32-32z" fill="#231815" />
                      <path d="M384 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM544 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0zM704 768V352a32 32 0 0 0-64 0v416a32 32 0 0 0 64 0z" fill="#231815" />
                    </svg></button>
                      
                  </td>
              </tr>
              )}
            
            )
          }
          
        </tbody>

        <tfoot>
          <tr>
            
            <td colSpan='12' style={{border: 'none'}}>
              {
                pages > 1 &&
                <ul className="pagination">
                {
                  page > 1 && (
                    <li>
                    <button className='btn btn-warning mr-3'>
                      <Link 
                        className='text-white' 
                        to={`/admin/dashboard/category-admin/${page-1}`} 
                        style={{ textDecoration: 'none' }}
                        >
                        Previous
                      </Link>
                    </button>
                  </li>
                  )
                }
                  
                  {
                    Array.from({length: pages}, (v, k) => k + 1).map((item,index) => (
                      <li key={index} className={item === page ? 'active' : '' } style={{marginRight: '10px'}}>
                        <Link to={`/admin/dashboard/category-admin/${item}`}>
                          <button className='btn btn-warning'>{item}</button>
                        </Link>
                      </li>
                    ))
                  }

                  {
                    page < pages && (
                      <li>
                    <button className='btn btn-warning mr-3'>
                      <Link 
                        className='text-white' 
                        to={`/admin/dashboard/category-admin/${page+1}`}
                        style={{ textDecoration: 'none' }}
                        >
                        Next
                      </Link>
                    </button>
                  </li>
                    )
                  }
                  
                </ul>
              }                
            </td>
          </tr>

        </tfoot>
      </table>

    </div>
  )
}

export default CategoryAdmin
