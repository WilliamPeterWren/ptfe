import { ChevronUp, ChevronDown } from "lucide-react";

const SalesCard = ({ title, value, percentage, type, icon: Icon }) => (
  <div className="bg-gray-50 border border-gray-400 hover:border-indigo-500 p-6 rounded-lg shadow-sm flex-1 min-w-[280px] hover:bg-indigo-50 shadow-md">
    <h3 className="text-lg font-semibold text-red-700">{title}</h3>
    <div className="flex items-center justify-between mt-2">
      <div className="flex items-center space-x-2">
        {type === "increase" ? (
          <ChevronUp className="text-green-500" size={20} />
        ) : (
          <ChevronDown className="text-red-500" size={20} />
        )}
        <span className="text-2xl font-bold text-blue-800">
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
  </div>
);

export default SalesCard;
