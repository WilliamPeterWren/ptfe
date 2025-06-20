import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { MdOutlineLocalShipping } from "react-icons/md";
import { PayPalButtons } from "@paypal/react-paypal-js";

import apiOrder from "../../../api/apiOrder";
import apiCart from "../../../api/apiCart";
import apiShippingFee from "../../../api/apiShipping";
import apiShippingVoucher from "../../../api/apiShippingVoucher";
import apiEmail from "../../../api/apiEmail";

import { SET_CART_FROM_API } from "../../../redux/action/cartAction";
import { CLEAR_CHECKOUT } from "../../../redux/action/checkoutAction";

import { formatCurrency } from "../../../utils/FormatCurrency";

const generateOrderHtmlBody = (
  orderItems,
  orderTotal,
  customerName,
  orderId,
  customerEmail,
  shippingFee,
  shippingVoucher,
  peterVoucher,
  paymentType,
  grandTotal
) => {
  let tableRowsHtml = "";
  orderItems.forEach((item) => {
    const effectivePrice = item.salePrice > 0 ? item.salePrice : item.price;
    const itemTotalPrice = effectivePrice * item.quantity - item.discount;

    tableRowsHtml += `
      <tr>
        <td style="padding: 8px; border: 1px solid #ddd;">          
          ${item.productName || "Unknown Product"} (${
      item.variantName || "N/A"
    })
        </td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: center;">${
          item.quantity
        }</td>
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${item.price.toFixed(
          2
        )}</td>
        ${
          item.salePrice > 0
            ? `<td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: green;">${item.salePrice.toFixed(
                2
              )}</td>`
            : '<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">N/A</td>'
        }
        ${
          item.discount > 0
            ? `<td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: red;">-${item.discount.toFixed(
                2
              )}</td>`
            : '<td style="padding: 8px; border: 1px solid #ddd; text-align: right;">0.00</td>'
        }
        <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${itemTotalPrice.toFixed(
          2
        )}</td>
      </tr>
    `;
  });

  return `
    <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
      <h2 style="color: #0056b3;">Xác nhận đơn hàng - #${orderId}</h2>
      <p>Kính gửi ${customerName},</p>
      <p>Cảm ơn bạn đã mua hàng! Dưới đây là chi tiết đơn hàng của bạn:</p>
      
      <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px;">
        <thead>
          <tr style="background-color: #f2f2f2;">
            <th style="padding: 8px; border: 1px solid #ddd; text-align: left;">Sản phẩm</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: center;">Số lượng</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Giá gốc</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Giá bán</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Giảm giá</th>
            <th style="padding: 8px; border: 1px solid #ddd; text-align: right;">Tổng phụ</th>
          </tr>
        </thead>
        <tbody>
          ${tableRowsHtml}   
        </tbody>
           <tfoot>
          <tr>
            <td colspan="5" style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">Tổng tiền sản phẩm:</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold;">${orderTotal.toFixed(
              2
            )}</td>
          </tr>
          <tr>
            <td colspan="5" style="padding: 8px; border: 1px solid #ddd; text-align: right;">Phí vận chuyển:</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right;">${shippingFee.toFixed(
              2
            )}</td>
          </tr>
          <tr>
            <td colspan="5" style="padding: 8px; border: 1px solid #ddd; text-align: right;">Khuyến mãi vận chuyển:</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: ${
              shippingVoucher > 0 ? "red" : "#333"
            };">-${shippingVoucher.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="5" style="padding: 8px; border: 1px solid #ddd; text-align: right;">Khuyến mãi Peter:</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: ${
              peterVoucher > 0 ? "red" : "#333"
            };">-${peterVoucher.toFixed(2)}</td>
          </tr>
          <tr>
            <td colspan="5" style="padding: 8px; border: 1px solid #ddd; text-align: right;">Hình thức thanh toán:</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right; color: red">
            ${paymentType}</td>
          </tr>

          <tr>
            <td colspan="5" style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold; background-color: #f2f2f2;">Tổng cộng:</td>
            <td style="padding: 8px; border: 1px solid #ddd; text-align: right; font-weight: bold; background-color: #f2f2f2;">${grandTotal.toFixed(
              2
            )}</td>
          </tr>
        </tfoot>
      </table>

      <p>Chúng tôi sẽ thông báo cho bạn khi đơn hàng của bạn được vận chuyển. Nếu bạn có bất kỳ câu hỏi nào, vui lòng liên hệ với chúng tôi.</p>
      <p>Trân trọng,</p>
      <p>Đội ngũ Peter Ecom</p>
      <p style="font-size: 0.9em; color: #777;">Email này được gửi đến: ${customerEmail}</p>
    </div>
  `;
};

const PaymentSummary = (props) => {
  const { data, peterVoucher, peterVoucherId, addressId } = props;
  const email = Cookies.get("email");
  const customerName = Cookies.get("username");
  const userPeterVoucher = JSON.parse(Cookies.get("peterVoucher"));

  // const userShippingVoucher = JSON.parse(Cookies.get("shippingVoucher"));

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

  const totalDiscount = data.reduce((sum, seller) => {
    return (
      sum +
      seller.items.reduce((sum, item) => {
        return sum + item.discount * item.quantity;
      }, 0)
    );
  }, 0);

  const [shippingFees, setShippingFees] = useState([]);
  const [shippingFee, setShippingFee] = useState(15000);
  const [shippingId, setShippingId] = useState("683b529e2a9cfc41ae6f134b");

  const [shippingVouchers, setShippingVouchers] = useState([]);
  const [shippingVoucher, setShippingVoucher] = useState(0);
  const [shippingVoucherId, setShippingVoucherId] = useState("");

  const shippingCostAfterVoucher = Math.max(shippingFee - shippingVoucher, 0);
  const totalPayment =
    totalProductPrice + shippingCostAfterVoucher - peterVoucher;

  const [paymentType, setPaymentType] = useState("COD");

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

  const handlePlaceTheOrder = async (paymentType) => {
    for (const seller of data) {
      const orderItems = seller.items.map((item) => ({
        price: item.price,
        variantId: item.variantId,
        quantity: item.quantity,
        salePrice: item.salePrice,
        discount: item.discount,
      }));

      const dataOrder = {
        sellerId: seller.sellerId,
        orderItems,
        shippingVoucherId: shippingVoucherId,
        addressId: addressId,
        paymentType: paymentType,
        sellerVoucherId: "",
        shippingId: shippingId,
        peterVoucher: peterVoucherId,
      };

      console.log(dataOrder);
      if (addressId != null) {
        try {
          const res = await apiOrder.createOrder(dataOrder, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          Swal.fire({
            title: "Đặt hàng thành công!",
            text: "Đơn hàng đã được gửi đến nhà bán hàng.",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          });

          console.log(res.data.result);
          const createdOrder = res.data.result;
          const orderId = createdOrder.id;

          const orderItemsForEmail = seller.items.map((item) => ({
            ...item,
            productName: item.productName || "Unknown Product",
            variantName: item.variantName || "N/A",
            itemTotal:
              (item.salePrice > 0
                ? item.salePrice
                : item.price - item.discount) * item.quantity,
          }));

          const orderTotalForEmail = orderItemsForEmail.reduce(
            (sum, item) => sum + item.itemTotal,
            0
          );

          const htmlBodyContent = generateOrderHtmlBody(
            orderItemsForEmail,
            orderTotalForEmail,
            customerName,
            orderId,
            email,

            shippingFee,
            shippingVoucher,
            peterVoucher,
            paymentType,
            totalPayment - totalDiscount
          );

          const dataEmail = {
            to: email,
            subject: `Đơn hàng của bạn #${orderId} - Peter Ecom`,
            htmlBody: htmlBodyContent,
          };

          const sendEmailRes = await apiEmail.sendEmail(dataEmail);

          if (sendEmailRes.status === 200) {
            console.log("Order created and email sent successfully!");
          } else {
            console.error(
              "Order created, but failed to send email:",
              sendEmailRes
            );
          }

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

          userPeterVoucher.forEach((item) => {
            if (item.id === peterVoucherId) {
              item.value -= 1;
            }
          });
          Cookies.set("peterVoucher", JSON.stringify(userPeterVoucher));

          dispatch(CLEAR_CHECKOUT());

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
    }
  };

  return (
    <div className="bg-white p-6 mt-4 shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Phương Thức Thanh Toán</h3>
      <div className="flex flex-col space-y-2 text-sm text-gray-700">
        <div className="flex justify-between items-center border-b pb-2 border-gray-200">
          <span>Tổng tiền hàng</span>
          <span>{formatCurrency(totalProductPrice - totalDiscount)}</span>
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
              if (item.price * 8 < totalProductPrice)
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
            {paymentType === "COD"
              ? formatCurrency(totalPayment - totalDiscount)
              : 0}
          </span>
        </div>
      </div>
      <div className="flex justify-end mt-6">
        <button
          className={` text-white px-8 py-3 rounded ${
            addressId.length > 5
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-400"
          }  text-lg font-semibold`}
          onClick={() => handlePlaceTheOrder("COD")}
          disabled={addressId.length < 5}
        >
          ĐẶT HÀNG
        </button>
      </div>
      <div>
        <PayPalButtons
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: totalPayment - totalDiscount,
                  },
                },
              ],
            });
          }}
          onApprove={(data, actions) => {
            return actions.order.capture().then((details) => {
              // alert("Payment successful by " + details.payer.name.given_name);
              // setPaymentType("PAYPAL");
              handlePlaceTheOrder("PAYPAL");
            });
          }}
        />
      </div>
    </div>
  );
};

export default PaymentSummary;
