import { imageUrl } from "../../../../api/config";
import PropTypes from "prop-types";

const ReviewMedia = ({ media }) => (
  <div className="flex space-x-2 mb-2">
    <img
      src={media}
      alt={`Media ${media}`}
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
            target.src = imageUrl + "review/" + `${media}?retry=${retryCount}`;
            target.onerror = () => {
              setTimeout(retryLoad, retryInterval);
            };
          } else {
            target.src = "https://placehold.co/32x32/cccccc/333333?text=N/A";
          }
        };

        setTimeout(retryLoad, retryInterval);
      }}
      loading="lazy"
    />
  </div>
);

ReviewMedia.propTypes = {
  media: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.string,
      url: PropTypes.string.isRequired,
      duration: PropTypes.string,
    })
  ).isRequired,
};

export default ReviewMedia;
