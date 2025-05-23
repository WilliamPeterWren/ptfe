import React,{useState, useEffect} from 'react';
import { Link, useNavigate } from 'react-router-dom';

import Cookies from 'js-cookie';

import apiOrder from '../../../api/apiOrder';

import formatDate from '../FormatDate/FormatDate';


function UserOrder() {
    
  const id = Cookies.get('authId');
  const navigate = useNavigate();

  const [orders, setOrder] = useState();


  useEffect(()=>{
    if(!id){
      navigate('/login');
    }
    else{

      

        apiOrder.getOrderByUserId(id).then( res => {
            // console.log(res.data)
            const formOrder = res.data.map( item => {
              
              
             

              

              return {
                  id: item.id,
                  status: item.attributes.status,
                  createdAt: item.attributes.createdAt                  
              }
          })
            
            setOrder(formOrder); 
            console.log(formOrder);
           
 

        })
         
       
        
    }
  },[id, navigate])

 






  return (
    <section className="section-content padding-y">
      <div className="container">
        <div className="row">

          <main className="col-md-9">
            <div className="card">
              <table className="table table-borderless table-shopping-cart">
                <thead className="text-muted">
                  <tr className="small text-uppercase">
                    <th scope="col" width={100}>Order ID</th>   
                    <th scope="col" width={250}>Order Date</th>
                    <th scope="col" width={250}>Status</th>
                    
                    <th scope="col" className="text-right" width={200}> View </th>
                  </tr>
                </thead>
                <tbody>                  
                  {
                    orders && orders.map((item, index) => {
                        return <tr key={index} className='m-4'>
                            <td >{item.id}</td>
                            <td className={`border ${item.status === true ? 'border-success' : 'border-primary'} `}>{formatDate(item.createdAt)}</td>
                            <td className={`btn ${item.status === true ? 'btn-success' : 'btn-primary'} ml-4`}>{item.status === true ? 'Shipped' : 'On Delivery'}</td>
                            
                            <td className="text-right" width={200}>
                              <Link to={`/order-detail/${item.id}`} className="btn btn-sm btn-outline-secondary">
                                <i className="fa fa-eye"></i> View
                              </Link>
                            </td>
                        </tr>
                    })
                  }
                </tbody>
              </table>
            </div>
          </main>

        </div>
      </div> 
    </section>

  )
}

export default UserOrder