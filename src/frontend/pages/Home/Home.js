import React, { useContext, useEffect } from "react";

import CarouselSection from "./CarouselSection";
import DownSlider from "./DownSlider";
import CategorySection from "./CategorySection";
import FlashSale from "./FlashSale";
import HotDeals from "./PeterMall";
import TopSearchesSection from "./TopSearchSection";
import TodaysSuggestionsSection from "./TodaysSuggestionsSection";

function Home() {
  const pageTitle = "Peter website...";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);
  return (
    <div className="py-4 bg-gray-200">
      <div>
        <div className="bg-white mt-3 rounded-lg">
          <CarouselSection />
          <DownSlider />
        </div>

        <div className="">
          <div className="bg-white mt-3 rounded-lg">
            <CategorySection />
          </div>

          <div className="bg-white mt-3 rounded-lg">
            <FlashSale />
          </div>

          <div className="bg-white mt-3 rounded-lg">
            <HotDeals />
          </div>

          <div className="bg-white mt-3 rounded-lg">
            <TopSearchesSection />
          </div>

          <div className="bg-white mt-3 rounded-lg">
            <TodaysSuggestionsSection />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
