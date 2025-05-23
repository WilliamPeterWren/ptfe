import React, {useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';

import apiOrder from '../../../api/apiOrder';

import formatDate from '../../../frontend/pages/FormatDate/FormatDate';


function OrderAdmin() {
    const [orders, setOrders] = useState([]);

    const [pages, setPages] = useState(1);

    var page = parseInt(useParams().page);

    if(isNaN(page)){
      page = 1;
    }

    const limit = 5;

    

    useEffect(() => {
        apiOrder.getOrderPagination(page, limit).then(res => {
         
            try{
                const numberOfPages = Math.ceil(res.meta.pagination.total/res.meta.pagination.pageSize);
                setPages(numberOfPages);

                const orderData = res.data.map(item => {
                  // console.log(item)
                  return {
                    id: item.id,
                    user_id: item.attributes.user.data.id,    
                    user_name: item.attributes.user.data.attributes.username,
                    first_name: item.attributes.user.data.attributes.first_name,
                    last_name: item.attributes.user.data.attributes.last_name,
                    status: item.attributes.status,
                    createdAt: item.attributes.createdAt      
                  }
                })

                setOrders(orderData);
                console.log("order list", orderData);

            } catch (error) {
                console.log(error);
            }
        })      
        
        
    }, [page])

   


  return (
    <div>
      <br/>
      <h1 className='ml-4 mb-4'>Order Admin</h1>      
     
      <table className="order-admin-list ml-4">
        <thead>
          <tr>        
            <th>Order ID</th>
            <th>User ID</th>  
            <th>User Full Name</th>  
            <th>Created At</th>
            <th>Status</th>                   
            <th>Action</th>
          </tr>
        </thead>
              
        <tbody>
        {
          orders.map(item => {
            return (
              <tr key={item.id}>             
                <td>{item.id}</td>
                <td>{item.user_id}</td>  
                <td>
                {
                  item.first_name + ' ' + item.last_name
                }

                </td>
                <td>{formatDate(item.createdAt)}</td>
                <td>{item.status ? "Shipped" : "On Delivery"}</td>
                <td> 

                  <Link to={`/admin/dashboard/order-admin/detail-order/${item.id}`}>
                    <button className='btn btn-white' >
                      <svg fill="#000000" width="40" height="40" viewBox="0 0 64 64" id="Layer_1_1_" version="1.1" xmlSpace="preserve" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
                        <g>
                          <path d="M36,21c0-2.206-1.794-4-4-4s-4,1.794-4,4s1.794,4,4,4S36,23.206,36,21z M30,21c0-1.103,0.897-2,2-2s2,0.897,2,2   s-0.897,2-2,2S30,22.103,30,21z" />
                          <path d="M27,41v6h10v-6h-2V27h-8v6h2v8H27z M29,31v-2h4v14h2v2h-6v-2h2V31H29z" />
                          <path d="M32,1C14.907,1,1,14.907,1,32s13.907,31,31,31s31-13.907,31-31S49.093,1,32,1z M32,61C16.009,61,3,47.991,3,32   S16.009,3,32,3s29,13.009,29,29S47.991,61,32,61z" />
                          <path d="M32,7c-5.236,0-10.254,1.607-14.512,4.649l1.162,1.628C22.567,10.479,27.184,9,32,9c12.682,0,23,10.318,23,23   c0,4.816-1.479,9.433-4.277,13.35l1.628,1.162C55.393,42.254,57,37.236,57,32C57,18.215,45.785,7,32,7z" />
                          <path d="M32,55C19.318,55,9,44.682,9,32c0-4.817,1.479-9.433,4.277-13.35l-1.627-1.162C8.608,21.746,7,26.764,7,32   c0,13.785,11.215,25,25,25c5.236,0,10.254-1.607,14.512-4.649l-1.162-1.628C41.433,53.521,36.816,55,32,55z" />
                        </g>
                      </svg>
                    </button>
                  </Link>

                </td>
              </tr>
            )
          })
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
                        to={`/admin/dashboard/order-admin/${page-1}`} 
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
                        <Link to={`/admin/dashboard/order-admin/${item}`}>
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
                        to={`/admin/dashboard/order-admin/${page+1}`}
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

export default OrderAdmin
