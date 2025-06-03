import {
  FaMapMarkerAlt,
  FaQuestionCircle,
  FaChevronDown,
  FaStore,
} from "react-icons/fa";
import { MdOutlineLocalShipping } from "react-icons/md";
import ProductItem from "./ProductItem";
import { formatCurrency } from "../utils/FormatCurrency";

const SellerSection = ({ seller }) => {
  const sellerTotal = seller.items.reduce((sum, item) => {
    return (
      sum +
      (item.salePrice > 0 && item.salePrice !== item.price
        ? item.salePrice * item.quantity
        : item.price * item.quantity)
    );
  }, 0);

  return (
    <div className="bg-white p-6 mt-4 shadow-sm">
      <div className="flex items-center mb-4">
        <FaStore className="mr-2 text-orange-500" />
        <span className="font-semibold text-gray-800">
          {seller.sellerUsername}
        </span>
      </div>
      {seller.items.map((item) => (
        <ProductItem key={item.productId + item.variantId} item={item} />
      ))}
      <div className="flex items-center justify-between mt-4 border-t border-gray-200 pt-4">
        <div className="flex items-center text-gray-500 text-sm">
          <MdOutlineLocalShipping className="mr-1 text-orange-500 text-lg" />
          Đơn vị vận chuyển: Đơn vị vận chuyển tiêu chuẩn
          <button className="text-blue-500 text-xs ml-2 hover:underline">
            (THAY ĐỔI)
          </button>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            Tổng số tiền ({seller.items.length} sản phẩm):
          </p>
          <p className="text-lg text-orange-500 font-semibold">
            {formatCurrency(sellerTotal)}
          </p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p className="flex justify-between items-center">
          Peter Voucher <button className="text-blue-500">Chọn Voucher</button>
        </p>
        <p className="flex justify-between items-center mt-2">
          Tổng số tiền thanh toán{" "}
          <span className="font-semibold text-orange-500">
            {formatCurrency(sellerTotal)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SellerSection;
