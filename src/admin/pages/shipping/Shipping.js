import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import apiShipping from "../../../api/apiShipping";
import Pagination from "./Pagination";

function Shipping() {
  const accessToken = Cookies.get("accessToken");

  const [shippings, setShippings] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [shippingName, setShippingName] = useState(null);

  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [shippingValue, setShippingValue] = useState(5000);

  const getListShipping = async () => {
    try {
      setLoading(!loading);
      const res = await apiShipping.getAllByAdmin();
      const data = res.data;
      console.log(data);
      setShippings(data);
      setLoading(!loading);
    } catch (err) {
      console.error("Failed to fetch shipping fee:", err);
      setError("Failed to load shipping fee. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListShipping();
  }, []);

  const handleAddShipping = async () => {
    console.log("add shipping fee");
    const dataCreateShipping = {
      name: shippingName,
      value: shippingValue,
    };

    console.log(dataCreateShipping);

    try {
      const res = await apiShipping.create(dataCreateShipping, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      console.log(data);
      console.log(res);

      Swal.fire({
        title: "Thêm shipping mới!",
        text: "Chương trình shipping mới đã được thêm!",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
      setIsAdding(!isAdding);

      setShippings((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
      Swal.fire({
        title: "Thêm thất bại!",
        text: "Kiểm tra thời gian bắt đầu và kết thúc!",
        icon: "warning",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });
    }
  };

  const handleDeleteShipping = async (id) => {
    setLoading(!loading);

    console.log("delete shipping");
    Swal.fire({
      title: "Xóa shipping này?",
      text: "Bạn không thể đảo ngược quá trình này!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Vẫn xóa!",
      cancelButtonText: "Không xóa!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiShipping.delete(id, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = res;
          console.log(data);
          toast.success(`Bạn đã xóa shipping`, {
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

          Swal.fire({
            title: "Đã xóa!",
            text: "Chương trình shipping bị xóa!",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
          setLoading(!loading);
          // setShippings((prev) => prev.filter((item) => item.id !== id));
          window.location.reload();
        } catch (error) {
          toast.warning(`Không thể xóa!`, {
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

          Swal.fire({
            title: "Không thể xóa!",
            text: "Đã có người bán đăng ký!",
            icon: "warning",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: "Không xóa!",
          text: "Chương trình shipping vẫn diễn ra!",
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

  const updateShipping = (ship) => {
    setIsUpdating(!isUpdating);
    console.log(ship);

    setShippingName(ship.name);
    setShippingValue(ship.value);

    setUpdateId(ship.id);

    const updateShippingData = {
      name: shippingName,
      value: shippingValue,
    };

    console.log(updateShippingData);
  };

  const handleUpdateShipping = async () => {
    const updateShippingData = {
      name: shippingName,
      value: shippingValue,
    };

    console.log(updateShippingData);

    try {
      const res = await apiShipping.update(updateId, updateShippingData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      console.log(data);

      Swal.fire({
        title: "Cập nhật thành công!",
        text: "Phí giao hàng được cập nhật!",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });

      setIsUpdating(!isUpdating);
      setShippings((prev) => prev.filter((item) => item.id !== updateId));
      setShippings((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActiveShipping = async (id) => {
    const updateShippingData = {
      available: true,
    };

    console.log(updateShippingData);

    try {
      const res = await apiShipping.update(id, updateShippingData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      console.log(data);
      console.log(res);

      Swal.fire({
        title: "Cập nhật thành công!",
        text: "Phí giao hàng được cập nhật!",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          console.log("I was closed by the timer");
        }
      });

      // setIsUpdating(!isUpdating);
      setShippings((prev) => prev.filter((item) => item.id !== id));
      setShippings((prev) => [...prev, data]);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return (
      <div className="w-4/5 mx-auto p-4 text-center">
        <p className="text-lg text-gray-700">Loading shipping fee...</p>
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

  // if (shippings.length === 0) {
  //   return (
  //     <div className="w-4/5 mx-auto p-4 text-center">
  //       <p className="text-lg text-gray-700">
  //         No flash sales available at the moment.
  //       </p>
  //     </div>
  //   );
  // }

  return (
    <div className="w-4/5 mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Danh sách phương thức giao hàng hiện có
      </h1>
      <div className="mb-4">
        <button
          className="border border-blue-500 rounded p-2 hover:bg-blue-500 hover:text-white"
          onClick={() => setIsAdding(!isAdding)}
        >
          Thêm shipping
        </button>
        {isAdding && (
          <div className="mt-4 p-2 border border-green-500 rounded-lg">
            <p className="text-yellow-700 font-semibold underline">
              Thêm mới Shipping
            </p>
            <div className="mt-4 ">
              <label htmlFor="shippingname" className="mr-2">
                Tên
              </label>
              <input
                id="shippingname"
                type="text"
                placeholder="Tên shipping"
                className="p-2 rounded-lg border border-blue-500"
                onChange={(e) => setShippingName(e.target.value)}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="shippingvalue" className="mr-2">
                Giá
              </label>
              <input
                className="p-2 rounded-lg border border-blue-500"
                id="shippingvalue"
                type="number"
                placeholder="Phí giao hàng"
                onChange={(e) => setShippingValue(e.target.value)}
                min={5000}
              />
            </div>

            <button
              className="mt-4 p-2 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
              onClick={handleAddShipping}
            >
              Thêm shipping mới
            </button>
          </div>
        )}
        {isUpdating && (
          <div className="mt-4 p-2 border border-green-500 rounded-lg">
            <p className="text-yellow-700 font-semibold underline">
              Chỉnh sửa Shipping
            </p>
            <div className="mt-4 ">
              <label htmlFor="shippingname" className="mr-2">
                Tên
              </label>
              <input
                id="shippingname"
                type="text"
                placeholder="Tên chương trình shipping"
                className="p-2 rounded-lg border border-blue-500"
                onChange={(e) => setShippingName(e.target.value)}
                value={shippingName}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="createdAt" className="mr-2">
                Giá
              </label>
              <input
                value={shippingValue}
                id="shippingvalue"
                type="number"
                onChange={(e) => setShippingValue(e.target.value)}
                min={5000}
              />
            </div>

            <button
              className="mt-4 p-2 border border-orange-500 rounded hover:bg-orange-500 hover:text-white mr-8"
              onClick={() => setIsUpdating(!isUpdating)}
            >
              Hủy
            </button>

            <button
              className="ml-8 mt-4 p-2 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
              onClick={handleUpdateShipping}
            >
              Cập nhật
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {shippings.map((ship, index) => (
          <div
            key={index}
            className={`${
              ship?.available ? "bg-white" : "bg-red-500"
            }  rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                {ship.name}
              </h2>
              {!ship?.available && (
                <button
                  className="border border-white rounded p-2 text-white hover:border-blue-500"
                  onClick={() => handleActiveShipping(ship.id)}
                >
                  Kích hoạt
                </button>
              )}
            </div>

            <h2 className="text-lg font-semibold text-orange-700 mb-2">
              Phí vận chuyển : {ship.value.toLocaleString()} đ
            </h2>
            <hr className="border border-red-500 w-full" />
            <p className="text-gray-600 text-sm mb-1 mt-2">
              <span className="font-medium">Ngày tạo:</span>{" "}
              {new Date(ship.createdAt).toLocaleString("vi-VN", {
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
              <span className="font-medium">Cập nhật lần cuối:</span>{" "}
              {new Date(ship.updatedAt).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}
            </p>

            <div className="flex justify-between mt-4">
              <button
                className={`border border-red-500 ${
                  ship?.available && "hover:bg-red-500 hover:text-white"
                }  p-2 rounded`}
                onClick={() => handleDeleteShipping(ship.id)}
                disabled={!ship?.available}
              >
                Xóa
              </button>{" "}
              <button
                className={`border border-blue-500 ${
                  ship?.available && "hover:bg-blue-500 hover:text-white"
                }  p-2 rounded`}
                onClick={() => updateShipping(ship)}
                disabled={!ship?.available}
              >
                Sửa
              </button>{" "}
            </div>
          </div>
        ))}
      </div>

      <Pagination
        setCurrentPage={setCurrentPage}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default Shipping;
