import React from 'react'
import { Link } from 'react-router-dom';

import { imageUrl } from '../../../api/config';

function PurchaseItem(props) {

    // se co cai props.handleChange va thay doi o trong day

  return (
    <tr>                        
        <td>
            <div className="aside">            
            <img src={imageUrl + props.item[0].image.data[0].attributes.url} className="img-sm" alt="" />           
            </div>
        </td>

        <td>
            <figcaption className="info">         
                <Link to={`/product-detail/${props.item[0].slug}`} className="title text-dark">{props.item[0].name}</Link>
                <br/>
                <Link to={`/products-by-brand/${props.item[0].brand_slug}`} className="text-muted small">Brand: {props.item[0].brand_name}</Link> 
         
            </figcaption>
        </td>

        <td>
            {props.item.quantity}
        </td>
        
        <td>
            {props.item[0].is_on_sale ? props.item[0].sale_price : props.item[0].price}
        </td>

        <td>
            {props.item[0].is_on_sale ? props.item.quantity*props.item[0].sale_price : props.item.quantity*props.item[0].price}
           
        </td>
    </tr>
  )
}

export default PurchaseItem
