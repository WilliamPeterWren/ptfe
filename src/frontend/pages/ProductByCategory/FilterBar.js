import { useState } from "react";

const FilterBar = (props) => {
  const {
    currentPage,
    totalPages,
    setCurrentPage,
    filters,
    activeFilter,
    setActiveFilter,
    setSortOrder,
    sortOrder,
  } = props;

  const handleSetPrevPage = () => {
    if (currentPage > 0) setCurrentPage(currentPage - 1);
  };

  const handleSetNextPage = () => {
    if (currentPage < totalPages - 1) setCurrentPage(currentPage + 1);
  };

  return (
    <div className="flex items-center justify-between bg-gray-100 p-4 rounded-lg shadow-sm mb-4">
      <div className="flex space-x-2">
        {filters.map((filter) => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-4 py-2 rounded-lg font-medium ${
              activeFilter === filter
                ? "bg-red-500 text-white"
                : "bg-white text-gray-700 hover:bg-gray-200"
            }`}
          >
            {filter}
          </button>
        ))}
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-gray-700 font-medium">Giá</span>
        <select
          value={sortOrder}
          onChange={(e) => setSortOrder(e.target.value)}
          className="border border-gray-300 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          <option value="asc">Thấp đến Cao</option>
          <option value="desc">Cao đến Thấp</option>
        </select>
      </div>

      <div className="flex items-center space-x-2">
        <span className="text-gray-700">
          {" "}
          {currentPage + 1}/{totalPages}{" "}
        </span>
        <button
          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
          onClick={handleSetPrevPage}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <button
          className="bg-gray-200 p-2 rounded-lg hover:bg-gray-300"
          onClick={handleSetNextPage}
        >
          <svg
            className="w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default FilterBar;
