import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';


import { imageUrl } from '../../../api/config';
import apiProduct from '../../../api/apiProduct';


function UserOrderDetailItem(props) {

    const [products, setProducts] = useState()

    useEffect(() => {
        // console.log(props.item.id)
        apiProduct.getProductById(props.item.product_id).then(res => {
            // console.log(res.data)
            const productData = {
                
                id: res.data.id,
                name: res.data.attributes.product_name,
                catid: res.data.attributes.cat_id,
                description: res.data.attributes.description,
                price: res.data.attributes.price,
                image: res.data.attributes.image
                
            }
            setProducts(productData)
            // console.log(productData)
        })
    },[])
  
  return (
    props.item && (
    <tr>                
        <td>
            <figure className="itemside">
                
                <div className="aside">            
                    {
                        products &&  products.image.data.map(res => {
                            console.log(res.attributes.url)
                            return <img src={ imageUrl + res.attributes.url} alt={res.attributes.url} style={{maxHeight: '10rem'}} />
                        })
                    }
                </div>
                
                <figcaption className="info">
                
                </figcaption>
            </figure>
        </td>

        <td> 
            <p className="form-control">
                {props.item.quantity}	
            </p> 
        </td>

        <td> 
            <div className="price-wrap"> 
            {
                props.item.price
            }                
                <small className="text-muted"> ${} /each </small>
            </div> 
        </td>
        
    </tr>
    )

  )
}

export default UserOrderDetailItem
