import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import apiUser from "../../../api/apiUser";
import { imageUrl } from "../../../api/config";
import { getRole } from "../../../utils/getRole";

function ManageUser() {
  const accessToken = Cookies.get("accessToken");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [isFirst, setIsFirst] = useState(false);
  const [isLast, setIsLast] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [reload, setReload] = useState(false);

  const getUsers = async () => {
    try {
      const role = "ROLE_USER";
      const res = await apiUser.getUserByRole(role, currentPage, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      const data = res.data;
      console.log(data);
      setUsers(data.content);
      setCurrentPage(data.number);
      setIsFirst(data.first);
      setIsLast(data.last);
      setTotalPages(data.totalPages);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsers();
  }, [reload]);

  const handleDeactiveUser = async (id) => {
    console.log("user id: " + id);

    Swal.fire({
      title: "Tạm ngưng tài khoản này?",
      text: "Khóa tài khoản này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Vẫn khóa!",
      cancelButtonText: "Không khóa!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiUser.adminDeactiveUser(id, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = res.data;
          console.log(data);

          toast.success(`Đã khóa tài khoản này`, {
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

          setUsers((prev) => prev.filter((item) => item.id !== id));
          setUsers((prev) => [...prev, data]);
        } catch (error) {
          console.log(error);
        }
      } else {
        Swal.fire({
          title: "Không xóa!",
          text: "Tài khoản vẫn hoạt động!",
          icon: "warning",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleActiveUser = async (id) => {
    console.log("user id: " + id);

    Swal.fire({
      title: "Kích hoạt tài khoản này?",
      text: "Kích hoạt tài khoản này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Kích hoạt!",
      cancelButtonText: "Không kích hoạt!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiUser.adminActiveUser(id, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });
          const data = res.data;
          console.log(data);

          toast.success(`Đã kích hoạt tài khoản này`, {
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

          setUsers((prev) => prev.filter((item) => item.id !== id));
          setUsers((prev) => [...prev, data]);
        } catch (error) {
          console.log(error);
        }
      } else {
        Swal.fire({
          title: "Không kích hoạt!",
          text: "Tài khoản trong trạng thái khóa!",
          icon: "warning",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        });
      }
    });
  };

  const handleGetUsersData = async (index) => {
    setCurrentPage(index);
    console.log(index);
    setReload(!reload);
  };

  const handleNextUsers = async () => {
    setCurrentPage(currentPage + 1);
    setReload(!reload);
  };

  const handlePrevUsers = async () => {
    setCurrentPage(currentPage - 1);
    setReload(!reload);
  };

  if (users.length === 0) {
    return null;
  }

  return (
    <div>
      <div className="min-h-screen bg-gray-100 p-4 font-sans flex justify-center items-start">
        <div className="w-full max-w-6xl bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-500 to-blue-600 p-6 rounded-t-xl flex items-center">
            <h2 className="text-white text-2xl font-semibold">
              Quản lý khách hàng
            </h2>
          </div>

          <div className="p-6">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-white">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      THÔNG TIN
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      VAI TRÒ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      TRẠNG THÁI
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      THAM GIA TỪ
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-lg font-medium text-gray-500 uppercase tracking-wider"
                    >
                      •••
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {users.map((author, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            {author.avatar !== null ? (
                              <img
                                className="h-12 w-12 rounded-full object-cover"
                                src={imageUrl + "avatar/" + author.avatar}
                                alt={`${author.name}'s avatar`}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://placehold.co/40x40/cccccc/ffffff?text=${author.username.charAt(
                                    0
                                  )}`;
                                }}
                              />
                            ) : (
                              <img
                                className="h-12 w-12 rounded-full"
                                src="https://placehold.co/40x40/cccccc/ffffff"
                                alt={`${author.name}'s avatar`}
                                onError={(e) => {
                                  e.target.onerror = null;
                                  e.target.src = `https://placehold.co/40x40/cccccc/ffffff?text=${author.username.charAt(
                                    0
                                  )}`;
                                }}
                              />
                            )}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {author.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              {author.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {author.roles.map((item, index) => {
                          return (
                            <div
                              key={index}
                              className="text-sm font-semibold px-2 py-1 my-1 text-blue-700 bg-blue-200 rounded"
                            >
                              {getRole(item.name)}
                            </div>
                          );
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            author.isActive === true
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {author.isActive
                            ? "ĐANG HOẠT ĐỘNG"
                            : "TẠM NGƯNG HOẠT ĐỘNG"}
                        </span>
                        <br />
                        <span
                          className={`mt-2 px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            author.isVerify === true
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-200 text-gray-800"
                          }`}
                        >
                          {author.isVerify ? "ĐÃ XÁC THỰC" : "CHƯA XÁC THỰC"}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        <p>
                          {new Date(author.createdAt).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </p>
                        <p>
                          {new Date(author.updatedAt).toLocaleString("vi-VN", {
                            day: "2-digit",
                            month: "2-digit",
                            year: "numeric",
                          })}
                        </p>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        {author.isActive ? (
                          <button
                            className={` text-blue-600 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md`}
                            onClick={() => handleDeactiveUser(author.id)}
                          >
                            Khóa
                          </button>
                        ) : (
                          <button
                            className={` text-red-600 hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 rounded-md`}
                            onClick={() => handleActiveUser(author.id)}
                          >
                            Mở khóa
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-6 mr-8 flex justify-end items-center mt-6 space-x-2 text-sm">
            {!isFirst && (
              <button
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={handlePrevUsers}
              >
                &lt;
              </button>
            )}

            {(() => {
              const pageButtons = [];
              const maxButtons = 5;
              const sideCount = 1;

              const startPage = Math.max(0, currentPage - sideCount);
              const endPage = Math.min(totalPages - 1, currentPage + sideCount);

              if (startPage > 0) {
                pageButtons.push(
                  <button
                    key={0}
                    className={`px-3 py-1 ${
                      currentPage === 0
                        ? "bg-blue-500 text-white"
                        : "border border-blue-500"
                    } rounded-md`}
                    onClick={() => handleGetUsersData(0)}
                  >
                    1
                  </button>
                );
                if (startPage > 1) {
                  pageButtons.push(
                    <span key="start-ellipsis" className="px-2">
                      ...
                    </span>
                  );
                }
              }

              for (let i = startPage; i <= endPage; i++) {
                pageButtons.push(
                  <button
                    key={i}
                    className={`px-3 py-1 ${
                      currentPage === i
                        ? "bg-blue-500 text-white"
                        : "border border-blue-500"
                    } rounded-md`}
                    onClick={() => handleGetUsersData(i)}
                  >
                    {i + 1}
                  </button>
                );
              }

              if (endPage < totalPages - 1) {
                if (endPage < totalPages - 2) {
                  pageButtons.push(
                    <span key="end-ellipsis" className="px-2">
                      ...
                    </span>
                  );
                }
                pageButtons.push(
                  <button
                    key={totalPages - 1}
                    className={`px-3 py-1 ${
                      currentPage === totalPages - 1
                        ? "bg-blue-500 text-white"
                        : "border border-blue-500"
                    } rounded-md`}
                    onClick={() => handleGetUsersData(totalPages - 1)}
                  >
                    {totalPages}
                  </button>
                );
              }

              return pageButtons;
            })()}

            {!isLast && (
              <button
                className="px-3 py-1 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                onClick={handleNextUsers}
              >
                &gt;
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ManageUser;
