import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { imageUrl } from "../../../api/config";
// import userContext from "../../../context/userContext";
import apiCart from "../../../api/apiCart";
import {
  TOTAL,
  TOTAL_SALE,
  TOTAL_DISCOUNT,
  SET_CART_FROM_API,
} from "../../../redux/action/cartAction";

import {
  ADD_CHECKOUT,
  REMOVE_CHECKOUT,
} from "../../../redux/action/checkoutAction";

function CartItem() {
  // const { user } = useContext(userContext);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = Cookies.get("accessToken");

  const cartItems = useSelector((state) => state.cart.carts);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const totalSale = useSelector((state) => state.cart.totalSale);
  const totalDiscount = useSelector((state) => state.cart.totalDiscount);
  const checkouts = useSelector((state) => state.checkout.checkouts);

  const [value, setValue] = useState(1);

  useEffect(() => {
    if (accessToken) {
      dispatch(TOTAL());
      dispatch(TOTAL_SALE());
      dispatch(TOTAL_DISCOUNT());
    }
  }, [accessToken, cartItems, dispatch]);

  // const updateItemIncreaseQuantity = async (item, sellerId) => {
  //   setValue(value + 1);
  //   console.log(item);
  //   const data = {
  //     sellerId: sellerId,
  //     variantId: item.variantId,
  //     quantity: 1,
  //   };

  //   // console.log(data);

  //   await apiCart
  //     .addToCart(data, {
  //       headers: {
  //         Authorization: `Bearer ${accessToken}`,
  //         // "Content-Type": "application/json",
  //       },
  //     })
  //     .then((res) => {
  //       const data = res.data.result;

  //       console.log(data);

  //       toast.success(`Cập nhật giỏ hàng!`, {
  //         position: "top-right",
  //         autoClose: 2000,
  //         hideProgressBar: false,
  //         closeOnClick: true,
  //         pauseOnHover: true,
  //         draggable: true,
  //         style: {
  //           top: "-50%",
  //           transform: "translateY(50%)",
  //           marginRight: "2%",
  //           width: "fit-content",
  //         },
  //       });

  //       const sorted1 = [...data].sort(
  //         (a, b) =>
  //           new Date(b.itemResponses.updatedAt) -
  //           new Date(a.itemResponses.updatedAt)
  //       );

  //       console.log(sorted1);

  //       const sorted2 = [...sorted1].sort(
  //         (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  //       );

  //       console.log(sorted2);

  //       dispatch(SET_CART_FROM_API(sorted2));
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       Swal.fire({
  //         title: "Cập nhật giỏ hàng thất bại!",
  //         text: "Giỏ hàng chưa được cập nhật! Kiểm tra API!",
  //         icon: "error",
  //         timer: 1500,
  //         timerProgressBar: true,
  //         showConfirmButton: false,
  //       }).then((result) => {
  //         if (result.dismiss === Swal.DismissReason.timer) {
  //           console.log("I was closed by the timer");
  //         }
  //       });
  //     });
  // };

  // const updateItemDecreaseQuantity = async (item, sellerId) => {
  //   if (item.quantity > 1) {
  //     const data = {
  //       sellerId: sellerId,
  //       variantId: item.variantId,
  //       quantity: -1,
  //     };

  //     // console.log(data);

  //     await apiCart
  //       .addToCart(data, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           // "Content-Type": "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         const data = res.data.result;

  //         // console.log(data);

  //         Swal.fire({
  //           title: "Xóa thành công",
  //           text: "Sản phẩm đã được xóa khỏi giỏ hàng của bạn",
  //           icon: "success",
  //           timer: 1500,
  //           timerProgressBar: true,
  //           showConfirmButton: false,
  //         }).then((result) => {
  //           if (result.dismiss === Swal.DismissReason.timer) {
  //             console.log("I was closed by the timer");
  //           }
  //         });

  //         const sorted1 = [...data].sort(
  //           (a, b) =>
  //             new Date(b.itemResponses.updatedAt) -
  //             new Date(a.itemResponses.updatedAt)
  //         );

  //         // console.log(sorted1);

  //         const sorted2 = [...sorted1].sort(
  //           (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  //         );

  //         console.log(sorted2);

  //         dispatch(SET_CART_FROM_API(sorted2));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         Swal.fire({
  //           title: "Cập nhật giỏ hàng thất bại!",
  //           text: "Giỏ hàng chưa được cập nhật! Kiểm tra API!",
  //           icon: "error",
  //           timer: 1500,
  //           timerProgressBar: true,
  //           showConfirmButton: false,
  //         }).then((result) => {
  //           if (result.dismiss === Swal.DismissReason.timer) {
  //             console.log("I was closed by the timer");
  //           }
  //         });
  //       });
  //   } else {
  //     await apiCart
  //       .deleteItem(item.variantId, {
  //         headers: {
  //           Authorization: `Bearer ${accessToken}`,
  //           "Content-Type": "application/json",
  //         },
  //       })
  //       .then((res) => {
  //         const data = res.data.result;

  //         console.log(data);

  //         toast.success(`Cập nhật giỏ hàng!`, {
  //           position: "top-right",
  //           autoClose: 2000,
  //           hideProgressBar: false,
  //           closeOnClick: true,
  //           pauseOnHover: true,
  //           draggable: true,
  //           style: {
  //             top: "-50%",
  //             transform: "translateY(50%)",
  //             marginRight: "2%",
  //             width: "fit-content",
  //           },
  //         });

  //         const sorted1 = [...data].sort(
  //           (a, b) =>
  //             new Date(b.itemResponses.updatedAt) -
  //             new Date(a.itemResponses.updatedAt)
  //         );

  //         console.log(sorted1);

  //         const sorted2 = [...sorted1].sort(
  //           (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
  //         );

  //         console.log(sorted2);

  //         dispatch(SET_CART_FROM_API(sorted2));
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //         Swal.fire({
  //           title: "Xóa thất bại!",
  //           text: "Xóa sản phẩm khỏi giỏ hàng thất bại!",
  //           icon: "error",
  //           timer: 1500,
  //           timerProgressBar: true,
  //           showConfirmButton: false,
  //         }).then((result) => {
  //           if (result.dismiss === Swal.DismissReason.timer) {
  //             console.log("I was closed by the timer");
  //           }
  //         });
  //       });
  //   }
  // };

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

  const handleAddToCheckOut = (checked, seller, item) => {
    console.log(checked);
    if (checked) dispatch(ADD_CHECKOUT({ seller, item }));
    else dispatch(REMOVE_CHECKOUT({ seller, item }));

    console.log(checkouts);
  };

  const handleCheckout = () => {
    // console.log("checkout");
    navigate("/checkout");
  };

  const handleChange = async (e, item, sellerId) => {
    console.log(e);
    const newValue = parseInt(e.target.value, 10);
    if (!isNaN(newValue)) {
      setValue(newValue);

      const data = {
        sellerId: sellerId,
        variantId: item.variantId,
        quantity: newValue - item.quantity,
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

          console.log(data);

          toast.success(`Cập nhật giỏ hàng!`, {
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

          const sorted1 = [...data].sort(
            (a, b) =>
              new Date(b.itemResponses.updatedAt) -
              new Date(a.itemResponses.updatedAt)
          );

          // console.log(sorted1);

          const sorted2 = [...sorted1].sort(
            (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
          );

          // console.log(sorted2);

          dispatch(SET_CART_FROM_API(sorted2));
        })
        .catch((err) => {
          console.log(err);
          // Swal.fire({
          //   title: "Cập nhật giỏ hàng thất bại!",
          //   text: "Giỏ hàng chưa được cập nhật! Kiểm tra API!",
          //   icon: "error",
          //   timer: 1500,
          //   timerProgressBar: true,
          //   showConfirmButton: false,
          // }).then((result) => {
          //   if (result.dismiss === Swal.DismissReason.timer) {
          //     console.log("I was closed by the timer");
          //   }
          // });
        });
    } else if (e.target.value === "") {
      setValue("");
    }
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
                  <Link to={`/seller/page/${seller.sellerId}`}>
                    <span className="text-orange-500">
                      {seller.sellerUsername}
                    </span>
                  </Link>
                </th>
                <th className="p-2 text-left">Đơn Giá</th>
                <th className="p-2 text-left">Số Lượng</th>
                <th className="p-2 text-left">Số Tiền</th>
                <th className="p-2 text-left">Thao Tác</th>
              </tr>
            </thead>
            <tbody>
              {seller.itemResponses.map((item, index) => {
                const total =
                  ((item.salePrice > 0 ? item.salePrice : item.price) -
                    item.discount) *
                  item.quantity;
                return (
                  <tr key={index} className="border-b">
                    <td className="p-2 flex items-center w-[600px]">
                      <input
                        type="checkbox"
                        className="mr-2"
                        onClick={(e) =>
                          handleAddToCheckOut(e.target.checked, seller, item)
                        }
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
                      </button>
                    </td>
                    {item.salePrice > 0 ? (
                      <td className="p-2">
                        <span className="text-gray-500 line-through">
                          {item.price.toLocaleString("de-DE")} đ
                        </span>
                        <br />
                        {item.discount > 0 && (
                          <span className="text-orange-500 font-semibold">
                            - {item.discount.toLocaleString("de-DE")} đ
                          </span>
                        )}
                        <br />
                        <span className="text-red-600 font-bold">
                          {item.salePrice.toLocaleString("de-DE")} đ
                        </span>
                      </td>
                    ) : (
                      <td className="p-2">
                        {item.discount > 0 && (
                          <span className="text-orange-500 font-semibold">
                            - {item.discount.toLocaleString("de-DE")} đ
                          </span>
                        )}
                        <br />
                        <span className="text-red-600 font-bold">
                          {item.price.toLocaleString("de-DE")} đ
                        </span>
                      </td>
                    )}

                    <td className="p-2">
                      <div className="flex items-center">
                        {/* <button
                          onClick={() =>
                            updateItemDecreaseQuantity(item, seller.sellerId)
                          }
                          className="bg-gray-200 px-2 py-1 rounded-l"
                        >
                          -
                        </button> */}
                        {/* <span className="px-4 py-1 border-t border-b">
                          {item.quantity}
                        </span> */}
                        <input
                          type="number"
                          defaultValue={item.quantity}
                          onChange={(e) =>
                            handleChange(e, item, seller.sellerId)
                          }
                          min={1}
                          max={item.stock}
                          className="w-24 text-center px-2 py-1 rounded-lg border border-gray-300 focus:border-blue-500
                          focus:outline-none appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          onInput={(e) => {
                            let val = parseInt(e.target.value, 10);
                            const min = parseInt(e.target.min, 10);
                            const max = parseInt(e.target.max, 10);

                            if (isNaN(val)) {
                              e.target.value = "";
                            } else if (val > max) {
                              e.target.value = max;
                            } else if (val < min) {
                              e.target.value = min;
                            }
                          }}
                        />
                        {/* <button
                          onClick={() =>
                            updateItemIncreaseQuantity(item, seller.sellerId)
                          }
                          disabled={item.stock <= item.quantity}
                          className="bg-gray-200 px-2 py-1 rounded-r"
                        >
                          +
                        </button> */}
                      </div>
                    </td>
                    <td className="p-2 font-semibold text-red-700">
                      {total.toLocaleString("de-DE")}đ
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
                );
              })}
            </tbody>
          </table>
        </div>
      ))}
      <div className="mt-4 text-right">
        <p className="text-lg font-bold text-red-500">
          Tổng cộng: {(totalSale - totalDiscount).toLocaleString("de-DE")}đ
        </p>
        <p className="text-md font-semibold text-orange-500">
          Flashsale: {totalDiscount.toLocaleString("de-DE")}đ
        </p>
        <p className="text-sm text-gray-500">
          Tiết kiệm:{" "}
          {(totalAmount - totalSale + totalDiscount).toLocaleString("de-DE")}đ
        </p>
      </div>
      {/* <div className="mt-2 text-left">
        <p className="text-blue-500">
          <span className="text-red-500">🎫</span> Voucher giảm đến 41k{" "}
          <span className="text-blue-500">Xem thêm voucher</span>
        </p>
        <p className="text-blue-500">
          <span className="text-green-500">🚚</span> Giảm ₫300.000 phí vận
          chuyển đơn từ ₫0; Giảm ₫500.000 phí vận chuyển đơn từ ₫500.000{" "}
          <span className="text-blue-500">Tìm hiểu thêm</span>
        </p>
      </div> */}
      <div className="container mx-auto p-4">
        <button
          onClick={handleCheckout}
          className={`w-full text-white py-3 rounded-lg font-semibold ${
            checkouts.length > 0
              ? "bg-orange-500 hover:bg-orange-600"
              : "bg-gray-500"
          }  
           transition duration-200`}
          disabled={checkouts.length <= 0}
        >
          Thanh Toán
        </button>
      </div>
    </div>
  );
}

export default CartItem;
