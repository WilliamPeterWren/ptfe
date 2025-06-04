import PropTypes from "prop-types";

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

StarRating.propTypes = {
  rating: PropTypes.number.isRequired,
  starSize: PropTypes.string,
};

export default StarRating;
