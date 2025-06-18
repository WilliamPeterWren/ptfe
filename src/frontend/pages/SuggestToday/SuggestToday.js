import React, { useEffect, useState, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import apiProduct from "../../../api/apiProduct";
import { imageUrl } from "../../../api/config";

function SuggestToday() {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const loaderRef = useRef(null);

  const productsPerPage = 18;

  const getProducts = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await apiProduct.getRandomProducts(productsPerPage, page);
      console.log(res.data);
      if (res.data.length === 0) {
        setHasMore(false);
      } else {
        setProducts((prevProducts) => [...prevProducts, ...res.data]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  }, [page, loading, hasMore]);

  useEffect(() => {
    if (!loaderRef.current || !hasMore) return;

    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.1,
    };

    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !loading && hasMore) {
        getProducts();
      }
    }, options);

    observer.observe(loaderRef.current);

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
      observer.disconnect();
    };
  }, [getProducts, loading, hasMore]);

  const pageTitle = "Gợi ý hôm nay";

  useEffect(() => {
    document.title = pageTitle;

    return () => {
      document.title = "Peter Microservice";
    };
  }, [pageTitle]);

  return (
    <div className="container mx-auto py-6 px-4 font-sans">
      {" "}
      <div className="flex justify-center items-center mb-8 w-full">
        <hr className="flex-1 border-t border-gray-300 rounded-full" />{" "}
        <h2 className="text-xl sm:text-2xl font-bold uppercase bg-red-600 rounded-lg p-3 sm:p-4 text-white shadow-lg tracking-wide">
          {" "}
          Gợi Ý Hôm Nay
        </h2>
        <hr className="flex-1 border-t border-gray-300 rounded-full" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {" "}
        {products.map((product, index) => {
          const imgUrl =
            product.productImages && product.productImages.length > 0
              ? imageUrl + "product/" + product.productImages[0]
              : "https://placehold.co/200x200/cccccc/333333?text=No+Image";

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
            <Link
              to={`/product-detail/${product.slug}`}
              key={index}
              className="border border-gray-200 rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300 transform hover:-translate-y-1 bg-white"
            >
              <img
                src={imgUrl}
                alt={product.productName}
                className="w-full h-48 object-cover rounded-t-xl"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src =
                    "https://placehold.co/200x200/cccccc/333333?text=Image+Error";
                }}
                loading="lazy"
              />
              <div className="p-3">
                {" "}
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs bg-indigo-100 text-indigo-700 px-2 py-0.5 rounded-full font-medium truncate">
                    {" "}
                    {product.description.slice(0, 25)}
                    {product.description.length > 25 ? "..." : ""}
                  </span>
                  {product.variants[0]?.salePrice > 0 &&
                    product.variants[0]?.price >
                      product.variants[0]?.salePrice && (
                      <span className="text-xs text-red-600 ml-1 rounded-full p-1 border border-red-500 bg-red-100 font-semibold">
                        {Math.round(
                          ((product.variants[0].price -
                            product.variants[0].salePrice) /
                            product.variants[0].price) *
                            100
                        )}
                        % OFF
                      </span>
                    )}
                </div>
                <p className="text-sm font-semibold text-gray-800 line-clamp-2 mt-2 leading-tight">
                  {product.productName}
                </p>
                <p className="h-8 text-sm text-yellow-500 line-clamp-2">
                  {averageRating > 0 && averageRating.toFixed(1) + " ★"}
                </p>
                {product.discount > 0 && (
                  <p className="text-sm font-semibold text-orange-800 line-clamp-2 mt-2 leading-tight rounded ">
                    Shop giảm
                    <span className=" text-orange-600 ml-2">
                      {product.discount.toLocaleString()}
                    </span>
                  </p>
                )}
                {product.variants[0]?.salePrice > 0 ? (
                  <p className="text-md font-bold text-red-600 flex justify-between items-baseline mt-2">
                    <span className="line-through text-gray-400 text-sm">
                      {product.variants[0].price.toLocaleString("vi-VN")}
                    </span>
                    <span className="ml-2">
                      {product.variants[0].salePrice.toLocaleString("vi-VN")}{" "}
                    </span>
                  </p>
                ) : (
                  <p className="text-md font-bold text-green-700 mt-2">
                    {product.variants[0]?.price.toLocaleString("vi-VN")}
                  </p>
                )}
                <p className="text-xs text-gray-600 mt-1">
                  Kho: {product.variants[0]?.stock.toLocaleString()}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
      {hasMore && (
        <div ref={loaderRef} className="py-8 flex justify-center items-center">
          {loading ? (
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
          ) : (
            <p className="text-gray-500">Kéo xuống để tải thêm...</p>
          )}
        </div>
      )}
      {!hasMore && products.length > 0 && (
        <div className="flex justify-center py-8">
          <p className="text-gray-600 text-lg font-medium">
            Bạn đã xem hết tất cả sản phẩm.
          </p>
        </div>
      )}
    </div>
  );
}

export default SuggestToday;
