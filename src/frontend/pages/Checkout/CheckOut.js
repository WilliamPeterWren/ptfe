import React from "react";
import Cookies from "js-cookie";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";


import apiOrder from "../../../api/apiOrder";
import apiOrderDetail from "../../../api/apiOrderDetail";

function CheckOut() {
  const userId = Cookies.get("authId");
  console.log("user id: " + userId);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const username = Cookies.get("authUsername");

      const email = Cookies.get("authEmail"); // Expires in 7 days
      const password = Cookies.get("authPassword"); // Expires in 7 days

      const phone = Cookies.get("authPhone"); // Expires in 7 days
      const address = Cookies.get("authAddress"); // Expires in 7 days

      const first_name = Cookies.get("authFirstname"); // Expires in 7 days
      const last_name = Cookies.get("authLastname"); // Expires in 7 days

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
        },
      };

      const response = await apiOrder
        .createOrder({ data: formOrder })
        .then(async (res) => {
          console.log("res id: ", res.data.id);

          getDataCart.map(async (item) => {
            const formOrderDetail = {
              order_id: res.data.id,
              product_id: item[0].id,
              quantity: item.quantity,
              price: item[0].is_on_sale ? item[0].sale_price : item[0].price,
            };

            console.log("from order detail: ", formOrderDetail);

            const resOrder = await apiOrderDetail.createOrderDetail({
              data: formOrderDetail,
            });
            console.log("resOrder: " + resOrder);
          });
        });

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

      navigate("/home");
    } catch (error) {
      console.error("Error saving data:", error);
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

  const FirstName = Cookies.get("authFirstname");
  const LastName = Cookies.get("authLastname");
  const email = Cookies.get("authEmail");
  const phone = Cookies.get("authPhone");
  const address = Cookies.get("authAddress");

  const getDataCart = useSelector((state) => state.cart.carts);

  var totalSalePrice = 0;

  const cartItems = {
    store: "Hoco.Shop",
    items: [
      {
        name: "Dây sạc nhanh HOCO X89, sạc nhanh 2.4A, dây sạc type-c, ni...",
        variant: "MICRO (Đỏ)",
        price: 41580,
        quantity: 1,
        image: "https://via.placeholder.com/50?text=Hoco",
      },
      {
        name: "Dây sạc 3 trong 1 HOCO DU02, dây sạc IP sạc nhanh 2.4A chu...",
        variant: "Xám",
        price: 106000,
        quantity: 1,
        image: "https://via.placeholder.com/50?text=Hoco",
      },
      {
        name: "Bò hầm rò vò mần mò...",
        variant: "",
        price: 22399,
        quantity: 1,
        image: "https://via.placeholder.com/50?text=Custom",
      },
    ],
  };
  const shippingAddress = {
    name: "trần phong (+84) 982105825",
    address:
      "145Ib, Đường B6 Xuân Hợp, Phường Phước Long B, Thủ Đức, TP. Hồ Chí Minh, Việt Nam",
  };

  const handleCheckout = () => {
    alert("Proceeding to payment!");
  };

  return (
    <div className="min-h-screen bg-gray-100 px-80">
      <div className="container mx-auto p-4 bg-white shadow-md">
        <h1 className="text-xl font-bold text-orange-500 mb-4">Thanh Toán</h1>
        <div className="border-b border-gray-200 pb-2 mb-4">
          <span className="text-orange-500">Địa Chỉ Nhận Hàng</span>
          <p className="text-sm uppercase font-bold">{shippingAddress.name}</p>
          <p className="text-sm">{shippingAddress.address}</p>
          <button className="text-blue-500 text-sm">Thay đổi</button>
        </div>

        <table className="w-full mb-4 border-none">
          <thead>
            <tr>
              <th className="p-2 text-left border-none">
                <div className="">
                  <span className="bg-blue-200 p-3 rounded-lg">
                    {cartItems.store || "Tên cửa hàng"}
                  </span>
                </div>
              </th>
            </tr>
            <tr className="bg-gray-100 py-2">
              <th className="p-2 text-left border-none">Sản phẩm</th>
              <th className="p-2 text-left border-none">Đơn giá</th>
              <th className="p-2 text-left border-none">Số lượng</th>
              <th className="p-2 text-left border-none">Thành tiền</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.items.map((item, index) => (
              <tr key={index} className="border-none">
                <td className="p-2 flex items-center border-none">
                  <input type="checkbox" className="mr-2" />
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 mr-2"
                  />
                  <div>
                    <p className="text-sm">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.variant}</p>
                  </div>
                </td>
                <td className="p-2 border-none">
                  {item.price.toLocaleString()}đ
                </td>
                <td className="p-2 border-none">{item.quantity}</td>
                <td className="p-2 border-none">
                  {(item.price * item.quantity).toLocaleString()}đ
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="flex justify-items items-center">
          <div className="w-1/2 mb-4 mx-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-orange-500">Shopee Voucher</span>
              <button className="text-blue-500">Chọn Voucher</button>
            </div>
          </div>

          <div className="w-1/2 mb-4 mx-2">
            <p className="text-sm">Phương thức vận chuyển</p>
            <div className="border p-2">
              <p>Hỏa tốc trong ngày</p>
              <p className="text-gray-500 text-sm">
                Đơn hàng từ ₫15.000 - Đơn hàng từ ₫0 khi áp dụng voucher
              </p>
              <p className="text-red-500">₫16.500</p>
            </div>
          </div>
        </div>

        <div className="flex justify-items items-center">
          <div className="w-1/2 mb-4 mx-2">
            <div className="flex justify-between items-center mb-2">
              <span className="text-yellow-500">Shopee Xu</span>
              <input
                type="number"
                defaultValue={0}
                className="w-16 p-1 border rounded"
              />
            </div>
          </div>
          <div className="w-1/2 mb-4 mx-2">
            <p className="text-sm">Phương thức thanh toán</p>
            <div className="border p-2">
              <p>Thanh toán khi nhận hàng (THAY ĐỔI)</p>
              <p className="text-red-500">₫164.080</p>
            </div>
          </div>
        </div>

        <div className="text-right mb-4">
          <p>Tổng số tiền (2 sản phẩm): ₫164.080</p>
          <button
            onClick={handleCheckout}
            className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
          >
            Đặt hàng
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
