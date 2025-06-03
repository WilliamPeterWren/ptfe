import { formatCurrency } from "../utils/FormatCurrency";
import { imageUrl } from "../../../api/config";

const ProductItem = ({ item }) => (
  <div className="flex items-center py-4 border-b border-gray-200 last:border-b-0">
    <img
      src={imageUrl + "product/" + item.image}
      alt={item.image}
      className="w-28 h-28 object-cover mr-4"
    />
    <div className="flex-grow">
      <p className="text-sm font-medium">{item.productName}</p>
      {item.variantName && (
        <p className="text-xs text-gray-500">Phân loại: {item.variantName}</p>
      )}
    </div>
    <div className="flex items-center space-x-6">
      <span className="text-gray-700 text-sm">
        {item.salePrice > 0 && item.salePrice !== item.price ? (
          <>
            <span className="line-through text-gray-400 mr-1">
              {formatCurrency(item.price)}
            </span>
            <span className="text-orange-500">
              {formatCurrency(item.salePrice)}
            </span>
          </>
        ) : (
          formatCurrency(item.price)
        )}
      </span>
      <span className="text-gray-700 text-sm">x{item.quantity}</span>
      <span className="text-orange-500 font-semibold text-sm">
        {formatCurrency(
          item.salePrice > 0 && item.salePrice !== item.price
            ? item.salePrice * item.quantity
            : item.price * item.quantity
        )}
      </span>
    </div>
  </div>
);

export default ProductItem;
