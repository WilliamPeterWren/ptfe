import React from "react";

const GridProduct = (props) => {
  const products = Array.from({ length: 6 }, (_, index) => ({
    src: `https://via.placeholder.com/150x150.png?text=Product${index + 1}`,
    label: `Sản Phẩm ${index + 1}`,
    price: `đ${Math.floor(Math.random() * 1000000) + 10000}`,
    discount: `-${Math.floor(Math.random() * 50) + 1}%`,
    sales: `Bán ${Math.floor(Math.random() * 1000) + 1}K+ /tháng`,
    badge: index % 2 === 0 ? "Shopee Mall" : "Yêu Thích",
  }));

  const { name } = props;

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="flex justify-between items-center">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold uppercase">{name}</h2>
        </div>
        <a href="/" className="text-sm text-blue-500 hover:underline">
          Xem tất cả
        </a>
      </div>

      <div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {products.map((product, index) => (
            <div
              key={index}
              className="border rounded-lg overflow-hidden shadow-md"
            >
              <img
                src={product.src}
                alt={product.label}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  // e.target.src = defaultImage(item);
                }}
                loading="lazy"
              />
              <div className="p-2 bg-white">
                <div className="flex items-center mb-1">
                  <span className="text-xs bg-gray-200 text-gray-700 px-1 rounded">
                    {product.badge}
                  </span>
                  <span className="text-xs text-red-500 ml-1">
                    {product.discount}
                  </span>
                </div>
                <p className="text-sm text-gray-800 line-clamp-2">
                  {product.label}
                </p>
                <p className="text-lg font-bold text-red-600">
                  {product.price}
                </p>
                <p className="text-xs text-gray-600">{product.sales}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GridProduct;
