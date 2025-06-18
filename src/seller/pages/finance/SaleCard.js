import { ChevronUp, ChevronDown } from "lucide-react";

const SalesCard = ({ title, value, percentage, type, icon: Icon }) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex-1 min-w-[280px]">
    <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center space-x-2">
        {type === "increase" ? (
          <ChevronUp className="text-green-500" size={20} />
        ) : (
          <ChevronDown className="text-red-500" size={20} />
        )}
        <span className="text-2xl font-bold text-gray-800">
          {value.toLocaleString()}
        </span>
      </div>
      <span
        className={`text-sm font-medium ${
          type === "increase" ? "text-green-500" : "text-red-500"
        }`}
      >
        {percentage}%
      </span>
    </div>
    <div className="w-full bg-gray-200 rounded-full h-2.5 mt-4">
      <div
        className={`${
          type === "increase" ? "bg-green-400" : "bg-red-400"
        } h-2.5 rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  </div>
);

export default SalesCard;
