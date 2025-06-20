import { useState } from "react";
import { Link } from "react-router-dom";

import { imageUrl } from "../../../api/config";
import Pagination from "./Pagination";
import DetailModal from "./DetailModal";

const ProductGrid = ({
  flashsale,
  totalPages,
  currentPage,
  setCurrentPage,
}) => {
  const [productModal, setProductModal] = useState(false);
  const [productSlug, setProductSlug] = useState(null);

  const handleOpenProductModal = (slug) => {
    console.log(slug);
    setProductSlug(slug);
    setProductModal(!productModal);
  };

  return (
    <div>
      <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {flashsale?.length > 0 &&
          flashsale?.map((product, index) => {
            const imgUrl = imageUrl + "product/" + product.images[0];

            let totalRatingSum = 0;
            let totalVotes = 0;

            for (const ratingValue in product.rating) {
              if (Object.hasOwnProperty.call(product.rating, ratingValue)) {
                const count = product.rating[ratingValue];
                totalRatingSum += parseInt(ratingValue, 10) * count;
                totalVotes += count;
              }
            }

            let averageRating = 0;
            if (totalVotes > 0) {
              averageRating = totalRatingSum / totalVotes;
            }
            return (
              <div
                key={index}
                className="bg-white shadow-md rounded-lg overflow-hidden"
              >
                <Link to={`/product-detail/${product.slug}`}>
                  <img
                    src={imgUrl}
                    alt={product.productName}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    {product.discount && (
                      <span>
                        <span className="text-sm px-2 py-1 font-bold border border-red-500 rounded mr-2">
                          Giảm thêm
                        </span>
                        <span className="text-sm bg-orange-500 text-white px-2 py-1 rounded">
                          {product.discount.toLocaleString("de-DE")} đ
                        </span>
                      </span>
                    )}
                  </div>
                  <h3 className="h-16 text-sm font-semibold line-clamp-2">
                    {product.productName}
                  </h3>
                  <h3 className="h-8 text-yellow-500 text-sm font-semibold line-clamp-2">
                    {averageRating > 0 && averageRating.toFixed(1) + " ★"}
                  </h3>
                  {product.stock && (
                    <span className="text-red-500 text-xs border border-red-400 p-0.5 rounded">
                      Còn lại: {product.stock.toLocaleString("de-DE")}
                    </span>
                  )}
                  {product.salePrice > 0 ? (
                    <div>
                      <p className="h-8 text-md font-bold text-gray-500 mt-1 line-through">
                        {product.price.toLocaleString("de-DE")} đ
                      </p>
                      <p className="h-8 text-lg font-bold text-red-600 mt-1">
                        {product.salePrice.toLocaleString("de-DE")} đ
                      </p>
                    </div>
                  ) : (
                    <p className="h-16 text-lg font-bold text-red-600 mt-1">
                      {product.price.toLocaleString("de-DE")} đ
                    </p>
                  )}
                  <button
                    className="mt-2 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                    // onClick={() => handleAddToCart(product)}
                    onClick={() => handleOpenProductModal(product.slug)}
                  >
                    Thêm vào giỏ hàng
                  </button>
                </div>
              </div>
            );
          })}
      </div>

      {productModal && (
        <DetailModal
          productSlug={productSlug}
          productModal={productModal}
          setProductModal={setProductModal}
        />
      )}

      <div className="container mx-auto p-4">
        <Pagination
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
};

export default ProductGrid;
