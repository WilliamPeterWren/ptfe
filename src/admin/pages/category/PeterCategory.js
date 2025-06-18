import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { v4 as uuidv4 } from "uuid";

import apiPeterCategory from "../../../api/apiPeterCategory";
import { imageUrl } from "../../../api/config";

function PeterCategory() {
  const accessToken = Cookies.get("accessToken");

  const [peterCategories, setPeterCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalEditedCategories, setModalEditedCategories] = useState({});
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryImageFile, setNewCategoryImageFile] = useState(null);

  const [message, setMessage] = useState(null);
  const showMessage = (text, type = "success") => {
    setMessage({ text, type });
    setTimeout(() => setMessage(null), 3000);
  };

  const getPeterCategories = async () => {
    try {
      setLoading(true);
      const res = await apiPeterCategory.getAll();
      setPeterCategories(res.data.result);
      console.log(res.data.result);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching categories:", error);
      showMessage("Failed to load categories.", "error");
      setLoading(false);
    }
  };

  useEffect(() => {
    getPeterCategories();
  }, []);

  const handleOpenModal = () => {
    const initialEdited = {};
    peterCategories.forEach((cat) => {
      initialEdited[cat.id] = cat.name;
    });
    setModalEditedCategories(initialEdited);
    setNewCategoryName("");

    setNewCategoryImageFile(null);
    setShowModal(true);
  };

  const handleDeletePeterCategory = async (id) => {
    console.log(id);
    try {
      setLoading(true);
      const res = await apiPeterCategory.delete(id, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      const data = res.data.result;
      console.log(res);

      Swal.fire({
        title: "Vô hiệu danh mục thành công",
        text: "Vô hiệu hóa danh mục thành công!",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setLoading(false);
      setPeterCategories(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSaveCategories = async () => {
    const updatePromises = Object.entries(modalEditedCategories).map(
      async ([id, name]) => {
        const originalCategory = peterCategories.find((c) => c.id === id);
        if (originalCategory && originalCategory.name !== name) {
          try {
            await apiPeterCategory.update(
              id,
              { name: name },
              {
                headers: {
                  Authorization: `Bearer ${accessToken}`,
                },
              }
            );
          } catch (err) {
            console.error(`Error updating category ${id}:`, err);
            showMessage(`Failed to update ${originalCategory.name}.`, "error");
          }
        }
      }
    );

    let createPromise = Promise.resolve();
    if (newCategoryName) {
      try {
        const formData = new FormData();
        let uuidFileName = uuidv4() + "_" + newCategoryImageFile.name;
        formData.append("files", newCategoryImageFile, uuidFileName);

        try {
          const res = await fetch(
            "http://localhost:8889/api/files/upload/category",
            {
              method: "POST",
              body: formData,
            }
          );
          console.log(res);
        } catch (error) {
          console.log(error);
        }

        await apiPeterCategory.create(
          {
            name: newCategoryName,
            images: newCategoryImageFile ? uuidFileName : "default.webp",
          },
          {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          }
        );
        showMessage("New category added successfully!", "success");
      } catch (err) {
        console.error("Error creating new category:", err);
        showMessage("Failed to create new category.", "error");
      }
    }

    await Promise.all([...updatePromises, createPromise]);
    setShowModal(false);
    getPeterCategories();
    showMessage("Cập nhật thành công!", "success");
  };

  const MessageBox = ({ message }) => {
    if (!message) return null;
    const bgColor = message.type === "success" ? "bg-green-500" : "bg-red-500";
    return (
      <div
        className={`fixed top-4 right-4 ${bgColor} text-white px-6 py-3 rounded-lg shadow-lg z-50 transition-all duration-300 transform animate-fade-in-down`}
      >
        {message.text}
      </div>
    );
  };

  const handleReactivePeterCategory = async (id) => {
    console.log(id);
    console.log(accessToken);
    try {
      setLoading(true);
      const res = await apiPeterCategory.update(
        id,
        { available: true },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const data = res.data.result;
      console.log(data);

      Swal.fire({
        title: "Kích hoạt danh mục thành công",
        text: "Kích hoạt danh mục thành công!",
        icon: "success",
        timer: 1500,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      setLoading(false);
      setPeterCategories((prev) => prev.filter((item) => item.id !== id));
      setPeterCategories((prev) => [...prev, data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="mx-auto p-4 md:p-8 font-inter bg-gray-50 min-h-screen">
      <MessageBox message={message} />

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-4 md:mb-0">
          Ngành hàng được phép kinh doanh
        </h1>
        <button
          className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
          onClick={handleOpenModal}
        >
          Cập nhật / Thêm mới
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-500"></div>
          <p className="ml-4 text-gray-600">Đang tải danh mục...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {peterCategories.map((c) => (
            <div
              key={c.id}
              className={` ${
                c.available ? "bg-white" : "bg-red-500 text-white"
              }  rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col items-center p-4 border border-gray-200`}
            >
              <img
                alt={c.name}
                src={imageUrl + "category/" + c.images}
                className="w-full h-32 object-cover rounded-md mb-4"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = imageUrl + "placeholder";
                }}
              />
              <p className="text-lg font-semibold text-center capitalize">
                {c.name}
              </p>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-white p-6 md:p-8 rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto transform scale-95 animate-zoom-in">
            <h2 className="text-3xl font-bold mb-6 text-gray-800 border-b pb-4">
              Quản lý Ngành hàng
            </h2>

            <div className="mb-8">
              <h3 className="text-2xl font-semibold mb-5 text-gray-700">
                Sửa danh mục hiện có
              </h3>
              <div className="space-y-4">
                {peterCategories.map((c) => (
                  <div
                    key={c.id}
                    className={`flex items-center space-x-4 ${
                      c.available ? "bg-gray-50" : "bg-red-400"
                    }  p-3 rounded-lg border border-gray-200 shadow-sm`}
                  >
                    <img
                      src={imageUrl + "category/" + c.images}
                      alt={c.name}
                      className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = imageUrl + "placeholder";
                      }}
                    />
                    <input
                      type="text"
                      value={modalEditedCategories[c.id] || ""}
                      onChange={(e) =>
                        setModalEditedCategories((prev) => ({
                          ...prev,
                          [c.id]: e.target.value,
                        }))
                      }
                      className="flex-grow px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base"
                      disabled={!c.available}
                    />
                    {c.available ? (
                      <div>
                        {" "}
                        <button
                          className="text-red-500 hover:text-red-700 p-2 rounded-full transition-colors duration-200"
                          onClick={() => handleDeletePeterCategory(c.id)}
                          disabled={!c.available}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                        </button>
                      </div>
                    ) : (
                      <div className="text-green-700 hover:text-blue-700">
                        <button
                          onClick={() => handleReactivePeterCategory(c.id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 mr-1"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-8 border-t pt-6">
              <h3 className="text-2xl font-semibold mb-5 text-gray-700">
                Thêm danh mục mới
              </h3>
              <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Tên danh mục mới"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 text-base"
                />
                <input
                  type="file"
                  onChange={(e) => setNewCategoryImageFile(e.target.files[0])}
                  className="w-full text-base text-gray-600 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-4 border-t pt-6">
              <button
                onClick={() => setShowModal(false)}
                className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg shadow-md hover:bg-gray-400 transition-all duration-300 transform hover:scale-105"
              >
                Đóng
              </button>
              <button
                onClick={handleSaveCategories}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
              >
                Lưu thay đổi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PeterCategory;
