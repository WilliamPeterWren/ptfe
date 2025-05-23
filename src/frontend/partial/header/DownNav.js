import React from "react";

import { imageUrl } from "../../../api/config";

function DownNav() {
  return (
    <div className="flex justify-between items-center py-5 pr-10">
      <a href="/home">
        <div className="flex items-center p-2 mr-20">
          <div>
            <img alt="logo" src={imageUrl + "logo/logo.png"} width={40} />
          </div>
          <div className="ml-4">
            <img alt="peter" src={imageUrl + "logo/peter 2.png"} width={130} />
          </div>
        </div>
      </a>
      <div className="mx-4 p-2 flex-1 mr-20 border bg-white">
        <div className="relative flex items-center w-full">
          <form className="flex items-center space-x-2 w-full">
            <input
              type="text"
              placeholder="Search..."
              className="bg-white text-gray-900 rounded-md px-4 py-2 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-[#fad550] w-full"
            />
            <button
              type="submit"
              className="bg-[#fad550] text-blue-500 font-bold rounded-md px-4 py-2 text-sm hover:bg-red-300 hover:text-gray-600 transition"
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
            />
          </div>

          <span className="ml-10 p-0.5 bg-blue-100 rounded-lg">30</span>
        </div>
      </div>
    </div>
  );
}

export default DownNav;
