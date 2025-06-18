import { imageUrl } from "../../../api/config";

const BestSoldItem = ({ product }) => (
  <div className=" py-3 border-b border-gray-100 last:border-b-0">
    <div className="flex items-center space-x-3">
      <img
        src={imageUrl + "product/" + product.productImages[0]}
        alt={product.productName}
        className="w-10 h-10 rounded-full object-cover"
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = "https://placehold.co/40x40/cbd5e1/4b5563?text=AV";
        }}
      />
      <div className="w-full">
        <p className="font-medium text-gray-800 capitalize">
          {product.productName}
        </p>
        <p className="text-sm text-gray-500">
          {product.description.slice(0, 200)}
        </p>
      </div>
    </div>
    <div className="mt-4 flex items-center space-x-4 ">
      <p className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
        Đã bán {product.sold}
      </p>
      <p className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
        Lượt xem {product.views}
      </p>
      <p className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
        Giá bán {product.variants[0].price.toLocaleString()}
      </p>
      {product.variants[0]?.salePrice > 0 && (
        <p className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
          Giá KM {product.variants[0]?.salePrice?.toLocaleString()}
        </p>
      )}
    </div>
  </div>
);

export default BestSoldItem;
