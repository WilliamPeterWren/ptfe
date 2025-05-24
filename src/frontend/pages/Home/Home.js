import React, { useContext } from "react";
import Cookies from "js-cookie";

import UserContext from "../../../context/userContext";

import CarouselSection from "./CarouselSection";
import DownSlider from "./DownSlider";
import CategoriesSection from "./CategorySection";
import FlashSaleSection from "./FlashSale";
import HotDealsSection from "./HotDeal";
import TopSearchesSection from "./TopSearchSection";
import TodaysSuggestionsSection from "./TodaysSuggestionsSection";

function Home() {
  const { user } = useContext(UserContext);
  var username = user ? user : "";

  const authEmail = Cookies.get("authEmail");

  if (authEmail) {
    username = authEmail;
  }

  return (
    <div className="py-4 bg-gray-200">
      <div>
        <div className="pl-80 pr-96 bg-white">
          <CarouselSection />
          <DownSlider />
        </div>

        <div className="">
          <div className="ml-80 mr-96 bg-white mt-3">
            <CategoriesSection />
          </div>

          <div className="ml-80 mr-96 bg-white mt-3">
            <FlashSaleSection />
          </div>

          <div className="ml-80 mr-96 bg-white mt-3">
            <HotDealsSection />
          </div>

          <div className="ml-80 mr-96 bg-white mt-3">
            <TopSearchesSection />
          </div>

          <div className="ml-80 mr-96 bg-white mt-3">
            <TopSearchesSection />
          </div>

          <div className="ml-80 mr-96 bg-white mt-3">
            <TodaysSuggestionsSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
