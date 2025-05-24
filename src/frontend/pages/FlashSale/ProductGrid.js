import React from "react";

const ProductGrid = () => {
  const products = [
    {
      title: "Bộ 1 Tặng 1 Kem Chống Nắng AHC Phổ Rộng 400nm...",
      price: "599.000",
      discount: "-7%",
      image: "https://via.placeholder.com/150?text=AHC",
      label: "Shopee Mall",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Sơn Bóng Lifter Gloss Chống Doi Moi Dạng Mỏng Ke...",
      price: "155.480",
      discount: "-22%",
      image: "https://via.placeholder.com/150?text=Maybelline",
      label: "Shopee Mall",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Combo 2 Lần Khử Mùi Nách Khang Khuan & Kho Thoai...",
      price: "109.000",
      discount: "-19%",
      image: "https://via.placeholder.com/150?text=Roman",
      label: "Shopee Mall",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Bộ 2 Lon Sữa Bot Enfagrow A+ Neuropro 4 Vi Nhat De...",
      price: "1.877.000",
      discount: "-18%",
      image: "https://via.placeholder.com/150?text=Enfagrow",
      label: "Shopee Mall",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Tã Quần Goo.N Slim Pants",
      price: "599.000",
      discount: "",
      image: "https://via.placeholder.com/150?text=Goo.N",
      label: "Shopee Mall",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Ốp Lưng iPhone TPU Silicon",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=Shincase",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Ốp Lưng iPhone Viền Camera",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=eWIFI",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Kính Cường Lực iPhone KK",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=KK",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Tã Quần Goo.N Slim Pants",
      price: "599.000",
      discount: "",
      image: "https://via.placeholder.com/150?text=Goo.N",
      label: "Shopee Mall",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Ốp Lưng iPhone TPU Silicon",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=Shincase",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Ốp Lưng iPhone Viền Camera",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=eWIFI",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Kính Cường Lực iPhone KK",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=KK",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Tã Quần Goo.N Slim Pants",
      price: "599.000",
      discount: "",
      image: "https://via.placeholder.com/150?text=Goo.N",
      label: "Shopee Mall",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Ốp Lưng iPhone TPU Silicon",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=Shincase",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Ốp Lưng iPhone Viền Camera",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=eWIFI",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Kính Cường Lực iPhone KK",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=KK",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Tã Quần Goo.N Slim Pants",
      price: "599.000",
      discount: "",
      image: "https://via.placeholder.com/150?text=Goo.N",
      label: "Shopee Mall",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Ốp Lưng iPhone TPU Silicon",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=Shincase",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Ốp Lưng iPhone Viền Camera",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=eWIFI",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Kính Cường Lực iPhone KK",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=KK",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Tã Quần Goo.N Slim Pants",
      price: "599.000",
      discount: "",
      image: "https://via.placeholder.com/150?text=Goo.N",
      label: "Shopee Mall",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Ốp Lưng iPhone TPU Silicon",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=Shincase",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Ốp Lưng iPhone Viền Camera",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=eWIFI",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Kính Cường Lực iPhone KK",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=KK",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
    {
      title: "Kính Cường Lực iPhone KK",
      price: "",
      discount: "",
      image: "https://via.placeholder.com/150?text=KK",
      label: "Yêu thích+",
      badge: "25.5 VOUCHER",
    },
  ];


  return (
    <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {products.map((product, index) => (
        <div
          key={index}
          className="bg-white shadow-md rounded-lg overflow-hidden"
        >
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-48 object-cover"
          />
          <div className="p-4">
            <div className="flex justify-between items-start mb-2">
              <span className="text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded">
                {product.label}
              </span>
              {product.badge && (
                <span className="text-sm bg-orange-500 text-white px-2 py-1 rounded">
                  {product.badge}
                </span>
              )}
            </div>
            <h3 className="text-sm font-semibold line-clamp-2">
              {product.title}
            </h3>
            {product.discount && (
              <span className="text-red-500 text-xs">{product.discount}</span>
            )}
            <p className="text-lg font-bold text-red-600 mt-1">
              {product.price} đ
            </p>
            <button className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600">
              Mua Ngay
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductGrid;
