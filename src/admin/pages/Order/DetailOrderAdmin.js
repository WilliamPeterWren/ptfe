import React,{useState, useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { imageUrl } from '../../../api/config';


import apiOrderDetail from '../../../api/apiOrderDetail';
import apiProduct from '../../../api/apiProduct'
import apiOrder from '../../../api/apiOrder';
// import apiUser from '../../../api/apiUser';



function DetailOrderAdmin() {

  const {id} = useParams();

  const [orderDetail,setOrderDetail] = useState([]);
  const [order,setOrder] = useState();
  const [user,setUser] = useState([]);
  const [products, setProducts] = useState([]);

  const [status, setStatus] = useState();

  var total = 0;
  var product_name = '';
  useEffect(() => {

    apiOrderDetail.getOrderDetailByOrderId(id).then(res =>{    
      const orderDetailData = res.data.map(item => {
          return{
            id: item.id,
            order_id: item.attributes.order_id,
            product_id: parseInt(item.attributes.product_id),
            quantity: parseInt(item.attributes.quantity),
            price: item.attributes.price,            
          }
      })
      setOrderDetail(orderDetailData);
      // console.log(orderDetailData);  

      orderDetailData.forEach(item => {
        apiProduct.getProductById(item.product_id).then((res) =>{
          // console.log(res.data.attributes);      
          
          const formProduct = {
            id: res.data.id,
            imageUrl: res.data.attributes.image.data,
            product_name: res.data.attributes.product_name,
            price: res.data.attributes.price,
            sale_price: res.data.attributes.sale_price,
            description: res.data.attributes.description,
            quantity: item.quantity,
          }

          setProducts(products => [...products, formProduct]);
          // console.log(formProduct);
          // console.log(products);

        })
      })
      
    })

    apiOrder.getOrderById(id).then(res => {
      const userData = res.data.attributes.user.data.attributes

      const formUser = {        
        first_name: userData.first_name,     
        last_name: userData.last_name,        
      }

      setUser(formUser);

      const orderData = res.data.attributes
      // console.log(orderData);

      const formOrder ={
        status: orderData.status,      
      }

      setOrder(formOrder)
      // console.log(formOrder)
      
    })


  },[id,])

 

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      
      const form = {
        status: status
      }
      console.log('form: ', form);
      await apiOrder.updateOrder(id, {data: form});
      console.log('Data saved successfully');
      
      toast.success(`Update status successfully!`, {
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
    } catch (error) {
      
      toast.warning(`Update status failed!`, {
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
      console.error('Error saving data:', error);
    }
  }

  return (
    <div>
      <br/>
      <h1 className='ml-4'>Detail Order Admin</h1>
      
      <div>

        
        <div className='ml-4' style={{float: 'left', marginRight: '10rem'}}>
          <form onSubmit={handleSubmit}>
            <h5>Order ID: {id}</h5>
            <h5>Customer Name: 
            {
              user.first_name + ' ' + user.last_name
            }
            </h5>
            
            <div>
            {
                order && order.status === true ? 
                (
                  <select name="status" onChange={e => setStatus(e.target.value === "true")}>
                    <option value="true">Shipped</option>
                    <option value="false">On Delevery</option>
                  </select>
                ) 
                  :
                (
                  <select name="status" onChange={e => setStatus(e.target.value === "true")}>
                    <option value="false">On Delevery</option>
                    <option value="true">Shipped</option>
                  </select>
                )
            }
            </div>
            
            

            <br/>
            <br/>
            <button className={`btn ${status === undefined ? '' : 'btn-info'} `} type="submit" disabled={status === undefined}>Update Order</button>
          </form>       

        </div>

        <div style={{float: 'left'}}>
          <table>
            <thead>
              <tr>                
                <th>Product Image</th>
                <th>Product Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>              
              </tr>
            </thead>
            <tbody>
              {
                orderDetail &&
                orderDetail.map((item, index) => {
                  total += item.quantity*item.price;
                  
                  return (
                    <tr key={index}>                  
                      <td>
                      {
                        products.map((product,productIndex) => {
                          if(product.id === item.product_id){
                            var url = []
                         
                            product_name = product.product_name
                            
                            product.imageUrl.map((image) => {                              
                              url.push(image.attributes.url)
                            })                            

                      

                            if(url.length === 1){
                              return (
                                <img key={productIndex} loading='lazy' style={{maxHeight: '10rem', margin: '4px'}} src={imageUrl + url} alt={product.product_name + index} />
                              )
                            }
                            else{                              
                              return (
                                url.map(item =>{
                                  return <img key={productIndex} loading='lazy' style={{maxHeight: '10rem', margin: '4px'}} src={imageUrl + item} alt={product.product_name + index} />
                                })
                              )
                            }
                            
                          }
                        })
                      }
                      </td>
                      <td>
                      {
                        product_name                                               
                      }
                      </td>
                      <td>{item.quantity}</td>
                      <td>{item.price}</td>
                      <td style={{fontWeight: 'bold'}}>{item.quantity*item.price}</td>

                    
                    </tr>
                )})

              }
            </tbody>
            <tfoot>
              <tr>
                <td colSpan={4} style={{fontWeight: 'bold'}} >Total</td>
                <td style={{fontWeight: 'bold'}}>{total}</td>
              </tr>
            </tfoot>
          </table>
        </div>
        
      </div>
    </div>
  )
}

export default DetailOrderAdmin
