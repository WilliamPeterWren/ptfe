import React from "react";
import PropTypes from "prop-types";
import { imageUrl } from "../../../api/config";

const StarRating = ({ rating, starSize = "w-5 h-5" }) => (
  <div className="flex text-red-500">
    {[...Array(rating)].map((_, index) => (
      <svg
        key={index}
        className={`${starSize} fill-current`}
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    ))}
  </div>
);

const ReviewMedia = ({ media }) => (
  <div className="flex space-x-2 mb-2">
    {media.map((item, index) => (
      <div key={index} className="relative">
        <img
          src={item.url}
          alt={`Media ${index + 1}`}
          className="w-20 h-20 object-cover rounded"
          onError={(e) => {
            const target = e.target;
            target.onerror = null;
            const retryInterval = 2000;
            let retryCount = 0;
            const maxRetries = 5;

            const retryLoad = () => {
              if (retryCount < maxRetries) {
                retryCount++;
                target.src = imageUrl + "product/" + `?retry=${retryCount}`;
                target.onerror = () => {
                  setTimeout(retryLoad, retryInterval);
                };
              } else {
                target.src =
                  "https://placehold.co/32x32/cccccc/333333?text=N/A";
              }
            };

            setTimeout(retryLoad, retryInterval);
          }}
          loading="lazy"
        />
        {item.duration && (
          <span className="absolute bottom-1 left-1 bg-black bg-opacity-60 text-white text-xs px-1 rounded">
            {item.duration}
          </span>
        )}
      </div>
    ))}
  </div>
);

const ReviewCard = ({ review }) => (
  <div className="border-t pt-4">
    <div className="flex items-center space-x-2 mb-2">
      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
        <span className="text-gray-600">{review.user[0]}</span>
      </div>
      <div>
        <span className="text-sm font-semibold text-gray-800">
          {review.user}
        </span>
        <StarRating rating={review.rating} starSize="w-4 h-4" />
      </div>
    </div>

    <div className="text-sm text-gray-600 mb-2">
      <span>{review.date}</span>
      {review.product && (
        <span className="ml-2">Phân loại hàng: {review.product}</span>
      )}
    </div>

    <p className="text-sm text-gray-700 mb-2">{review.comment}</p>

    {review.media.length > 0 && <ReviewMedia media={review.media} />}

    <div className="flex items-center text-sm text-gray-600">
      <svg
        className="w-4 h-4 mr-1"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
        />
      </svg>
      <span>{review.likes}</span>
    </div>
  </div>
);

const FilterButton = ({ label, count }) => (
  <button className="border border-gray-300 text-gray-600 text-sm px-3 py-1 rounded hover:bg-gray-100">
    {label}
    {count && <span> ({count})</span>}
  </button>
);

const ProductReviews = () => {
  const reviews = [
    {
      user: "a****6",
      rating: 5,
      date: "2024-06-27 13:08",
      product: "Gương 30*30 (1 mét)",
      comment:
        "Đúng với mô tả: ok\nChất lượng sản phẩm: tốt\nSản phẩm đẹp đúng như mô tả, đóng gói kỹ và giao hàng nhanh, rất tiện, dễ sử dụng. Tặng shop 5 sao",
      media: [
        {
          type: "video",
          url: "https://via.placeholder.com/100?text=Video",
          duration: "0:14",
        },
      ],
      likes: 30,
    },
    {
      user: "j****5",
      rating: 4,
      date: "2023-11-24 21:49",
      product: "",
      comment:
        "Bao bì bền ngoài rất gọn gàng và chắc chắn, nhiều quà sử dụng tốt, gương cũng có thể được nhìn thấy rất rõ ràng.",
      media: [
        {
          type: "video",
          url: "https://via.placeholder.com/100?text=Video1",
          duration: "0:15",
        },
        {
          type: "video",
          url: "https://via.placeholder.com/100?text=Video2",
          duration: "0:15",
        },
      ],
      likes: 0,
    },
  ];

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
          <FilterButton label="5 Sao" count="6,7K" />
          <FilterButton label="4 Sao" count="560" />
          <FilterButton label="3 Sao" count="289" />
          <FilterButton label="2 Sao" count="122" />
          <FilterButton label="1 Sao" count="286" />
          <FilterButton label="Có Bình Luận" count="3,1K" />
          <FilterButton label="Có Hình Ảnh / Video" count="1,6K" />
        </div>
      </div>

      <div className="space-y-6">
        {reviews.map((review, index) => (
          <ReviewCard key={index} review={review} />
        ))}
      </div>
    </div>
  );
};

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  starSize: PropTypes.string,
};

ReviewMedia.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      url: PropTypes.string.isRequired,
      duration: PropTypes.string,
    })
  ).isRequired,
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    user: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    date: PropTypes.string.isRequired,
    product: PropTypes.string,
    comment: PropTypes.string.isRequired,
    media: PropTypes.arrayOf(
      PropTypes.shape({
        type: PropTypes.string,
        url: PropTypes.string.isRequired,
        duration: PropTypes.string,
      })
    ).isRequired,
    likes: PropTypes.number.isRequired,
  }).isRequired,
};

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.string,
};

export default ProductReviews;
