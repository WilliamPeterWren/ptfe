import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import apiOrder from "../../../api/apiOrder";

function RecieveOrder() {
  const [orderId, setOrderId] = useState("");
  const accessToken = Cookies.get("accessToken");

  const handleRecieveOrder = async () => {
    console.log(orderId);
    // console.log(accessToken);
    await apiOrder
      .recieveOrderByShipper(orderId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data;
        console.log(res);

        if (data === true) {
          Swal.fire({
            title: "Nhận đơn hàng thành công!",
            text: "Bạn đã nhận đơn hàng mới!",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        } else {
          Swal.fire({
            title: "Người bán chưa chuẩn bị hàng!",
            text: "Hãy kiểm tra lại mã vận đơn!",
            icon: "warning",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Đơn hàng đã có người nhận!",
          text: "Hãy kiểm tra lại mã vận đơn!",
          icon: "warning",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      });
  };

  return (
    <div className="mx-auto mt-4">
      <div className="">
        <h1 className="text-center text-2xl font-semibold text-yellow-800 mb-4">
          Trang nhận đơn hàng
        </h1>
        <hr className="border border-b border-red-500" />
      </div>

      <div className="mt-4 ml-4">
        <p className="ml-2 text-lg font-semibold mr-4">Nhập mã đơn hàng</p>
      </div>

      <div className="mt-4 ml-4">
        <input
          name="orderid"
          className="border border-gray-200 rounded p-2 min-w-2xl focus:outline-blue-500"
          placeholder="Nhập mã đơn hàng ..."
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>
      <div className="mt-4 ml-4">
        <button
          className="p-2 border border-blue-500 rounded-lg hover:bg-blue-500 hover:text-white"
          onClick={handleRecieveOrder}
        >
          Nhận đơn hàng
        </button>
      </div>
    </div>
  );
}

export default RecieveOrder;
