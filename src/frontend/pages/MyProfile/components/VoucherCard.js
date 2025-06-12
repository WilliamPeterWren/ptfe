import { calculateDurationReverse } from "../../../../utils/CountDate";

const VoucherCard = ({ voucher, data }) => {
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

  // const result = Object.entries(data).map(([id, value]) => ({
  //   id,
  //   value,
  // }));

  // console.log(data)

  return (
    <div
      className={`relative min-w-96 bg-white rounded-lg shadow-md overflow-hidden border-l-8 ${getBorderColorClass(
        voucher.name
      )}`}
    >
      <div
        className={`flex justify-between items-center p-3 text-white ${getHeaderColorClass(
          voucher.name
        )}`}
      >
        <span className="text-sm font-semibold capitalize">{voucher.name}</span>
        {data?.length > 0 &&
          data?.map((item) => {
            if (item.id === voucher.id)
              return (
                <span className="text-sm font-semibold">x{item.value} </span>
              );
          })}
      </div>
      <div className="p-4 flex items-center space-x-4">
        <div className="flex-shrink-0">{getIcon(voucher.name)}</div>
        <div className="flex-grow">
          <p className="text-lg font-bold text-gray-800">
            Giảm tối đa {(voucher.value || voucher.price).toLocaleString()} đ
          </p>
          <p className="text-sm text-gray-600">
            Đơn Tối Thiểu{" "}
            {((voucher.value || voucher.price) * 8).toLocaleString()}
          </p>
          {voucher.liveExclusive && (
            <p className="text-red-500 text-sm font-semibold">
              Chỉ có trên Live
            </p>
          )}
          {voucher.contentXtra && (
            <p className="text-red-500 text-sm font-semibold">
              Content Xtra trên Live
            </p>
          )}
          {voucher.progress && (
            <div className="w-full bg-gray-200 rounded-full h-2.5 mt-2">
              <div
                className="bg-green-500 h-2.5 rounded-full"
                style={{ width: voucher.progress }}
              ></div>
            </div>
          )}
          {voucher.expiredAt && (
            <p className="text-xs text-gray-500 mt-2">
              Còn lại: {calculateDurationReverse(voucher.expiredAt)}
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default VoucherCard;
