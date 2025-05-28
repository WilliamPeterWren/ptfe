import { useState } from "react";

const Sidebar = () => {

  const categories = [
    { name: "Tất Cả Danh Mục", slug: "all" },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-1",
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-2",
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-3",
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-1",
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-2",
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-3",
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-1",
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-2",
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-3",
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-1",
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-2",
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-3",
    },
  ];

  return (
    <div className="max-w-120 bg-white shadow-md p-4">
      <ul className="space-y-2">
        <div className="mt-2 max-h-80 overflow-y-auto border-t border-gray-200 pt-2">
          <ul className="space-y-2">
            {categories.map((category, index) => (
              <li key={index}>
                <button
                  onClick={() => category.subcategories}
                  className={`w-full text-left px-2 py-1 rounded ${
                    category.name === "Thời Trang Nam"
                      ? "text-red-500 font-semibold"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {category.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </ul>
    </div>
  );
};

export default Sidebar;
