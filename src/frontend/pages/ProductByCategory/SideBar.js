import { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showAllCategories, setShowAllCategories] = useState(true);

  const categories = [
    { name: "Tất Cả Danh Mục", slug: "all" },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-1",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-2",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-3",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-4",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-5",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-6",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-7",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-8",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-9",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-10",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-11",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-12",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-1",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-2",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-3",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-4",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-5",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-6",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-7",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-8",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-9",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-10",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-11",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-12",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-1",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-2",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-3",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-4",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-5",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-6",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-7",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-8",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-9",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-10",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-11",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
    {
      name: "Thời Trang Nam",
      slug: "mens-fashion-12",
      subcategories: [
        "Áo Khoác",
        "Áo Vest và Blazer",
        "Áo Hoodie, Áo Len & Áo Nỉ",
        "Quần Jeans",
        "Quần Dài/Quần Âu",
      ],
    },
  ];

  // Show all categories when showAllCategories is true, otherwise show first 5
  const visibleCategories = showAllCategories
    ? categories
    : categories.slice(0, 10);

  return (
    <div className="max-w-120 bg-white shadow-md p-4">
      <ul className="space-y-2">
        {/* {visibleCategories.map((category) => (
          <li key={category.slug}>
            <button
              onClick={() => category.subcategories && setIsOpen(!isOpen)}
              className={`w-full text-left px-2 py-1 rounded ${
                category.name === "Thời Trang Nam"
                  ? "text-red-500 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {category.name}
              {category.subcategories && (
                <span className="float-right">{isOpen ? "▼" : "▶"}</span>
              )}
            </button>
            {category.subcategories && isOpen && (
              <ul className="ml-4 mt-2 space-y-1">
                {category.subcategories.map((subcategory, index) => (
                  <li key={index}>
                    <a
                      href="/"
                      className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                    >
                      {subcategory}
                    </a>
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
        {!showAllCategories && (
          <li>
            <button
              onClick={() => setShowAllCategories(true)}
              className="w-full text-left px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
            >
              Thêm <span className="float-right">▼</span>
            </button>
          </li>
        )} */}
        {showAllCategories && (
          <div className="mt-2 max-h-80 overflow-y-auto border-t border-gray-200 pt-2">
            <ul className="space-y-2">
              {categories.map((category) => (
                <li key={category.slug}>
                  <button
                    onClick={() => category.subcategories && setIsOpen(!isOpen)}
                    className={`w-full text-left px-2 py-1 rounded ${
                      category.name === "Thời Trang Nam"
                        ? "text-red-500 font-semibold"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {category.name}
                    {category.subcategories && (
                      <span className="float-right">{isOpen ? "▼" : "▶"}</span>
                    )}
                  </button>
                  {category.subcategories && isOpen && (
                    <ul className="ml-4 mt-2 space-y-1">
                      {category.subcategories.map((subcategory, index) => (
                        <li key={index}>
                          <a
                            href="/"
                            className="block px-2 py-1 text-gray-600 hover:bg-gray-100 rounded"
                          >
                            {subcategory}
                          </a>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </ul>
    </div>
  );
};

export default Sidebar;
