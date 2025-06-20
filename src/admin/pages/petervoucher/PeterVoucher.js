import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import apiPeterVoucher from "../../../api/apiPeterVoucher";

import formatForDatetimeLocal from "../../../utils/formatForDatetimeLocal";
import Pagination from "./Pagination";

function PeterVoucher() {
  const accessToken = Cookies.get("accessToken");

  const [peters, setPeterVouchers] = useState([]);
  const [page, setPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [totalElements, setTotalElements] = useState(0);
  const [size, setSize] = useState(10);

  const [loading, setLoading] = useState(true);
  // const [error, setError] = useState(null);

  const [peterName, setPeterVoucherName] = useState(null);

  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateId, setUpdateId] = useState(null);
  const [peterValue, setPeterVoucherValue] = useState(1000);
  const [peterCount, setPeterVoucherCount] = useState(1);
  const [minPurchase, setMinPurchase] = useState(0);
  const [expiredAt, setExpiredAt] = useState(null);

  const getCurrentDateTimeLocal = () => {
    const now = new Date();
    now.setSeconds(0, 0);
    return now.toISOString().slice(0, 16);
  };

  const getListPeterVoucher = async () => {
    try {
      setLoading(!loading);
      const res = await apiPeterVoucher.adminGetAll(page, size, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      console.log(data);
      setPeterVouchers(data.content);
      setPage(data.number);
      setTotalPages(data.totalPages);
      setTotalElements(data.totalElements);
    } catch (err) {
      console.error("Failed to fetch flash sales:", err);
      // setError("Failed to load flash sales. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (loading) {
      getListPeterVoucher();
    }
  }, [loading]);

  const handleAddPeterVoucher = async () => {
    console.log("add flash sale");
    const dataCreatePeterVoucher = {
      name: peterName,
      value: parseInt(peterValue),
      expiredAt,
      count: parseInt(peterCount),
      minPurchase: parseInt(minPurchase),
    };

    console.log(dataCreatePeterVoucher);
    console.log(accessToken);

    try {
      const res = await apiPeterVoucher.create(dataCreatePeterVoucher, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data.result;
      console.log(data);
      console.log(res);

      Swal.fire({
        title: "Thêm Voucher mới!",
        text: "Chương trình peterVoucher mới đã được thêm!",
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

      setPeterVouchers((prev) => [...prev, data]);
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

  const handleDeletePeterVoucher = async (id) => {
    console.log("delete Voucher");
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
          const res = await apiPeterVoucher.delete(id, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = res.data.result;
          console.log(data);
          toast.success(`Bạn đã xóa peterVoucher`, {
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

          // Swal.fire({
          //   title: "Đã xóa!",
          //   text: "Chương trình khuyến mãi bị xóa!",
          //   icon: "success",
          //   timer: 1500,
          //   timerProgressBar: true,
          //   showConfirmButton: false,
          // }).then((result) => {
          //   if (result.dismiss === Swal.DismissReason.timer) {
          //     console.log("I was closed by the timer");
          //   }
          // });
          setLoading(!loading);
          // setPeterVouchers((prev) => prev.filter((item) => item.id !== id));
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

  const updatePeterVoucher = (voucher) => {
    setIsUpdating(!isUpdating);
    console.log(voucher);

    setPeterVoucherName(voucher.name);
    setPeterVoucherValue(voucher.value);
    setPeterVoucherCount(voucher.count);
    setExpiredAt(voucher.expiredAt);
    setMinPurchase(voucher.minPurchase);

    setUpdateId(voucher.id);
  };

  const handleUpdatePeterVoucher = async () => {
    const updatePeterVoucherData = {
      name: peterName,
      value: parseInt(peterValue),
      expiredAt,
      count: parseInt(peterCount),
      minPurchase: parseInt(minPurchase),
      available: true,
    };

    console.log(updatePeterVoucherData);

    try {
      const res = await apiPeterVoucher.update(
        updateId,
        updatePeterVoucherData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = res.data.result;
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

      setPeterVouchers((prev) => prev.filter((item) => item.id !== updateId));
      setPeterVouchers((prev) => [...prev, data]);
      setIsUpdating(!isUpdating);
    } catch (error) {
      console.log(error);
    }
  };

  const handleActivePeterVoucher = async (id) => {
    const updatePeterVoucherData = {
      available: true,
    };

    console.log(updatePeterVoucherData);

    try {
      const res = await apiPeterVoucher.update(id, updatePeterVoucherData, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data.result;
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
      setPeterVouchers((prev) => prev.filter((item) => item.id !== id));
      setPeterVouchers((prev) => [...prev, data]);
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  if (peters.length === 0) {
    return null;
  }

  return (
    <div className="w-4/5 mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Danh sách khuyến mãi Peter
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
              Thêm mới Khuyến mãi
            </p>
            <div className="mt-4 ">
              <label htmlFor="petername" className="mr-2">
                Tên
              </label>
              <input
                id="petername"
                type="text"
                placeholder="Tên khuyến mãi"
                className="p-2 w-64 rounded-lg border border-blue-500"
                onChange={(e) => setPeterVoucherName(e.target.value)}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="petervalue" className="mr-2">
                Giá
              </label>
              <input
                className="p-2 w-64 rounded-lg border border-blue-500"
                id="petervalue"
                type="number"
                placeholder="Mức khuyến mãi"
                onChange={(e) => setPeterVoucherValue(e.target.value)}
                min={1000}
                defaultValue={peterValue}
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
              <label htmlFor="petercount" className="mr-2">
                Số lượng
              </label>
              <input
                className="p-2 w-64 rounded-lg border border-blue-500"
                id="petercount"
                type="number"
                placeholder="Số lượng khuyến mãi"
                onChange={(e) => setPeterVoucherCount(e.target.value)}
                min={1}
                defaultValue={peterCount}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="minpurchase" className="mr-2">
                Đơn tối thiểu
              </label>
              <input
                className="p-2 w-64 rounded-lg border border-blue-500"
                id="minpurchase"
                type="number"
                placeholder="Đơn tối thiểu"
                onChange={(e) => setMinPurchase(e.target.value)}
                min={1}
                defaultValue={minPurchase}
              />
            </div>

            <button
              className="mt-4 p-2 border border-blue-500 rounded hover:bg-blue-500 hover:text-white"
              onClick={handleAddPeterVoucher}
            >
              Thêm mới
            </button>
          </div>
        )}
        {isUpdating && (
          <div className="mt-4 p-2 border border-green-500 rounded-lg">
            <p className="text-yellow-700 font-semibold underline">
              Chỉnh sửa PeterVoucher
            </p>
            <div className="mt-4 ">
              <label htmlFor="petername" className="mr-2">
                Tên
              </label>
              <input
                id="petername"
                type="text"
                placeholder="Tên khuyến mãi"
                className="p-2 w-64 rounded-lg border border-blue-500"
                onChange={(e) => setPeterVoucherName(e.target.value)}
                defaultValue={peterName}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="petervalue" className="mr-2">
                Giá
              </label>
              <input
                className="p-2 w-64 rounded-lg border border-blue-500"
                id="petervalue"
                type="number"
                placeholder="Mức khuyến mãi"
                onChange={(e) => setPeterVoucherValue(e.target.value)}
                min={5000}
                defaultValue={peterValue}
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
              <label htmlFor="petercount" className="mr-2">
                Số lượng
              </label>
              <input
                className="p-2 w-64 rounded-lg border border-blue-500"
                id="petercount"
                type="number"
                placeholder="Số lượng khuyến mãi"
                onChange={(e) => setPeterVoucherCount(e.target.value)}
                min={1}
                defaultValue={peterCount}
              />
            </div>
            <div className="mt-4 ">
              <label htmlFor="minpurchase" className="mr-2">
                Đơn tối thiểu
              </label>
              <input
                className="p-2 w-64 rounded-lg border border-blue-500"
                id="minpurchase"
                type="number"
                placeholder="Đơn tối thiểu"
                onChange={(e) => setMinPurchase(e.target.value)}
                min={1}
                defaultValue={minPurchase}
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
              onClick={handleUpdatePeterVoucher}
            >
              Cập nhật
            </button>
          </div>
        )}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {peters.map((voucher, index) => (
          <div
            key={index}
            className={`${
              voucher?.available ? "bg-white" : "bg-red-500"
            }  rounded-lg shadow-md p-6 border border-gray-200 hover:shadow-lg transition-shadow duration-300`}
          >
            <div className="flex justify-between">
              <div className="flex justify-between items-center">
                <h2
                  className={`text-xl font-semibold ${
                    voucher?.available ? "text-indigo-700" : "text-white"
                  }  mb-2 capitalize`}
                >
                  {voucher?.name}
                </h2>
              </div>
              {!voucher?.available ? (
                <button
                  className="border border-white rounded p-2 text-white hover:border-blue-500"
                  onClick={() => handleActivePeterVoucher(voucher?.id)}
                >
                  Kích hoạt
                </button>
              ) : (
                <span className="ml-4 font-semibold text-indigo-700 mb-2">
                  x{voucher?.count}
                </span>
              )}
            </div>

            <h2
              className={`text-lg font-semibold ${
                voucher?.available ? "text-orange-700" : "text-white"
              }  mb-2`}
            >
              Mức khuyến mãi : {voucher?.value?.toLocaleString()} đ
            </h2>

            <h2
              className={`text-lg font-semibold ${
                voucher?.available ? "text-orange-700" : "text-white"
              }  mb-2`}
            >
              Đơn tối thiểu : {voucher?.minPurchase?.toLocaleString()} đ
            </h2>
            <hr className="border border-red-500 w-full" />
            <p className="text-gray-600 text-sm mb-1 mt-2">
              <span className="font-medium">Hạn cuối :</span>{" "}
              {new Date(voucher?.expiredAt)?.toLocaleString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                second: "2-digit",
                hour12: false,
              })}{" "}
            </p>

            <div className="flex justify-between mt-4">
              <button
                className={`border border-red-500 ${
                  voucher?.available && "hover:bg-red-500 hover:text-white"
                }  p-2 rounded`}
                onClick={() => handleDeletePeterVoucher(voucher?.id)}
                disabled={!voucher?.available}
              >
                Xóa
              </button>{" "}
              <button
                className={`border border-blue-500 ${
                  voucher?.available && "hover:bg-blue-500 hover:text-white"
                }  p-2 rounded`}
                onClick={() => updatePeterVoucher(voucher)}
                disabled={!voucher?.available}
              >
                Sửa
              </button>{" "}
            </div>
          </div>
        ))}
      </div>
      <Pagination
        currentPage={page}
        setCurrentPage={setPage}
        totalPages={totalPages}
      />
    </div>
  );
}

export default PeterVoucher;
