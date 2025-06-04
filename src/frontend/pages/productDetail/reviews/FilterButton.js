import PropTypes from "prop-types";

const FilterButton = ({ label, count }) => (
  <button className="border border-gray-300 text-gray-600 text-sm px-3 py-1 rounded hover:bg-gray-100">
    {label}
    {count && <span> ({count})</span>}
  </button>
);

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  count: PropTypes.string,
};

export default FilterButton;
