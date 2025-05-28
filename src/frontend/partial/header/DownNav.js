import React, { useState, useEffect } from "react";
import { imageUrl } from "../../../api/config";
import { useNavigate } from "react-router-dom";

function DownNav() {
  const [searchData, setSearchData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    console.log("searchData updated:", searchData);
  }, [searchData]);

  const handleSearch = (e) => {
    e.preventDefault();
    console.log("Search button clicked, searchData:", searchData);
    navigate(`/search/products?query=${searchData}`);
  };

  return (
    <div className="flex justify-between items-center py-5 pr-10">
      <a href="/home">
        <div className="flex items-center p-2 mr-20">
          <div>
            <img
              alt="logo"
              src={imageUrl + "logo/logo.png"}
              width={40}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item); // Ensure defaultImage is defined
              }}
              loading="lazy"
            />
          </div>
          <div className="ml-4">
            <img
              alt="peter"
              src={imageUrl + "logo/peter 2.png"}
              width={130}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item); // Ensure defaultImage is defined
              }}
              loading="lazy"
            />
          </div>
        </div>
      </a>
      <div className="mx-4 p-2 flex-1 mr-20 border bg-white rounded-lg">
        <div className="relative flex items-center w-full ">
          <form
            className="flex items-center space-x-2 w-full "
            onSubmit={handleSearch}
          >
            <input
              type="text"
              placeholder="Search..."
              className="bg-white text-gray-900 rounded-md px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#fad550] w-full"
              value={searchData} // Bind input value to state
              onChange={(e) => setSearchData(e.target.value)}
            />
            <button
              type="submit"
              className="bg-[#fad550] text-blue-500 font-bold rounded-md px-4 py-2 text-sm hover:bg-red-300 hover:text-gray-600 transition"
              disabled={searchData.length === 0}
            >
              Search
            </button>
          </form>
        </div>
      </div>
      <div className="">
        <div className="relative">
          <div className="absolute">
            <img
              alt="cart"
              src={imageUrl + "icons/cart-white.png"}
              width={40}
              onError={(e) => {
                e.target.onerror = null;
                // e.target.src = defaultImage(item); // Ensure defaultImage is defined
              }}
              loading="lazy"
            />
          </div>
          <span className="ml-10 p-0.5 bg-blue-100 rounded-lg">30</span>
        </div>
      </div>
    </div>
  );
}

export default DownNav;
