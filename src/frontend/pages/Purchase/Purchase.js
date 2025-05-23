import React from 'react';
import Cookies from 'js-cookie';
import { useSelector } from 'react-redux';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import {useNavigate} from 'react-router-dom'

import PurchaseItem from './PurchaseItem';



import apiOrder from '../../../api/apiOrder';
import apiOrderDetail from '../../../api/apiOrderDetail';

function Purchase() {

  const userId = Cookies.get('authId');
  console.log("user id: " + userId);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {

      const username = Cookies.get('authUsername');

      const email = Cookies.get('authEmail'); // Expires in 7 days
      const password = Cookies.get('authPassword'); // Expires in 7 days

      const phone = Cookies.get('authPhone'); // Expires in 7 days
      const address = Cookies.get('authAddress'); // Expires in 7 days

      const first_name = Cookies.get('authFirstname'); // Expires in 7 days
      const last_name = Cookies.get('authLastname'); // Expires in 7 days

      const formOrder = {
        user: {
          id: userId,
          username: username,
          email: email,
          password: password,
          phone: phone,
          address: address,
          first_name: first_name,
          last_name: last_name,
        }
      }

      const response = await apiOrder.createOrder({ data: formOrder})
      .then(async (res) => {
        console.log("res id: ", res.data.id);

        getDataCart.map(async(item) =>{

          const formOrderDetail = {
            order_id: res.data.id,
            product_id: item[0].id,
            quantity: item.quantity,
            price: item[0].is_on_sale ? item[0].sale_price : item[0].price,
          }

          console.log("from order detail: ", formOrderDetail)

          const resOrder = await apiOrderDetail.createOrderDetail({data: formOrderDetail })
          console.log("resOrder: " + resOrder);
        })

        

      })

      console.log("response: " + response);

     
      toast.success(`Success Purchase`, {
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

      navigate('/home');
      

    } catch (error) {
      console.error('Error saving data:', error);
      toast.error(`Something is wrong with this Purchase`, {
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
  };
  
  const FirstName = Cookies.get('authFirstname');
  const LastName = Cookies.get('authLastname');
  const email = Cookies.get('authEmail');
  const phone = Cookies.get('authPhone');
  const address = Cookies.get('authAddress');

  const getDataCart = useSelector((state) => state.cart.carts);


  var totalSalePrice = 0;

  return (
    email ? (
      <div>
      {
        getDataCart.length > 0 && getDataCart.map((item) => {
          console.log("item: ", item);
        })
      }
        <h1>make purchase</h1>
        <div className='row'>
          
          <div className='col-md-6'>
            <h3>Account info</h3>
            <table className='account-info-table'>
              
              <tr>
                <th>First Name</th>
                <td>{FirstName}</td>
              </tr>

              <tr>
                <th>Last Name</th>
                <td>{LastName}</td>
              </tr>

              <tr>
                <th>Email</th>
                <td>{email}</td>
              </tr>

              <tr>
                <th>Phone</th>
                <td>{phone}</td>
              </tr>

              <tr>
                <th>Address</th>
                <td>{address}</td>
              </tr>

            </table>
          </div>

          <div className='col-md-6'>
            <h3>Cart Item</h3>
            
            <form onSubmit={handleSubmit} className='cart-item-table'>
              <table>
                <thead className='cart-item-table-thead'>
                  <tr>
                    <th>Item</th>
                    <th>Product</th>
                    <th>Quantity</th>
                    <th>Price</th>  
                    <th>Total</th>
                  </tr>       
                </thead>

                <tbody className='cart-item-table-tbody'>
                  {
                    getDataCart.map((item, index) => {
                      if(item){
                          totalSalePrice += item[0].is_on_sale ? item[0].sale_price*item.quantity : item[0].price*item.quantity;                  
                        }
                      return (
                          <PurchaseItem item={item} key={index}/>
                      )
                    })
                  }
                </tbody>

                <tfoot className='cart-item-table-tfoot'>
                  <tr colSpan="5" className='font-weight-bold'>
                    <td colSpan="4">
                      Total Amount: 
                    </td>

                    <td >
                      {totalSalePrice}
                    </td>                  
                  </tr>
                  <tr className=''>
                    <td colSpan="5">
                      <button type="submit" className="btn btn-info my-2 ml-2"> <i className="fa fa-chevron-left" /> Delivery </button>
                      
                    </td>                    
                  </tr>
                </tfoot>
              </table>
            </form>
          </div>
        </div>
      </div>
      
    ):(
      <div>
        <h1>make purchase</h1>
      </div>
    )
    
  )
}

export default Purchase
