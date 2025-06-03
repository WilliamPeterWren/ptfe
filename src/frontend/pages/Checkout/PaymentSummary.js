import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { SET_CART_FROM_API } from "../../../redux/action/cartAction";

import apiOrder from "../../../api/apiOrder";
import apiCart from "../../../api/apiCart";
import { formatCurrency } from "../utils/FormatCurrency";

const PaymentSummary = ({ data }) => {
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

  const shippingFee = 15000;
  const totalPayment = totalProductPrice + shippingFee;
  const accessToken = Cookies.get("accessToken");

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
        shippingVoucherId: "",
        addressId: "",
        paymentType: "COD",
        sellerVoucherId: "",
        shippingId: "683b529e2a9cfc41ae6f134b",
      };

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
          <span>Phí vận chuyển</span>
          <span>{formatCurrency(shippingFee)}</span>
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
