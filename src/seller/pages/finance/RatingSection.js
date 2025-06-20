import { useState, useEffect } from "react";

import { Star } from "lucide-react";

const RatingSection = ({ ratings }) => {
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  useEffect(() => {
    if (!ratings || ratings.length === 0) {
      setAverageRating(0);
      setTotalReviews(0);
      return;
    }

    let totalStars = 0;
    let currentTotalCount = 0;

    ratings.forEach((r) => {
      const stars = parseInt(r.stars, 10);
      const count = r.count;

      if (!isNaN(stars) && !isNaN(count)) {
        totalStars += stars * count;
        currentTotalCount += count;
      }
    });

    if (currentTotalCount > 0) {
      const calculatedAverage = (totalStars / currentTotalCount).toFixed(1);
      setAverageRating(parseFloat(calculatedAverage));
      setTotalReviews(currentTotalCount);
    } else {
      setAverageRating(0);
      setTotalReviews(0);
    }
  }, [ratings]);

  const maxCount =
    ratings !== null && ratings.length > 0
      ? Math.max(...ratings.map((r) => r.count))
      : 1;

  if (ratings === null) {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm row-span-2">
      <h3 className="text-lg font-semibold text-gray-700 mb-4">Rating</h3>
      <div className="flex items-end mb-6">
        <span className="text-5xl font-bold text-gray-800">
          {averageRating}{" "}
        </span>
        <Star
          className="text-yellow-400 ml-2 mb-1"
          size={30}
          fill="currentColor"
        />
        <span className="text-gray-500 text-sm ml-4">
          {totalReviews} reviews
        </span>{" "}
      </div>
      {ratings.map((rating, index) => (
        <div key={index} className="flex items-center mb-2">
          <span className="w-4 text-sm text-gray-600">{rating.stars}</span>
          <Star className="text-gray-500 ml-1" size={16} fill="currentColor" />
          <div className="flex-1 bg-gray-200 rounded-full h-2.5 mx-4">
            <div
              className="bg-blue-400 h-2.5 rounded-full"
              style={{ width: `${(rating.count / maxCount) * 100}%` }}
            ></div>
          </div>
          <span className="text-sm text-gray-600">{rating.count}</span>
        </div>
      ))}
    </div>
  );
};

export default RatingSection;
