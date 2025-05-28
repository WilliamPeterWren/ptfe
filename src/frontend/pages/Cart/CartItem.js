import React, {useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";

import { TOTAL, CLEAR } from "../../../redux/action/cartAction";

function CartItem() {
  const id = Cookies.get("authId");
  console.log(id);
  const navigate = useNavigate();

  // useEffect(() => {
  //   if (!id) {
  //     navigate("/login");
  //   }
  // }, [id]);

  var totalSalePrice = 0;
  const getDataCart = useSelector((state) => state.cart.carts);

  const dispatch = useDispatch();
  dispatch(TOTAL());
  const totalAmount = useSelector((state) => state.cart.totalAmount);

  const clearCart = () => {
    dispatch(CLEAR());
  };

  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock fetch function to simulate fetching products by seller
  const fetchProductsBySeller = async () => {
    const mockData = [
      {
        seller: "Metoo Plush Toys Store",
        products: [
          {
            id: 1,
            name: "Mũ Ô Tô Lốp Máy Bơm Hội Hải Đầu áu Bơm Hơi Nhanh Vói Phun L...",
            variant: "Single Head",
            originalPrice: 461620,
            discountedPrice: 34320,
            quantity: 1,
            badge: "25.5 VOUCHER",
            image: "https://via.placeholder.com/50?text=Metoo",
          },
        ],
      },
      {
        seller: "Hoco.Shop",
        products: [
          {
            id: 2,
            name: "Dây sạc 3 trong 1 HOCO DU02, dây sạc IP sạc nhanh 2.4A chu...",
            variant: "Xám",
            originalPrice: 154400,
            discountedPrice: 106000,
            quantity: 1,
            badge: "25.5 VOUCHER",
            image: "https://via.placeholder.com/50?text=Hoco",
          },
          {
            id: 3,
            name: "Dây sạc nhanh HOCO X89, sạc nhanh 2.4A, dây sạc type-c, ni...",
            variant: "MICRO (Đỏ)",
            originalPrice: 442000,
            discountedPrice: 41580,
            quantity: 1,
            badge: "25.5 VOUCHER",
            image: "https://via.placeholder.com/50?text=Hoco",
          },
        ],
      },
    ];
    return mockData;
  };

  useEffect(() => {
    const loadCartItems = async () => {
      setLoading(true);
      const data = await fetchProductsBySeller();
      setCartItems(data);
      setLoading(false);
    };
    loadCartItems();
  }, []);

  const updateQuantity = (sellerIndex, productId, change) => {
    setCartItems(
      cartItems.map((seller, idx) =>
        idx === sellerIndex
          ? {
              ...seller,
              products: seller.products.map((product) =>
                product.id === productId
                  ? {
                      ...product,
                      quantity: Math.max(1, product.quantity + change),
                    }
                  : product
              ),
            }
          : seller
      )
    );
  };

  const calculateSellerTotal = (products) =>
    products.reduce(
      (sum, item) => sum + item.discountedPrice * item.quantity,
      0
    );

  const total = cartItems.reduce(
    (sum, seller) => sum + calculateSellerTotal(seller.products),
    0
  );

  if (loading) {
    return <div className="text-center p-4">Đang tải...</div>;
  }

  const handleCheckout = () => {
    // alert("Proceeding to checkout!");
    // Add your checkout logic here

    console.log("checkout");
  };
  return (
    <div className="ontainer mx-auto p-4 bg-white rounded-lg">
      {cartItems.map((seller, sellerIndex) => (
        <div key={sellerIndex} className="mb-6">
          <div className="bg-gray-100 p-2 flex items-center">
            <input type="checkbox" className="mr-2" />
            <span className="text-orange-500 font-bold">{seller.seller}</span>
          </div>
          <table className="w-full bg-white shadow-md rounded">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 text-left">Sản Phẩm</th>
                <th className="p-2 text-left">Đơn Giá</th>
                <th className="p-2 text-left">Số Lượng</th>
                <th className="p-2 text-left">Số Tiền</th>
                <th className="p-2 text-left">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {seller.products.map((item) => (
                <tr key={item.id} className="border-b">
                  <td className="p-2 flex items-center">
                    <input type="checkbox" className="mr-2" />
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 mr-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        // e.target.src = defaultImage(item);
                      }}
                      loading="lazy"
                    />
                    <div>
                      <p className="text-sm">{item.name}</p>
                      <p className="text-xs text-gray-500">{item.variant}</p>
                      {item.badge && (
                        <span className="text-xs bg-orange-500 text-white px-1 rounded">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-2">
                    <span className="text-gray-500 line-through">
                      {item.originalPrice.toLocaleString()}đ
                    </span>
                    <br />
                    <span className="text-red-600 font-bold">
                      {item.discountedPrice.toLocaleString()}đ
                    </span>
                  </td>
                  <td className="p-2">
                    <div className="flex items-center">
                      <button
                        onClick={() => updateQuantity(sellerIndex, item.id, -1)}
                        className="bg-gray-200 px-2 py-1 rounded-l"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(sellerIndex, item.id, 1)}
                        className="bg-gray-200 px-2 py-1 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-2">
                    {(item.discountedPrice * item.quantity).toLocaleString()}đ
                  </td>
                  <td className="p-2">
                    <button className="text-red-500 hover:underline">
                      Xóa
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
      <div className="mt-4 text-right">
        <p className="text-lg font-bold">
          Tổng cộng: {total.toLocaleString()}đ
        </p>
        <p className="text-sm text-gray-500">Tiết kiệm: 0đ</p>
      </div>
      <div className="mt-2 text-left">
        <p className="text-blue-500">
          <span className="text-red-500">🎫</span> Voucher giảm đến 41k{" "}
          <span className="text-blue-500">Xem thêm voucher</span>
        </p>
        <p className="text-blue-500">
          <span className="text-green-500">🚚</span> Giảm ₫300.000 phí vận
          chuyển đơn từ ₫0; Giảm ₫500.000 phí vận chuyển đơn từ ₫500.000{" "}
          <span className="text-blue-500">Tìm hiểu thêm</span>
        </p>
      </div>
      <div className="container mx-auto p-4">
        <button
          onClick={handleCheckout}
          className="w-full bg-orange-500 text-white py-3 rounded-lg font-semibold hover:bg-orange-600 transition duration-200"
        >
          Thanh Toán
        </button>
      </div>
    </div>
  );
}

export default CartItem;
