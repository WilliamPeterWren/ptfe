import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import apiCategory from "../../../api/apiCategory";
import apiPeterCategory from "../../../api/apiPeterCategory";
import { imageUrl } from "../../../api/config";

import CreateCategoryModal from "./CreateCategoryModal";

export default function Category() {
  const sellerId = Cookies.get("id");
  const accessToken = Cookies.get("accessToken");

  const [update, setUpdate] = useState(true);
  const [categories, setCategories] = useState([]);
  const [editedCategories, setEditedCategories] = useState({});

  const [petercategories, setPeterCategories] = useState([]);
  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [onLoad, setOnload] = useState(false);

  const getCategories = async () => {
    await apiCategory
      .getAll(sellerId)
      .then((res) => {
        if (res.status === 200) {
          // console.log(res.data.result);
          setCategories(res.data.result);
        }
      })
      .catch((err) => console.log(err));
  };

  const getPeterCategories = async () => {
    await apiPeterCategory
      .getAll()
      .then((res) => {
        const data = res.data.result;
        // console.log(data);
        setPeterCategories(data);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getPeterCategories();
  }, []);

  useEffect(() => {
    getCategories();
  }, [onLoad]);

  const openModalAddCategory = () => {
    console.log("click");
    setOpenCreateModal(!openCreateModal);
  };

  const handleUpdateCategory = async () => {
    const updatePromises = Object.entries(editedCategories).map(
      async ([id, name]) => {
        try {
          const res = await apiCategory.update(
            id,
            { categoryName: name },
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          );
          // console.log(res);
          return res;
        } catch (err) {
          console.error(`Error updating category ${id}:`, err);
        }
      }
    );

    await Promise.all(updatePromises);
    setEditedCategories({});
    setOnload(!onLoad);
    setUpdate(true);

    Swal.fire({
      title: "Cập nhật thành công",
      text: "Danh mục đã được tạo",
      icon: "success",
      timer: 1500,
      timerProgressBar: true,
      showConfirmButton: false,
    });
  };

  return (
    <div className="mrl-4 pl-4 mt-4 mr-40">
      <h2 className="text-2xl font-bold mb-4">Danh mục của shop</h2>

      <div className="">
        <div className="mb-6 mr-4">
          <div className="flex justify-between items-center">
            <div className="flex justify-items items-center">
              <label
                htmlFor="category"
                className="block text-lg font-semibold text-gray-700 mb-2"
              >
                - Danh mục của shop
              </label>
              <button
                className="ml-24 bg-indigo-500 text-white px-4 py-2 rounded flex items-center"
                onClick={openModalAddCategory}
              >
                + Thêm danh mục
              </button>
            </div>
            <button
              className="border border-blue-500 rounded-md hover:bg-blue-500 hover:text-white p-2"
              onClick={() => {
                if (update) {
                  setUpdate(false);
                } else {
                  handleUpdateCategory();
                }
              }}
            >
              {update ? "Cập nhật" : "Lưu thay đổi"}
            </button>
          </div>

          {openCreateModal && (
            <CreateCategoryModal
              openCreateModal={openCreateModal}
              setOpenCreateModal={setOpenCreateModal}
              setOnload={setOnload}
              onLoad={onLoad}
            />
          )}

          <div className="relative mt-4 ">
            {categories.map((c, i) => (
              <input
                className={`w-1/5 capitalize px-4 py-2 m-2 border ${
                  update ? "border-gray-300" : "border-blue-500"
                }  rounded-md focus:ring-blue-500 focus:border-blue-500 text-base appearance-none bg-white pr-10 hover:bg-gray-200 `}
                key={c.id}
                defaultValue={c.categoryName}
                disabled={update}
                // onChange={(e) => setCategory(e.target.value)}
                onChange={(e) =>
                  setEditedCategories((prev) => ({
                    ...prev,
                    [c.id]: e.target.value,
                  }))
                }
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <div className=" bg-gray-100 p-8 flex items-start justify-center">
            <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-xl">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">
                Ngành hàng được phép kinh doanh
              </h2>
              <div className="flex flex-col overflow-y-auto max-h-96 py-2 -my-2">
                {petercategories.map((c, i) => {
                  const imgUrl = imageUrl + "category/" + c.images;

                  return (
                    <div
                      key={i}
                      className="
                  w-full my-2 p-4
                  border border-gray-200 rounded-lg shadow-sm
                  bg-white cursor-pointer hover:bg-blue-50
                  transition-all duration-200 ease-in-out
                  flex items-center justify-start text-left
                "
                    >
                      <img
                        src={imgUrl}
                        alt={c.name}
                        className="w-16 h-16 object-cover rounded-full mr-4 shadow flex-shrink-0"
                        onError={(e) => {
                          const target = e.target;
                          target.onerror = null;
                          const retryInterval = 2000;
                          let retryCount = 0;
                          const maxRetries = 3;

                          const retryLoad = () => {
                            if (retryCount < maxRetries) {
                              retryCount++;
                              target.src = imgUrl + `?retry=${retryCount}`;
                              console.warn(
                                `Attempting to retry image load for ${c.name}, attempt ${retryCount}`
                              );
                            } else {
                              target.src = "placeholderImageUrl";
                              console.error(
                                `Failed to load image for ${c.name} after ${maxRetries} retries. Using placeholder.`
                              );
                            }
                          };

                          setTimeout(retryLoad, retryInterval);
                        }}
                        loading="lazy"
                      />

                      <span className="text-base font-semibold text-gray-700 text-wrap flex-grow">
                        {c.name}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
