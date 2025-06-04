import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MdOutlineLocalShipping } from "react-icons/md";


import { SET_CART_FROM_API } from "../../../redux/action/cartAction";
import apiOrder from "../../../api/apiOrder";
import apiCart from "../../../api/apiCart";
import { formatCurrency } from "../utils/FormatCurrency";
import apiShippingFee from "../../../api/apiShipping";
import apiShippingVoucher from "../../../api/apiShippingVoucher";
import apiPeterVoucher from "../../../api/apiPeterVoucher";

const PaymentSummary = (props) => {
  const {
    data,
    peterVouchers,
    setPeterVoucher,
    peterVoucher,
    setPeterVoucherId,
    peterVoucherId,
  } = props;

  console.log(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const totalProductPrice = data.reduce((sum, seller) => {
    return (
      sum +
      seller.items.reduce((sellerSum, item) => {
        return (
          sellerSum +
          (item.salePrice > 0 && item.salePrice !== item.price
            ? item.salePrice * item.quantity
            : item.price * item.quantity)
        );
      }, 0)
    );
  }, 0);

  const [shippingFees, setShippingFees] = useState([]);
  const [shippingFee, setShippingFee] = useState(15000);
  const [shippingId, setShippingId] = useState("683b529e2a9cfc41ae6f134b");

  const [shippingVouchers, setShippingVouchers] = useState([]);
  const [shippingVoucher, setShippingVoucher] = useState(15000);
  const [shippingVoucherId, setShippingVoucherId] = useState("");

  const totalPayment =
    totalProductPrice +
    (shippingVoucher - shippingFee > 0 ? 0 : shippingFee - shippingVoucher) -
    peterVoucher;
  const accessToken = Cookies.get("accessToken");

  const getShippingFees = async () => {
    await apiShippingFee
      .getAll()
      .then((res) => {
        const data = res.data;
        console.log(data);
        setShippingFees(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getShippingVouchers = async () => {
    await apiShippingVoucher
      .getAll()
      .then((res) => {
        const data = res.data;
        console.log(data);
        setShippingVouchers(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getShippingFees();
    getShippingVouchers();
  }, []);

  const setShippingChange = (selected) => {
    setShippingFee(selected.value);
    setShippingId(selected.id);
  };

  const setShippingVoucherChange = (selected) => {
    setShippingVoucher(selected.value);
    setShippingVoucherId(selected.id);
  };

  const handlePlaceTheOrder = async () => {
    for (const seller of data) {
      const orderItems = seller.items.map((item) => ({
        price: item.price,
        variantId: item.variantId,
        quantity: item.quantity,
        salePrice: item.salePrice,
        discount: 0,
      }));

      const dataOrder = {
        sellerId: seller.sellerId,
        orderItems,
        shippingVoucherId: shippingVoucherId,
        addressId: "",
        paymentType: "COD",
        sellerVoucherId: "",
        shippingId: shippingId,
        peterVoucher: peterVoucherId,
      };

      console.log(dataOrder);

      try {
        const res = await apiOrder.createOrder(dataOrder, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        console.log(res.data);

        for (const item of orderItems) {
          try {
            const res = await apiCart.deleteItem(item.variantId, {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            });

            const data = res.data.result;

            const sorted1 = [...data].sort((a, b) => {
              const aTime = new Date(a.itemResponses?.updatedAt || 0);
              const bTime = new Date(b.itemResponses?.updatedAt || 0);
              return bTime - aTime;
            });

            const sorted2 = [...sorted1].sort((a, b) => {
              const aTime = new Date(a.updatedAt || 0);
              const bTime = new Date(b.updatedAt || 0);
              return bTime - aTime;
            });

            dispatch(SET_CART_FROM_API(sorted2));
          } catch (deleteError) {
            console.log("Delete item error:", deleteError);
          }
        }

        Swal.fire({
          title: "Đặt hàng thành công!",
          text: "Đơn hàng đã được gửi đến nhà bán hàng.",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });

        navigate("/home");
      } catch (err) {
        console.log("Create order error:", err);
        Swal.fire({
          title: "Đặt hàng thất bại!",
          text: "Đây là lỗi của chúng tôi không phải của bạn!",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    }
  };

  return (
    <div className="bg-white p-6 mt-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Phương Thức Thanh Toán</h3>
      <div className="flex flex-col space-y-2 text-sm text-gray-700">
        <div className="flex justify-between items-center border-b pb-2 border-gray-200">
          <span>Tổng tiền hàng</span>
          <span>{formatCurrency(totalProductPrice)}</span>
        </div>

        <div className="flex justify-between items-center border-b pb-2 border-gray-200">
          <MdOutlineLocalShipping className="mr-1 text-orange-500 text-lg" />

          <span>Phí vận chuyển</span>
          <select
            id="category"
            className="w-80 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base appearance-none bg-white pr-10"
            onChange={(e) => {
              const selected = JSON.parse(e.target.value);
              setShippingChange(selected);
            }}
          >
            {shippingFees.map((item, index) => {
              return (
                <option
                  key={index}
                  value={JSON.stringify({ id: item.id, value: item.value })}
                  id={item.id}
                >
                  {item.name}{" "}
                  <span className="">{item.value.toLocaleString()} đ</span>
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex justify-between items-center border-b pb-2 border-gray-200">
          <MdOutlineLocalShipping className="mr-1 text-orange-500 text-lg" />

          <span>Khuyến mãi vận chuyển</span>
          <select
            id="category"
            className="w-80 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base appearance-none bg-white pr-10"
            onChange={(e) => {
              const selected = JSON.parse(e.target.value);
              setShippingVoucherChange(selected);
            }}
          >
            {shippingVouchers.map((item, index) => {
              return (
                <option
                  key={index}
                  value={JSON.stringify({ id: item.id, value: item.price })}
                  id={item.id}
                >
                  {item.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="flex justify-between items-center pt-2">
          <span className="text-xl font-bold text-orange-500">
            Tổng thanh toán
          </span>
          <span className="text-xl font-bold text-orange-500">
            {formatCurrency(totalPayment)}
          </span>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          className="bg-orange-500 text-white px-8 py-3 rounded hover:bg-orange-600 text-lg font-semibold"
          onClick={() => handlePlaceTheOrder()}
        >
          ĐẶT HÀNG
        </button>
      </div>
    </div>
  );
};

export default PaymentSummary;
