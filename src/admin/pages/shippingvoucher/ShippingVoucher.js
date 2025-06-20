import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import Pagination from "./Pagination";

import apiShippingVoucher from "../../../api/apiShippingVoucher";

import formatForDatetimeLocal from "../../../utils/formatForDatetimeLocal";

function ShippingVoucher() {
  const accessToken = Cookies.get("accessToken");

  const [shippings, setShippingVouchers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [shippingName, setShippingVoucherName] = useState(null);

  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [shippingValue, setShippingVoucherValue] = useState(5000);
  const [shippingCount, setShippingVoucherCount] = useState(1);
  const [expiredAt, setExpiredAt] = useState(null);

  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    now.setSeconds(0, 0);
    return now.toISOString().slice(0, 16);
  };

  const getListShippingVoucher = async () => {
    try {
      setLoading(!loading);
      const res = await apiShippingVoucher.getAll();
      const data = res.data;
      console.log(data);
      setShippingVouchers(data);
    } catch (err) {
      console.error("Failed to fetch flash sales:", err);
      // setError("Failed to load flash sales. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      getListShippingVoucher();
    }
  }, [loading]);

  const handleAddShippingVoucher = async () => {
    console.log("add flash sale");
    const dataCreateShippingVoucher = {
      name: shippingName,
      price: shippingValue,
      expiredAt,
      count: shippingCount,
    };

    console.log(dataCreateShippingVoucher);

    try {
      const res = await apiShippingVoucher.create(
        shippingCount,
        dataCreateShippingVoucher,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = res.data;
      console.log(data);
      console.log(res);

      Swal.fire({
        title: "Thêm shippingVoucher mới!",
        text: "Chương trình shippingVoucher mới đã được thêm!",
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

      setShippingVouchers((prev) => [...prev, data]);
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

  const handleDeleteShippingVoucher = async (id) => {
    console.log("delete shippingVoucher");
    Swal.fire({
      title: "Xóa khuyến mãi này?",
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
          const res = await apiShippingVoucher.delete(id, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = res;
          console.log(data);
          toast.success(`Bạn đã xóa shippingVoucher`, {
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
            text: "Chương trình khuyến mãi bị xóa!",
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
          // setShippingVouchers((prev) => prev.filter((item) => item.id !== id));
          // window.location.reload();
        } catch (error) {
          console.log(error);
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
            text: "Đã tạm thời khóa khuyến mãi!",
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
          text: "Chương trình khuyến mãi vẫn diễn ra!",
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

  const updateShippingVoucher = (ship) => {
    setIsUpdating(!isUpdating);
    console.log(ship);

    setShippingVoucherName(ship.name);
    setShippingVoucherValue(ship.price);
    setShippingVoucherCount(ship.count);
    setExpiredAt(ship.expiredAt);

    setUpdateId(ship.id);

    const updateShippingVoucherData = {
      name: shippingName,
      price: shippingValue,
    };

    console.log(updateShippingVoucherData);
  };

  const handleUpdateShippingVoucher = async () => {
    const updateShippingVoucherData = {
      name: shippingName,
      price: shippingValue,
      expiredAt,
    };

    console.log(updateShippingVoucherData);

    try {
      const res = await apiShippingVoucher.update(
        updateId,
        shippingCount,
        updateShippingVoucherData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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
      setShippingVouchers((prev) =>
        prev.filter((item) => item.id !== updateId)
      );
      setShippingVouchers((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActiveShippingVoucher = async (id) => {
    const updateShippingVoucherData = {
      available: true,
    };

    console.log(updateShippingVoucherData);

    try {
      const res = await apiShippingVoucher.update(
        id,
        0,
        updateShippingVoucherData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
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
      setShippingVouchers((prev) => prev.filter((item) => item.id !== id));
      setShippingVouchers((prev) => [...prev, data]);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-4/5 mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Danh sách khuyến mãi giao hàng hiện có
      </h1>
      <div className="mb-4">
        <button
          className="border border-blue-500 rounded p-2 hover:bg-blue-500 hover:text-white"
          onClick={() => setIsAdding(!isAdding)}
        >
          Thêm Voucher
        </button>
        {isAdding && (
          <div className="mt-4 p-2 border border-green-500 rounded-lg">
            <p className="text-yellow-700 font-semibold underline">
              Thêm mới Khuyến mãi vận chuyển
            </p>
            <div className="mt-4 ">
              <label htmlFor="shippingname" className="mr-2">
                Tên
              </label>
              <input
                id="shippingname"
                type="text"
                placeholder="Tên khuyến mãi vận chuyển"
                className="p-2 w-64 rounded-lg border border-blue-500"
                onChange={(e) => setShippingVoucherName(e.target.value)}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="shippingvalue" className="mr-2">
                Giá
              </label>
              <input
                className="p-2 w-64 rounded-lg border border-blue-500"
                id="shippingvalue"
                type="number"
                placeholder="Phí giao hàng"
                onChange={(e) => setShippingVoucherValue(e.target.value)}
                min={5000}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="startedAt" className="mr-2">
                Hết hạn
              </label>
              <input
                type="datetime-local"
                min={getCurrentDateTimeLocal()}
                onChange={(e) => {
                  const local = new Date(e.target.value);
                  const utcISOString = local.toISOString();
                  setExpiredAt(utcISOString);
                }}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="shippingcount" className="mr-2">
                Số lượng
              </label>
              <input
                className="p-2 w-64 rounded-lg border border-blue-500"
                id="shippingcount"
                type="number"
                placeholder="Số lượng khuyến mãi"
                onChange={(e) => setShippingVoucherCount(e.target.value)}
                min={1}
                defaultValue={shippingCount}
              />
            </div>

            <button
              className="mt-4 p-2 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
              onClick={handleAddShippingVoucher}
            >
              Thêm mới
            </button>
          </div>
        )}
        {isUpdating && (
          <div className="mt-4 p-2 border border-green-500 rounded-lg">
            <p className="text-yellow-700 font-semibold underline">
              Chỉnh sửa ShippingVoucher
            </p>
            <div className="mt-4 ">
              <label htmlFor="shippingname" className="mr-2">
                Tên
              </label>
              <input
                id="shippingname"
                type="text"
                placeholder="Tên chương trình shippingVoucher"
                className="p-2 rounded-lg border border-blue-500"
                onChange={(e) => setShippingVoucherName(e.target.value)}
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
                className="p-2 w-64 rounded-lg border border-blue-500"
                onChange={(e) => setShippingVoucherValue(e.target.value)}
                min={5000}
              />
            </div>

            <div className="mt-4 ">
              <label htmlFor="startedAt" className="mr-2">
                Hết hạn
              </label>
              <input
                type="datetime-local"
                min={getCurrentDateTimeLocal()}
                onChange={(e) => {
                  const local = new Date(e.target.value);
                  const utcISOString = local.toISOString();
                  setExpiredAt(utcISOString);
                }}
                value={formatForDatetimeLocal(expiredAt)}
              />
            </div>

            <div className="mt-4 ">
              <label htmlFor="shippingcount" className="mr-2">
                Số lượng
              </label>
              <input
                className="p-2 w-64 rounded-lg border border-blue-500"
                id="shippingcount"
                type="number"
                placeholder="Số lượng khuyến mãi"
                onChange={(e) => setShippingVoucherCount(e.target.value)}
                min={1}
                defaultValue={shippingCount}
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
              onClick={handleUpdateShippingVoucher}
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
              <h2 className="text-xl font-semibold text-indigo-700 mb-2 capitalize">
                {ship.name}
              </h2>
              {!ship?.available ? (
                <button
                  className="border border-white rounded p-2 text-white hover:border-blue-500"
                  onClick={() => handleActiveShippingVoucher(ship?.id)}
                >
                  Kích hoạt
                </button>
              ) : (
                <span className="ml-4 font-semibold text-indigo-700 mb-2">
                  x{ship?.count}
                </span>
              )}
            </div>

            <h2 className="text-lg font-semibold text-orange-700 mb-2">
              Phí vận chuyển : {ship.price.toLocaleString()} đ
            </h2>

            <h2 className="text-lg font-semibold text-orange-700 mb-2">
              Hạn cuối :{" "}
              {new Date(ship.expiredAt).toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}{" "}
              đ
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
                onClick={() => handleDeleteShippingVoucher(ship.id)}
                disabled={!ship?.available}
              >
                Xóa
              </button>{" "}
              <button
                className={`border border-blue-500 ${
                  ship?.available && "hover:bg-blue-500 hover:text-white"
                }  p-2 rounded`}
                onClick={() => updateShippingVoucher(ship)}
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

export default ShippingVoucher;
