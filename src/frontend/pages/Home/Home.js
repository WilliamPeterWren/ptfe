import React, { useContext } from "react";

import CarouselSection from "./CarouselSection";
import DownSlider from "./DownSlider";
import CategorySection from "./CategorySection";
import FlashSale from "./FlashSale";
import HotDeals from "./HotDeal";
import TopSearchesSection from "./TopSearchSection";
import TodaysSuggestionsSection from "./TodaysSuggestionsSection";

function Home() {
  return (
    <div className="py-4 bg-gray-200">
      <div>
        <div className="pl-80 pr-96 bg-white">
          <CarouselSection />
          <DownSlider />
        </div>

        <div className="">
          <div className="ml-80 mr-96 bg-white mt-3">
            <CategorySection />
          </div>

          <div className="ml-80 mr-96 bg-white mt-3">
            <FlashSale />
          </div>

          <div className="ml-80 mr-96 bg-white mt-3">
            <HotDeals />
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
