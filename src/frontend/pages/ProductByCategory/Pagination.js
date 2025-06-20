const Pagination = (props) => {
  const { totalPages, currentPage, setCurrentPage } = props;

  const displayCurrentPage = currentPage + 1;

  const handlePageChange = (page) => {
    setCurrentPage(page - 1);
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(
      1,
      displayCurrentPage - Math.floor(maxVisiblePages / 2)
    );
    let endPage = Math.min(
      totalPages,
      displayCurrentPage + Math.floor(maxVisiblePages / 2)
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      if (startPage === 1) {
        endPage = Math.min(totalPages, maxVisiblePages);
      } else if (endPage === totalPages) {
        startPage = Math.max(1, totalPages - maxVisiblePages + 1);
      }
    }

    if (startPage > 1) {
      pageNumbers.push(
        <button
          key={1}
          onClick={() => handlePageChange(1)}
          className={`px-3 py-1 rounded ${
            displayCurrentPage === 1
              ? "bg-red-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          1
        </button>
      );
      if (startPage > 2) {
        pageNumbers.push(
          <span key="start-ellipsis" className="px-2">
            ...
          </span>
        );
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          onClick={() => handlePageChange(i)}
          className={`px-3 py-1 rounded ${
            displayCurrentPage === i
              ? "bg-red-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          {i}
        </button>
      );
    }

    if (endPage < totalPages) {
      if (endPage < totalPages - 1) {
        pageNumbers.push(
          <span key="end-ellipsis" className="px-2">
            ...
          </span>
        );
      }
      pageNumbers.push(
        <button
          key={totalPages}
          onClick={() => handlePageChange(totalPages)}
          className={`px-3 py-1 rounded ${
            displayCurrentPage === totalPages
              ? "bg-red-500 text-white"
              : "bg-white text-gray-700 hover:bg-gray-200"
          }`}
        >
          {totalPages}
        </button>
      );
    }

    return pageNumbers;
  };

  return (
    <div className="flex items-center justify-center space-x-2 p-4 bg-gray-100 rounded-lg shadow-sm">
      <button
        onClick={() => handlePageChange(displayCurrentPage - 1)}
        disabled={displayCurrentPage === 1}
        className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
      >
        &lt;
      </button>
      {renderPageNumbers()}
      <button
        onClick={() => handlePageChange(displayCurrentPage + 1)}
        disabled={displayCurrentPage === totalPages}
        className="px-3 py-1 rounded bg-white text-gray-700 hover:bg-gray-200 disabled:opacity-50"
      >
        &gt;
      </button>
    </div>
  );
};

export default Pagination;
