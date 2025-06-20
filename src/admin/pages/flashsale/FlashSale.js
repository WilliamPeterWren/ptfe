import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import formatForDatetimeLocal from "../../../utils/formatForDatetimeLocal";

import apiFlashSale from "../../../api/apiFlashSale";
import Pagination from "./Pagination";

function FlashSale() {
  const accessToken = Cookies.get("accessToken");

  const [flashsales, setFlashsales] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [flashsaleName, setFlashsaleName] = useState(null);
  const [startedAt, setStartedAt] = useState(null);
  const [expiredAt, setExpiredAt] = useState(null);
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);

  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    now.setSeconds(0, 0);
    return now.toISOString().slice(0, 16);
  };

  const getListFlashsale = async () => {
    try {
      // setLoading(!loading);
      const res = await apiFlashSale.adminGetAll({
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;

      const sorted2 = [...data].sort(
        (a, b) => new Date(b.expiredAt) - new Date(a.expiredAt)
      );

      console.log(sorted2);
      setFlashsales(sorted2);
    } catch (err) {
      console.error("Failed to fetch flash sales:", err);
      setError("Failed to load flash sales. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListFlashsale();
  }, [loading]);

  const handleAddFlashsale = async () => {
    console.log("add flash sale");
    const dataCreateFlashsale = {
      name: flashsaleName,
      startedAt: startedAt,
      expiredAt: expiredAt,
    };

    console.log(dataCreateFlashsale);

    try {
      const res = await apiFlashSale.create(dataCreateFlashsale, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data.result;
      console.log(data);

      Swal.fire({
        title: "Thêm flashsale mới!",
        text: "Chương trình flashsale mới đã được thêm!",
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

      setFlashsales((prev) => [...prev, data]);
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

  const handleDeleteFlashsale = async (id) => {
    console.log("delete flashsale");
    Swal.fire({
      title: "Xóa flashsale này?",
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
          const res = await apiFlashSale.delete(id, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = res;
          // console.log(data);
          toast.success(`Bạn đã xóa flashsale`, {
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
            text: "Chương trình flashsale bị xóa!",
            icon: "success",
            timer: 1500,
            timerProgressBar: true,
            showConfirmButton: false,
          }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
              console.log("I was closed by the timer");
            }
          });

          // setFlashsales((prev) => prev.filter((item) => item.id !== id));
          // setFlashsales((prev) => [...prev, data]);
          setLoading(!loading);
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
          text: "Chương trình flashsale vẫn diễn ra!",
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

  const updateFlashsale = (sale) => {
    setIsUpdating(!isUpdating);
    console.log(sale);

    setFlashsaleName(sale.name);
    setExpiredAt(sale.expiredAt);
    setStartedAt(sale.startedAt);
    setUpdateId(sale.id);

    const updateFlashsaleData = {
      name: flashsaleName,
      expiredAt,
      startedAt,
    };

    console.log(updateFlashsaleData);
  };

  const handleUpdateFlashsale = async () => {
    const updateFlashsaleData = {
      name: flashsaleName,
      expiredAt,
      startedAt,
    };

    console.log(updateFlashsaleData);

    try {
      const res = await apiFlashSale.update(updateId, updateFlashsaleData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data.result;
      console.log(data);

      Swal.fire({
        title: "Cập nhật thành công!",
        text: "Chương trình flashsale được cập nhật!",
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
      setFlashsales((prev) => prev.filter((item) => item.id !== updateId));
      setFlashsales((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActiveFlashsale = async (id) => {
    const updateFlashsaleData = {
      available: true,
    };

    console.log(updateFlashsaleData);

    try {
      const res = await apiFlashSale.update(id, updateFlashsaleData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data.result;
      console.log(data);
      // console.log(res);

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
      setFlashsales((prev) => prev.filter((item) => item.id !== id));
      setFlashsales((prev) => [...prev, data]);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-4/5 mx-auto p-4 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Danh sách chương trình flashsale
      </h1>
      <div className="mb-4">
        <button
          className="border border-blue-500 rounded p-2 hover:bg-blue-500 hover:text-white"
          onClick={() => setIsAdding(!isAdding)}
        >
          Thêm flashsale
        </button>
        {isAdding && (
          <div className="mt-4 p-2 border border-green-500 rounded-lg">
            <p className="text-yellow-700 font-semibold underline">
              Thêm mới Flashsale
            </p>
            <div className="mt-4 ">
              <label htmlFor="flashsalename" className="mr-2">
                Tên chương trình
              </label>
              <input
                id="flashsalename"
                type="text"
                placeholder="Tên chương trình flashsale"
                className="p-2 rounded-lg border border-blue-500"
                onChange={(e) => setFlashsaleName(e.target.value)}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="startedAt" className="mr-2">
                Bắt đầu lúc
              </label>
              <input
                type="datetime-local"
                min={getCurrentDateTimeLocal()}
                onChange={(e) => {
                  const local = new Date(e.target.value);
                  const utcISOString = local.toISOString();
                  setStartedAt(utcISOString);
                }}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="expiredAt" className="mr-2">
                Kết thúc lúc
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

            <button
              className="mt-4 p-2 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
              onClick={handleAddFlashsale}
            >
              Thêm flashsale mới
            </button>
          </div>
        )}
        {isUpdating && (
          <div className="mt-4 p-2 border border-green-500 rounded-lg">
            <p className="text-yellow-700 font-semibold underline">
              Chỉnh sửa Flashsale
            </p>
            <div className="mt-4 ">
              <label htmlFor="flashsalename" className="mr-2">
                Tên chương trình
              </label>
              <input
                id="flashsalename"
                type="text"
                placeholder="Tên chương trình flashsale"
                className="p-2 rounded-lg border border-blue-500"
                onChange={(e) => setFlashsaleName(e.target.value)}
                value={flashsaleName}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="startedAt" className="mr-2">
                Bắt đầu lúc
              </label>
              <input
                type="datetime-local"
                min={getCurrentDateTimeLocal()}
                value={formatForDatetimeLocal(startedAt)}
                onChange={(e) => {
                  const local = new Date(e.target.value);
                  const utcISOString = local.toISOString();
                  setStartedAt(utcISOString);
                }}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="expiredAt" className="mr-2">
                Kết thúc lúc
              </label>
              <input
                type="datetime-local"
                min={getCurrentDateTimeLocal()}
                value={formatForDatetimeLocal(expiredAt)}
                onChange={(e) => {
                  const local = new Date(e.target.value);
                  const utcISOString = local.toISOString();
                  setExpiredAt(utcISOString);
                }}
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
              onClick={handleUpdateFlashsale}
            >
              Cập nhật
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {flashsales.map((sale, index) => (
          <div
            key={index}
            className={`${
              sale?.available ? "bg-white" : "bg-red-500"
            } rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="flex justify-between">
              <h2 className="text-xl font-semibold text-indigo-700 mb-2">
                {sale.name}
              </h2>
              {!sale?.available &&
                new Date(sale.expiredAt).getTime() > Date.now() && (
                  <button
                    className="border border-white rounded p-2 text-white hover:border-blue-500"
                    onClick={() => handleActiveFlashsale(sale.id)}
                  >
                    Kích hoạt
                  </button>
                )}
            </div>
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

            {new Date(sale.expiredAt).getTime() > Date.now() && (
              <div className="flex justify-between">
                <button
                  className="border border-red-500 hover:bg-red-500 hover:text-white p-2 rounded"
                  onClick={() => handleDeleteFlashsale(sale.id)}
                >
                  Xóa
                </button>{" "}
                <button
                  className="border border-blue-500 hover:bg-blue-500 hover:text-white p-2 rounded"
                  onClick={() => updateFlashsale(sale)}
                >
                  Sửa
                </button>{" "}
              </div>
            )}
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

export default FlashSale;
