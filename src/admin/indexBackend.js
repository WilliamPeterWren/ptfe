import React,{useContext, useEffect} from 'react'
import { Link, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';
import {useNavigate} from 'react-router-dom'

import UserContext from "../context/userContext";

import './assets/css/style.css'


function IndexAdmin() {
  const navigate = useNavigate();
  
  const adminCookie = Cookies.get('adminCookie');

  const {user} = useContext(UserContext);
  var username = user ? user : "";
    

  // console.log('adminCookie: ' + adminCookie);
  if(adminCookie && adminCookie.length > 0) {
    username = adminCookie;
  }
  
  useEffect(()=>{
    if(!username){
      navigate('/admin/login');
    }
  },[])
    
  

  return (
    <div className='admin-section'>
      <div><h1 className="welcome">Welcome to Admin</h1></div>
      <div>
        {
          username && (
            <div className="dashboard-admin">
          <ul className="dashboard-admin-list d-flex">
            <li> 
              
              <Link className="dashboard-list  " to="/admin/dashboard">
                <button type="button" className="btn btn-info mr-3">
                  <h4>Dashboard</h4>
                </button>
              </Link>
              
             </li>
            <li> 
              
              <Link className="category-list" to='/admin/dashboard/category-admin'>
                <button type="button" className="btn btn-info mr-3">
                  <h4>Category</h4>
                </button>
              </Link> 
              
            </li>
            <li> 
            
              <Link className="product-list " to='/admin/dashboard/product-admin'>
                <button type="button" className="btn btn-info mr-3">
                  <h4>Product</h4>
                </button>
              </Link> 
            
            </li>
            <li> 
              
              <Link className="user-list" to='/admin/dashboard/user-admin'>
                <button type="button" className="btn btn-info mr-3">
                  <h4>User</h4>
                </button>
              </Link> 
              
            </li>
            <li> 
              
                <Link className="order-list" to='/admin/dashboard/order-admin'>
                  <button type="button" className="btn btn-info mr-3">
                    <h4>Order</h4>
                  </button>
                </Link> 
              
            </li>
            <li> 
              
              <Link className="order-list" to='/admin/dashboard/brand-admin'>
                <button type="button" className="btn btn-info mr-3">
                  <h4>Brand</h4>
                </button>
              </Link> 
              
            </li>
          </ul>          
            <Link className="dashboard-list " to="/admin/logout">
              <button type="button" className="btn btn-light mt-4 ml-5">
                <h4>Logout</h4>
              </button>
            </Link>          
        </div>
          )
        }
        
        

        <div className="content-admin">
          <Outlet />
        </div>
        
      </div>
    </div>
  )
}

export default IndexAdmin;