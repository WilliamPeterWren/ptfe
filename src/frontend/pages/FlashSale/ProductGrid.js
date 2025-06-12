import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import { useSelector, useDispatch } from "react-redux";

import {
  TOTAL_DISCOUNT,
  SET_CART_FROM_API,
} from "../../../redux/action/cartAction";
import apiFlashSale from "../../../api/apiFlashSale";
import { imageUrl } from "../../../api/config";
import Pagination from "./Pagination";
import apiCart from "../../../api/apiCart";
import DetailModal from "./DetailModal";

const ProductGrid = ({ currentFlashSale }) => {
  const accessToken = Cookies.get("accessToken");
  const dispatch = useDispatch();

  const [flashsale, setFlashsale] = useState([]);
  // const [page, setPage] = useState(0);
  const [size, setSize] = useState(8);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [productModal, setProductModal] = useState(false);
  const [productSlug, setProductSlug] = useState(null);

  const getProductByFlashsaleIdPage = async () => {
    // console.log(currentFlashSale);
    if (currentFlashSale !== undefined) {
      await apiFlashSale
        .getProductByFlashsaleIdPageable(currentFlashSale, currentPage, size)
        .then((res) => {
          const data = res.data.result;
          // console.log(data);
          setCurrentPage(data.number);
          setTotalPages(data.totalPages);
          setFlashsale(data.content);
        })
        .catch((err) => console.log(err));
    }
  };

  useEffect(() => {
    getProductByFlashsaleIdPage();
  }, [currentFlashSale, currentPage]);

  const handleAddToCart = async (product) => {
    // console.log(productData.variants);
    const data = {
      sellerId: product.sellerId,
      variantId: product.variants[0].id,
      quantity: 1,
    };

    console.log(data);

    await apiCart
      .addToCart(data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          // "Content-Type": "application/json",
        },
      })
      .then((res) => {
        const data = res.data.result;

        console.log(data);

        Swal.fire({
          title: "Thành công",
          text: "Sản phẩm đã thêm vào giỏ hàng",
          icon: "success",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });

        const sorted1 = [...data].sort(
          (a, b) =>
            new Date(b.itemResponses.updatedAt) -
            new Date(a.itemResponses.updatedAt)
        );

        console.log(sorted1);

        const sorted2 = [...sorted1].sort(
          (a, b) => new Date(b.updatedAt) - new Date(a.updatedAt)
        );

        console.log(sorted2);

        dispatch(SET_CART_FROM_API(sorted2));
        dispatch(TOTAL_DISCOUNT());
      })
      .catch((err) => {
        console.log(err);
        Swal.fire({
          title: "Thêm vào giỏ hàng thất bại!",
          text: "Sản phẩm chưa được thêm vào giỏ hàng! Kiểm tra API!",
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      });
  };

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

      {productModal && <DetailModal productSlug={productSlug} productModal={productModal} setProductModal={setProductModal}  />}

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
