import { FaStore } from "react-icons/fa";
import ProductItem from "./ProductItem";
import { formatCurrency } from "../../../utils/FormatCurrency";

const SellerSection = (props) => {
  const {
    seller,
    peterVouchers,
    setPeterVoucher,
    peterVoucher,
    setPeterVoucherId,
  } = props;
  const sellerTotal = seller.items.reduce((sum, item) => {
    return (
      sum +
      (item.salePrice > 0 && item.salePrice !== item.price
        ? item.salePrice * item.quantity
        : item.price * item.quantity)
    );
  }, 0);

  const setPeterVoucherChange = (selected) => {
    setPeterVoucher(selected.value);
    setPeterVoucherId(selected.id);
  };

  const totalDiscount = seller.items.reduce((sum, item) => {
    return sum + item.discount * item.quantity;
  }, 0);

  const totalProduct = seller.items.reduce((sum, item) => {
    return sum + item.quantity;
  }, 0);

  return (
    <div className="bg-white p-6 mt-4 shadow-sm">
      <div className="flex items-center mb-4">
        <FaStore className="mr-2 text-orange-500" />
        <span className="font-semibold text-gray-800">
          {seller.sellerUsername}
        </span>
      </div>
      {seller.items.map((item) => {
        return (
          <ProductItem key={item.productId + item.variantId} item={item} />
        );
      })}
      <div className="flex items-center justify-between mt-4 border-t border-gray-200 pt-4">
        <div></div>
        <div className="text-right">
          <p className="text-sm text-gray-500">
            Tổng số tiền ({totalProduct} sản phẩm):
          </p>
          <p className="text-lg text-orange-500 font-semibold">
            {formatCurrency(sellerTotal - peterVoucher - totalDiscount)}
          </p>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <div className="flex justify-between items-center">
          <p>Peter Voucher</p>
          <select
            className="w-80 px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 text-base appearance-none bg-white pr-10"
            onChange={(e) => {
              const selected = JSON.parse(e.target.value);
              setPeterVoucherChange(selected);
            }}
          >
            {peterVouchers.length > 0 &&
              peterVouchers.map((item, index) => {
                if (item.value * 8 < sellerTotal)
                  return (
                    <option
                      key={index}
                      value={JSON.stringify({ id: item.id, value: item.value })}
                    >
                      {item.name}{" "}
                      <span className="text-blue-500">
                        {item.value.toLocaleString()}
                      </span>
                    </option>
                  );
              })}
          </select>
        </div>
        <p className="flex justify-between items-center mt-2">
          Tổng số tiền thanh toán{" "}
          <span className="font-semibold text-orange-500">
            {formatCurrency(sellerTotal - peterVoucher - totalDiscount)}
          </span>
        </p>
      </div>
    </div>
  );
};

export default SellerSection;
