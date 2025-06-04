import React, { useState, useEffect } from "react";

import StarRating from "./StarRating";
import ReviewCard from "./ReviewCard";
import FilterButton from "./FilterButton";

const ProductReviews = ({ variants, rating, reviews }) => {
  return (
    <div className="max-w-[1540px] mx-auto bg-white rounded-lg shadow-md p-6 mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        ĐÁNH GIÁ SẢN PHẨM
      </h2>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-red-600">4.7</span>
          <span className="text-sm text-gray-600">trên 5</span>
          <StarRating rating={5} />
        </div>

        <div className="flex flex-wrap gap-2">
          <FilterButton label="Tất Cả" />
          {rating.length > 0 &&
            rating?.map((item, index) => {
              return <FilterButton key={index} label="1 Sao" count="286" />;
            })}
          <FilterButton label="5 Sao" count="6,7K" />
          <FilterButton label="4 Sao" count="560" />
          <FilterButton label="3 Sao" count="289" />
          <FilterButton label="2 Sao" count="122" />
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} variants={variants} />
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
