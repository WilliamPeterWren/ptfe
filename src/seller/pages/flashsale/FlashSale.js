import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { imageUrl } from "../../../api/config";
import apiFlashSale from "../../../api/apiFlashSale";

import FlashSaleUpdateModal from "./modal/FlashSaleUpdateModal";

function FlashSale() {
  const accessToken = Cookies.get("accessToken");

  const [flashsales, setFlashsales] = useState([]);
  const [currentFlashsale, setCurrentFlashsales] = useState();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [openModal, setOpenModal] = useState(false);
  const [productId, setProductId] = useState(null);
  const [flashSaleProductName, setFlashsaleProductName] = useState(null);

  const [products, setProducts] = useState([]);
  const [currentDiscount, setCurrentDiscount] = useState(null);

  const getListFlashsale = async () => {
    try {
      setLoading(true);
      const res = await apiFlashSale.sellerGetAll({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data.result;
      console.log(data);
      setFlashsales(data);
    } catch (err) {
      console.error("Failed to fetch flash sales:", err);
      setError("Failed to load flash sales. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListFlashsale();
  }, []);

  const getProductByFlashsaleId = async (id) => {
    // console.log("id" + id);
    // console.log("token: " + accessToken);
    setCurrentFlashsales(id);
    try {
      const res = await apiFlashSale.sellerGetProductByFlashsaleId(id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data.content;
      // console.log(data);
      setLoading(!loading);
      setProducts(data);

      if (data.length === 0) {
        Swal.fire({
          title: "Chưa đăng ký sản phẩm!",
          text: "Bạn không có sản phẩm nào trong chương trình flashsale này!",
          icon: "warning",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Chưa đăng ký sản phẩm!",
        text: "Bạn không có sản phẩm nào trong chương trình flashsale này!",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  useEffect(() => {
    if (currentFlashsale !== undefined && loading) {
      // console.log(currentFlashsale);
      getProductByFlashsaleId(currentFlashsale);
    }
  }, [loading, currentFlashsale]);

  const handleRemoveProductFromFlashsale = async (id) => {
    console.log("product id: " + id + " flashsaleid: " + currentFlashsale);
    setProductId(id);
    const data = {
      flashsaleId: currentFlashsale,
      productId,
    };

    Swal.fire({
      title: "Bạn có chắn muốn xóa?",
      text: "Xóa sản phẩm khỏi flashsale!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Vẫn xóa!",
      cancelButtonText: "Không xóa!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        toast.success(`Bạn đã xóa sản phẩm khỏi flashsale`, {
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

        const accessToken = Cookies.get("accessToken");

        try {
          const res = await apiFlashSale.sellerRemoveProductFromFlashsale(
            data,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );

          if (res.status === 200) {
            const updatedProducts = products.filter(
              (product) => product.id !== id
            );
            setProducts(updatedProducts);
          }
        } catch (error) {
          console.log(error);
        }

        Swal.fire({
          title: "Đã xóa!",
          text: "Sản phẩm bị xóa khỏi Flashsale",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Không xóa!",
          text: "Sản phẩm còn trong Flashsale!",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    });
  };

  const handleUpdateProductFromFlashsale = async (product) => {
    console.log(
      "product id: " +
        product.id +
        " name: " +
        product.productName +
        " flashsaleid: " +
        currentFlashsale
    );
    setProductId(product.id);
    setFlashsaleProductName(product.productName);
    setCurrentDiscount(product.discount);
    setOpenModal(!openModal);

    try {
      const res = await apiFlashSale.sellerGetProductByFlashsaleId(
        currentFlashsale,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = res.data.content;
      // console.log(data);
      setProducts(data);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Chưa đăng ký sản phẩm!",
        text: "Bạn không có sản phẩm nào trong chương trình flashsale này!",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  if (loading) {
    return (
      <div className="w-4/5 mx-auto p-4 text-center">
        <p className="text-lg text-gray-700">Loading flash sales...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-4/5 mx-auto p-4 text-center">
        <p className="text-lg text-red-600">{error}</p>
      </div>
    );
  }

  if (flashsales.length === 0) {
    return (
      <div className="w-4/5 mx-auto p-4 text-center">
        <p className="text-lg text-gray-700">
          No flash sales available at the moment.
        </p>
      </div>
    );
  }

  return (
    <div className="w-4/5 mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Danh sách chương trình flashsale hiện có
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashsales.map((sale, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300"
          >
            <h2 className="text-xl font-semibold text-indigo-700 mb-2">
              {sale.name}
            </h2>
            <hr className="border border-red-500 w-full" />
            <p className="text-gray-600 text-sm mb-1 mt-2">
              <span className="font-medium">Bắt đầu:</span>{" "}
              {new Date(sale.startedAt).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-medium">Kết thúc:</span>{" "}
              {new Date(sale.expiredAt).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </p>

            <button
              onClick={() => getProductByFlashsaleId(sale.id)}
              className="mt-4 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
            >
              Danh sách sản phẩm
            </button>
          </div>
        ))}
      </div>
      <div className="mt-4">
        {products?.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-2 px-4 border-b text-left max-w-[500px]">
                    Tên
                  </th>
                  <th className="py-2 px-4 border-b text-left">Phân loại</th>
                  <th className="py-2 px-4 border-b text-left">Giá</th>
                  <th className="py-2 px-4 border-b text-left">Khuyến mãi</th>
                  <th className="py-2 px-4 border-b text-center">•••</th>
                </tr>
              </thead>
              <tbody>
                {products?.map((product, index) => {
                  const imgUrl =
                    imageUrl + "product/" + product.productImages[0];
                  return (
                    <tr key={index} className="hover:bg-red-50 ">
                      <td className="py-2 px-4 border-b align-middle">
                        <div className="flex items-center">
                          <img
                            src={imgUrl}
                            alt={product.productName}
                            className="w-20 h-20 mr-2 object-cover rounded"
                            onError={(e) => {
                              const target = e.target;
                              target.onerror = null;
                              const retryInterval = 2000;
                              let retryCount = 0;
                              const maxRetries = 5;

                              const retryLoad = () => {
                                if (retryCount < maxRetries) {
                                  retryCount++;
                                  target.src = imgUrl + `?retry=${retryCount}`;
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
                          <span className="font-medium text-gray-800 break-words max-w-[24rem]">
                            {product.productName}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b align-middle">
                        <div className="font-semibold text-gray-800 text-sm capitalize">
                          {product.variants[0].variantName.slice(0, 20)}
                        </div>
                        <div className="text-sm text-gray-600">
                          Kho:{" "}
                          <span className="font-medium text-green-600">
                            {product.variants[0].stock.toLocaleString()}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b align-middle">
                        <div className="text-sm text-gray-600">
                          <span className="font-medium text-indigo-600">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.variants[0].price)}
                          </span>
                          <br />
                          <span className="font-medium text-indigo-600">
                            {new Intl.NumberFormat("vi-VN", {
                              style: "currency",
                              currency: "VND",
                            }).format(product.variants[0]?.salePrice)}
                          </span>
                        </div>
                      </td>
                      <td className="py-2 px-4 border-b align-middle">
                        <div className="text-sm text-orange-600 font-semibold">
                          {product.discount.toLocaleString()} đ
                        </div>
                      </td>

                      <td className="py-2 px-4 border-b align-middle relative">
                        <button
                          className="border border-blue-500 p-2 mr-2 rounded hover:border-orange-600"
                          onClick={() =>
                            handleUpdateProductFromFlashsale(product)
                          }
                        >
                          Cập nhật
                        </button>
                        <button
                          className="border border-blue-500 p-2 mr-2 rounded hover:border-orange-600"
                          onClick={() =>
                            handleRemoveProductFromFlashsale(product.id)
                          }
                        >
                          Xóa
                        </button>

                        {openModal && (
                          <FlashSaleUpdateModal
                            setOpenModal={setOpenModal}
                            openModal={openModal}
                            setLoading={setLoading}
                            loading={loading}
                            currentDiscount={currentDiscount}
                            productId={productId}
                            flashSaleId={currentFlashsale}
                            flashSaleProductName={flashSaleProductName}
                          />
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-blue-500 hover:text-orange-500">
            Click vào xem danh sách sản phẩm
          </div>
        )}
      </div>
    </div>
  );
}

export default FlashSale;
