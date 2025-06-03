import { useState, useEffect } from "react";
import Cookies from "js-cookie";

import apiCategory from "../../../api/apiCategory";
import apiPeterCategory from "../../../api/apiPeterCategory";
import { imageUrl } from "../../../api/config";

import CreateCategoryModal from "./CreateCategoryModal";

export default function Category() {
  const sellerId = Cookies.get("id");

  const [categories, setCategories] = useState([]);
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

  return (
    <div className="mrl-4 pl-4 mt-4 mr-40">
      <h2 className="text-2xl font-bold mb-4">Danh mục của shop</h2>

      <div className="">
        <div className="mb-6">
          <label
            htmlFor="category"
            className="block text-lg font-semibold text-gray-700 mb-2"
          >
            - Ngành hàng được phép kinh doanh
          </label>
          <div className="flex flex-wrap justify-start">
            {" "}
            {petercategories.map((c, i) => {
              const imgUrl = imageUrl + "category/" + c.images;
              return (
                <div
                  key={i}
                  className="w-1/5 px-4 py-2 m-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base appearance-none bg-white pr-10 hover:bg-gray-200"
                >
                  <img
                    src={imgUrl}
                    alt={c.name}
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

                  <span className="" key={c.id}>
                    {c.name}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mb-6 mr-4">
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

          {openCreateModal && (
            <CreateCategoryModal
              openCreateModal={openCreateModal}
              setOpenCreateModal={setOpenCreateModal}
              setOnload={setOnload}
              onLoad={onLoad}
            />
          )}

          <div className="relative mt-4">
            {categories.map((c, i) => (
              <input
                className="w-1/5 px-4 py-2 m-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base appearance-none bg-white pr-10 hover:bg-gray-200"
                key={c.id}
                defaultValue={c.categoryName}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
