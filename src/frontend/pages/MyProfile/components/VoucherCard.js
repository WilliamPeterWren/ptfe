import { calculateDurationReverse } from "../../../../utils/CountDate";

const VoucherCard = ({ voucher, data, index }) => {
  const getBorderColorClass = (type) => {
    switch (type) {
      case "Bất ngờ":
        return "border-orange-500";
      case "Giảm lẹ":
        return "border-red-500";
      case "Giảm 15k":
        return "border-purple-500";
      case "Mua nhiều":
        return "border-blue-500";
      case "Hè đến":
        return "border-yellow-500";
      default:
        return "border-gray-300";
    }
  };

  const getHeaderColorClass = (type) => {
    switch (type) {
      case "Giảm lẹ":
        return "bg-blue-500";
      case "Bất ngờ":
        return "bg-purple-500";
      case "Giảm 15k":
        return "bg-yellow-500";
      case "Mua nhiều":
        return "bg-red-500";
      case "Hè đến":
        return "bg-orange-500";
      default:
        return "bg-gray-400";
    }
  };

  const getIcon = (type) => {
    switch (type) {
      case "Hè đến":
      case "Giảm lẹ":
      case "Bất ngờ":
        return (
          <div className="bg-red-600 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.5 12a3.5 3.5 0 11-7 0 3.5 3.5 0 017 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19l-7 3.5v-18l7 3.5 7-3.5v18l-7-3.5z"
              />
            </svg>
          </div>
        );
      case "Giảm 15k":
      case "Mua nhiều":
        return (
          <div className="bg-red-600 p-2 rounded-full">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-white"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M14.752 11.168A3.75 3.75 0 0012 5.25a3.75 3.75 0 00-2.752 5.918l3.752 3.752 3.752-3.752z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 19.5v-3.75m0 0a3.75 3.75 0 003.75-3.75V12m-3.75 0a3.75 3.75 0 01-3.75-3.75V12"
              />
            </svg>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div
      key={index}
      className={`relative min-w-96 bg-white rounded-lg shadow-md overflow-hidden border-l-8 ${getBorderColorClass(
        voucher.name
      )}`}
    >
      {data?.length > 0 &&
        data.map((item) => {
          console.log(item);
          if (item.id === voucher.id && voucher.value > 0)
            return (
              <div>
                <div
                  className={`flex justify-between items-center p-3 text-white ${getHeaderColorClass(
                    item.name
                  )}`}
                >
                  <span className="text-sm font-semibold capitalize">
                    {item.name}
                  </span>
                  <span className="text-sm font-semibold capitalize">
                    x{item.count}
                  </span>
                </div>
                <div className="p-4 flex items-center space-x-4">
                  <div className="flex-shrink-0">{getIcon(item.name)}</div>
                  <div className="flex-grow">
                    <p className="text-lg font-bold text-gray-800">
                      Giảm tối đa {(item.value || item.price).toLocaleString()}{" "}
                      đ
                    </p>
                    <p className="text-sm text-gray-600">
                      Đơn Tối Thiểu{" "}
                      {((item.value || item.price) * 8).toLocaleString()}
                    </p>

                    {item.expiredAt && (
                      <p className="text-xs text-gray-500 mt-2">
                        Còn lại: {calculateDurationReverse(item.expiredAt)}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            );
        })}
    </div>
  );
};

export default VoucherCard;
