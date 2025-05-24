import React from 'react'

const ProductCard = ({ name, price, originalPrice, discount, image }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-4">
      <h3 className="text-lg font-semibold text-gray-800">{name}</h3>
      <p className="text-red-600 font-bold">{price} VND</p>
      <p className="text-gray-500 line-through">{originalPrice} VND</p>
      <span className="bg-red-100 text-red-800 text-xs font-medium px-2 py-1 rounded">
        {discount}% OFF
      </span>
    </div>
  </div>
);

export default ProductCard;
