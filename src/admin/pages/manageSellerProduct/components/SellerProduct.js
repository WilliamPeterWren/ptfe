import apiProduct from "../../../../api/apiProduct";
import { imageUrl } from "../../../../api/config";

const SellerProduct = ({ product, accessToken, setLoading }) => {
  const handleBlockProduct = async (productId) => {
    console.log("product id: " + productId);
    try {
      const res = await apiProduct.adminBlockProduct(productId, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log(res);
      setLoading(true);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className=" py-3 border-b border-red-300 last:border-b-0 flex justify-items">
      <div className="w-3/4">
        <div className="flex justify-items space-x-3">
          <div>
            {product.productImages.map((item, _) => {
              return (
                <img
                  key={_}
                  src={imageUrl + "product/" + item}
                  alt={product.productName + _}
                  className="w-28 h-28 border border-red-500 object-cover mt-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src =
                      "https://placehold.co/40x40/cbd5e1/4b5563?text=AV";
                  }}
                />
              );
            })}
          </div>
          <div className="w-full">
            <p className="font-medium text-gray-800 capitalize whitespace-pre-line">
              {product.productName}
            </p>
            <p className=" text-sm text-gray-500 whitespace-pre-line">
              {product.description}
            </p>
          </div>
        </div>
      </div>
      <div className="border-l border-blue-500 pl-4 ml-2 w-1/4">
        <p className="font-semibold text-yellow-600 border-b border-indigo-700 pb-2">
          Thông tin
        </p>
        <p className="mt-4 px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors">
          Đã bán {product.sold}
        </p>
        <p className="mt-2 px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors">
          Lượt xem {product.views}
        </p>
        <p className="mt-2 px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors">
          Giá bán {product.variants[0].price.toLocaleString()}
        </p>
        {product.variants[0]?.salePrice > 0 && (
          <p className="mt-2 px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-blue-500 hover:text-white transition-colors">
            Giá KM {product.variants[0]?.salePrice?.toLocaleString()}
          </p>
        )}

        <p className="my-4 font-semibold text-yellow-600 border-b border-indigo-700 pb-2">
          Thao tác
        </p>
        <button
          className={`${
            product.blocked
              ? "bg-red-500 text-white hover:bg-red-700"
              : "border-blue-500 hover:border-orange-500 hover:text-orange-500"
          } border   p-2 rounded-lg`}
          onClick={() => handleBlockProduct(product.id)}
        >
          {" "}
          {product.blocked ? "Đã chặn sản phẩm" : "Chặn sản phẩm"}{" "}
        </button>
      </div>
    </div>
  );
};

export default SellerProduct;
