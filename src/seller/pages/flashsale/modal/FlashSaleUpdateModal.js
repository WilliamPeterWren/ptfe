import { useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import apiFlashSale from "../../../../api/apiFlashSale";

function FlashSaleUpdateModal(props) {
  const {
    openModal,
    setOpenModal,
    loading,
    setLoading,
    currentDiscount,
    productId,
    flashSaleId,
    flashSaleProductName,
  } = props;

  const [price, setPrice] = useState(1000);

  const handleChangePrice = (e) => {
    setPrice(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("click 00");
    e.preventDefault();
    const accessToken = Cookies.get("accessToken");

    const data = {
      productId,
      price: parseInt(price),
    };
    if (price <= 1000) {
      return;
    }
    console.log(data);
    await apiFlashSale
      .updateFlashSale(flashSaleId, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setLoading(!loading);
        setOpenModal(!openModal);
        Swal.fire({
          title: "Cập nhật flashsale thành công",
          text: "Khuyến mãi được cập nhật thành công",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center border-b border-red-400 pb-4">
          Cập nhật FlashSale
        </h2>

        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-left">
          {flashSaleProductName}
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="discount"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Số tiền giảm hiện tại
            </label>
            <input
              type="number"
              id="discount"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out"
              placeholder="e.g., Smartphones"
              defaultValue={currentDiscount}
              min={1000}
              required
              disabled={true}
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="price"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Số tiền giảm (tối thiểu 1000)
            </label>
            <input
              type="number"
              id="price"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out"
              placeholder="e.g., Smartphones"
              defaultValue={1000}
              onChange={handleChangePrice}
              min={1000}
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setOpenModal(!openModal)}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200"
            >
              Cập nhật khuyến mãi Flashsale
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes scaleIn {
          from {
            transform: scale(0.95);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
        .animate-fade-in {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
}

export default FlashSaleUpdateModal;
