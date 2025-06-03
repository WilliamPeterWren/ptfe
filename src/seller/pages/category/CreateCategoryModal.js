import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";

import apiCategory from "../../../api/apiCategory";

function CreateCategoryModal({
  openCreateModal,
  setOpenCreateModal,
  setOnload,
  onLoad,
}) {
  const [categoryName, setCategoryName] = useState();

  const handleChangeCategory = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    console.log("click 00");
    e.preventDefault();
    const accessToken = Cookies.get("accessToken");

    const data = {
      categoryName,
    };

    if (categoryName === "") {
      return;
    }

    await apiCategory
      .createCategory(data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
        setOnload(!onLoad);
        setOpenCreateModal(!openCreateModal);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-md transform transition-all duration-300 scale-95 opacity-0 animate-scale-in">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Thêm danh mục mới
        </h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-5">
            <label
              htmlFor="categoryName"
              className="block text-gray-700 text-sm font-medium mb-2"
            >
              Tên danh mục
            </label>
            <input
              type="text"
              id="categoryName"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-gray-900 placeholder-gray-500 transition duration-150 ease-in-out"
              placeholder="e.g., Smartphones"
              defaultValue={categoryName}
              onChange={handleChangeCategory}
              required
            />
          </div>

          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setOpenCreateModal(!openCreateModal)}
              className="px-5 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200"
            >
              Tạo danh mục mới
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

export default CreateCategoryModal;
