import React, { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { imageUrl } from "../../../api/config";
import userContext from "../../../context/userContext";
import apiCart from "../../../api/apiCart";
import {
  TOTAL,
  TOTAL_SALE,
  SET_CART_FROM_API,
} from "../../../redux/action/cartAction";

import { ADD_CHECKOUT } from "../../../redux/action/checkoutAction";

function CartItem() {
  const { user } = useContext(userContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");

  const cartItems = useSelector((state) => state.cart.carts);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalSale = useSelector((state) => state.cart.totalSale);

  // console.log(cartItems);

  useEffect(() => {
    if (accessToken) {
      dispatch(TOTAL());
      dispatch(TOTAL_SALE());
    }
  }, [accessToken, cartItems, dispatch]);

  const updateItemIncreaseQuantity = async (item, sellerId) => {
    const data = {
      sellerId: sellerId,
      variantId: item.variantId,
      quantity: 1,
    };

    // console.log(data);

    await apiCart
      .addToCart(data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.result;

        // console.log(data);

        Swal.fire({
          title: "Cập nhật thành công",
          text: "Sản phẩm đã được cập nhật",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });

        const sorted1 = [...data].sort(
          (a, b) =>
            new Date(b.itemResponses.updatedAt) -
            new Date(a.itemResponses.updatedAt)
        );

        console.log(sorted1);

        const sorted2 = [...sorted1].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        console.log(sorted2);

        dispatch(SET_CART_FROM_API(sorted2));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Cập nhật giỏ hàng thất bại!",
          text: "Giỏ hàng chưa được cập nhật! Kiểm tra API!",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      });
  };

  const updateItemDecreaseQuantity = async (item, sellerId) => {
    if (item.quantity > 1) {
      const data = {
        sellerId: sellerId,
        variantId: item.variantId,
        quantity: -1,
      };

      // console.log(data);

      await apiCart
        .addToCart(data, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            // "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const data = res.data.result;

          // console.log(data);

          Swal.fire({
            title: "Xóa thành công",
            text: "Sản phẩm đã được xóa khỏi giỏ hàng của bạn",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });

          const sorted1 = [...data].sort(
            (a, b) =>
              new Date(b.itemResponses.updatedAt) -
              new Date(a.itemResponses.updatedAt)
          );

          console.log(sorted1);

          const sorted2 = [...sorted1].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );

          console.log(sorted2);

          dispatch(SET_CART_FROM_API(sorted2));
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Cập nhật giỏ hàng thất bại!",
            text: "Giỏ hàng chưa được cập nhật! Kiểm tra API!",
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
        });
    } else {
      await apiCart
        .deleteItem(item.variantId, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        })
        .then((res) => {
          const data = res.data.result;

          console.log(data);

          Swal.fire({
            title: "Cập nhật thành công",
            text: "Sản phẩm đã được cập nhật",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });

          const sorted1 = [...data].sort(
            (a, b) =>
              new Date(b.itemResponses.updatedAt) -
              new Date(a.itemResponses.updatedAt)
          );

          console.log(sorted1);

          const sorted2 = [...sorted1].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );

          console.log(sorted2);

          dispatch(SET_CART_FROM_API(sorted2));
        })
        .catch((err) => {
          console.log(err);
          Swal.fire({
            title: "Xóa thất bại!",
            text: "Xóa sản phẩm khỏi giỏ hàng thất bại!",
            icon: "error",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
        });
    }
  };

  const handleDeleteItem = async (variantId) => {
    await apiCart
      .deleteItem(variantId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.result;

        // console.log(data);

        Swal.fire({
          title: "Cập nhật thành công",
          text: "Sản phẩm đã được cập nhật",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });

        const sorted1 = [...data].sort(
          (a, b) =>
            new Date(b.itemResponses.updatedAt) -
            new Date(a.itemResponses.updatedAt)
        );

        console.log(sorted1);

        const sorted2 = [...sorted1].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        console.log(sorted2);

        dispatch(SET_CART_FROM_API(sorted2));
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Xóa thất bại!",
          text: "Xóa sản phẩm khỏi giỏ hàng thất bại!",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      });

    // await apiCart
    //   .deleteSeller(sellerId, {
    //     headers: {
    //       Authorization: `Bearer ${accessToken}`,
    //       // "Content-Type": "application/json",
    //     },
    //   })
    //   .then((res) => {
    //     const data = res.data.result;

    //     // console.log(data);

    //     Swal.fire({
    //       title: "Cập nhật thành công",
    //       text: "Sản phẩm đã được cập nhật",
    //       icon: "success",
    //       timer: 1500,
    //       timerProgressBar: true,
    //       showConfirmButton: false,
    //     }).then((result) => {
    //       if (result.dismiss === Swal.DismissReason.timer) {
    //         console.log("I was closed by the timer");
    //       }
    //     });

    //     const sorted1 = [...data].sort(
    //       (a, b) =>
    //         new Date(b.itemResponses.updatedAt) -
    //         new Date(a.itemResponses.updatedAt)
    //     );

    //     console.log(sorted1);

    //     const sorted2 = [...sorted1].sort(
    //       (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
    //     );

    //     console.log(sorted2);

    //     dispatch(SET_CART_FROM_API(sorted2));
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //     Swal.fire({
    //       title: "Xóa thất bại!",
    //       text: "Xóa sản phẩm khỏi giỏ hàng thất bại!",
    //       icon: "error",
    //       timer: 1500,
    //       timerProgressBar: true,
    //       showConfirmButton: false,
    //     }).then((result) => {
    //       if (result.dismiss === Swal.DismissReason.timer) {
    //         console.log("I was closed by the timer");
    //       }
    //     });
    //   });
  };

  const handleAddToCheckOut = (seller, item) => {
    dispatch(ADD_CHECKOUT({ seller, item }));
  };

  const handleCheckout = () => {
    // console.log("checkout");
    navigate("/checkout");
  };

  return (
    <div className="ontainer mx-auto p-4 bg-white rounded-lg">
      {cartItems.map((seller, sellerIndex) => (
        <div key={sellerIndex} className="mb-6">
          <table className="w-full bg-white shadow-md ">
            <thead>
              <tr className="bg-gray-200">
                <th className="p-2 text-left">
                  <span className="font-normal">Shop</span>{" "}
                  <span className="text-orange-500">
                    {seller.sellerUsername}
                  </span>
                </th>
                <th className="p-2 text-left">Đơn Giá</th>
                <th className="p-2 text-left">Số Lượng</th>
                <th className="p-2 text-left">Số Tiền</th>
                <th className="p-2 text-left">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {seller.itemResponses.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2 flex items-center w-[600px]">
                    <input
                      type="checkbox"
                      className="mr-2"
                      onClick={() => handleAddToCheckOut(seller, item)}
                    />
                    <img
                      src={imageUrl + "product/" + item.image}
                      alt={item.name}
                      className="w-24 h-24 mr-2"
                      onError={(e) => {
                        const target = e.target;
                        target.onerror = null;
                        const retryInterval = 2000;
                        let retryCount = 0;
                        const maxRetries = 5;
                        const retryLoad = () => {
                          if (retryCount < maxRetries) {
                            retryCount++;
                            target.src =
                              imageUrl +
                              "product/" +
                              `${item.image}?retry=${retryCount}`;
                            target.onerror = () => {
                              setTimeout(retryLoad, retryInterval);
                            };
                          } else {
                            target.src =
                              "https://placehold.co/32x32/cccccc/333333?text=N/A";
                          }
                        };
                        setTimeout(retryLoad, retryInterval);
                      }}
                      loading="lazy"
                    />
                    <button
                      className="hover:text-blue-700 text-left"
                      onClick={() => navigate(`/product-detail/${item.slug}`)}
                    >
                      <p className="text-sm">
                        {item.productName.length > 100
                          ? item.productName.slice(0, 100) + "..."
                          : item.productName}
                      </p>
                      <p>
                        <span className="text-xs">Phân loại: </span>
                        <span className="text-left text-xs text-gray-500 p-0.5 rounded border border-red-500">
                          {item.variantName.length > 80
                            ? item.variantName.slice(0, 80) + "..."
                            : item.variantName}
                        </span>
                      </p>
                      {item.badge && (
                        <span className="text-xs bg-orange-500 text-white px-1 rounded">
                          {item.badge}
                        </span>
                      )}
                    </button>
                  </td>
                  {item.salePrice > 0 ? (
                    <td className="p-2">
                      <span className="text-gray-500 line-through">
                        {item.price.toLocaleString("de-DE")}đ
                      </span>
                      <br />
                      <span className="text-red-600 font-bold">
                        {item.salePrice.toLocaleString("de-DE")}đ
                      </span>
                    </td>
                  ) : (
                    <td className="p-2">
                      <span className="text-red-600 font-bold">
                        {item.price.toLocaleString("de-DE")}đ
                      </span>
                    </td>
                  )}

                  <td className="p-2">
                    <div className="flex items-center">
                      <button
                        onClick={() =>
                          updateItemDecreaseQuantity(item, seller.sellerId)
                        }
                        className="bg-gray-200 px-2 py-1 rounded-l"
                      >
                        -
                      </button>
                      <span className="px-4 py-1 border-t border-b">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() =>
                          updateItemIncreaseQuantity(item, seller.sellerId)
                        }
                        className="bg-gray-200 px-2 py-1 rounded-r"
                      >
                        +
                      </button>
                    </div>
                  </td>
                  <td className="p-2">
                    {(item.salePrice > 0
                      ? item.salePrice
                      : item.price * item.quantity
                    ).toLocaleString("de-DE")}
                    đ
                  </td>
                  <td className="p-2">
                    <button
                      className="text-red-500 hover:underline"
                      onClick={() => handleDeleteItem(item.variantId)}
                    >
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
        <p className="text-lg font-bold text-red-500">
          Tổng cộng: {totalSale.toLocaleString("de-DE")}đ
        </p>
        <p className="text-sm text-gray-500">
          Tiết kiệm: {(totalAmount - totalSale).toLocaleString("de-DE")}đ
        </p>
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
