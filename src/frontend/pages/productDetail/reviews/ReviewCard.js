import StarRating from "./StarRating";
import ReviewMedia from "./ReviewMedia";
import PropTypes from "prop-types";

const ReviewCard = ({ review, variants }) => {
  const timestamp = review.createdAt;
  const date = new Date(timestamp);

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const formattedDay = day < 10 ? "0" + day : day;
  const formattedMonth = month < 10 ? "0" + month : month;

  const formattedDate = `${formattedDay}/${formattedMonth}/${year}`;

  return (
    <div className="border-t pt-4">
      <div className="flex items-center space-x-2 mb-2">
        <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
          <span className="text-gray-600">{review.userId}</span>
        </div>
        <div>
          <span className="text-sm font-semibold text-gray-800">
            {review.username}
          </span>
          <StarRating rating={review.star} starSize="w-4 h-4" />
        </div>
      </div>

      <div className="text-sm text-gray-600 mb-2">
        <span>{formattedDate}</span>
        <span> Phân loại hàng: </span>
        {variants.map((variant) => {
          if (variant.id === review.variantId)
            return (
              <span className="ml-2 text-red-500">{variant.variantName}</span>
            );
        })}
      </div>

      <p className="text-sm text-gray-700 mb-2">{review.comment}</p>

      {review.image.length > 0 && <ReviewMedia media={review.image} />}
    </div>
  );
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
export default ReviewCard;
