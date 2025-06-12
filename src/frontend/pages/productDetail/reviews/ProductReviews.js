import React from "react"; 

import StarRating from "./StarRating";
import ReviewCard from "./ReviewCard";
import FilterButton from "./FilterButton";

const ProductReviews = ({ variants, rating, reviews }) => {
  const calculateAverageRating = () => {
    let totalStars = 0;
    let totalReviews = 0;

    for (const star in rating) {
      const count = rating[star];
      totalStars += parseInt(star) * count; 
      totalReviews += count; 
    }

    if (totalReviews === 0) {
      return { average: 0, roundedAverage: 0 }; 
    }

    const average = totalStars / totalReviews;
    const roundedAverage = Math.round(average);
    const displayAverage = average.toFixed(1); 

    return { average: displayAverage, roundedAverage: roundedAverage };
  };

  const { average: displayAverage, roundedAverage } = calculateAverageRating();

  return (
    <div className="max-w-[1540px] mx-auto bg-white rounded-lg shadow-md p-6 mt-4">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        ĐÁNH GIÁ SẢN PHẨM
      </h2>

      <div className="flex items-center space-x-4 mb-6">
        <div className="flex flex-col items-center">
          <span className="text-2xl font-bold text-red-600">
            {displayAverage}
          </span>
          <span className="text-sm text-gray-600">trên 5</span>
          <StarRating rating={roundedAverage} />
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(rating).map(([starRating, count]) => (
            <FilterButton
              key={starRating}
              label={`${starRating} Sao`}
              count={count}
            />
          ))}
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
