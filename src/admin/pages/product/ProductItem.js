import Cookies from "js-cookie";
import Swal from "sweetalert2";
import { toast } from "react-toastify";

import { imageUrl } from "../../../api/config";

import apiProduct from "../../../api/apiProduct";

const ProductItem = ({ product, setLoading }) => {
  const accessToken = Cookies.get("accessToken");

  // const handleActiveProduct = async (productId) => {
  //   console.log("product id: " + productId);
  // };

  const handleBlockProduct = async (product) => {
    Swal.fire({
      title: `${product.blocked ? "Bỏ chặn" : "Chặn"}  sản phẩm này?`,
      text: `Sản phẩm sẽ ${product.blocked ? "" : "không"}  được hiển thị!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: `${product.blocked ? "Bỏ" : "Vẫn"}  chặn!`,
      cancelButtonText: `${product.blocked ? "Vẫn" : "Bỏ"} chặn!`,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await apiProduct.adminBlockProduct(product.id, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          });

          console.log(res);
          setLoading(true);

          toast.success(
            `${product.blocked ? "Bỏ chặn" : "Chặn"} sản phẩm thành công!`,
            {
              position: "top-right",
              autoClose: 2000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              style: {
                top: "-50%",
                transform: "translateY(50%)",
                marginRight: "2%",
                width: "fit-content",
              },
            }
          );
        } catch (error) {
          console.log(error);
        }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire({
          title: `${product.blocked ? "Vẫn" : "Bỏ"} chặn!`,
          text: `Sản phẩm ${product.blocked ? "không" : "vẫn"}  được hiển thị!`,
          icon: "error",
          timer: 1500,
          timerProgressBar: true,
          showConfirmButton: false,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            console.log("I was closed by the timer");
          }
        });
      }
    });
  };

  return (
    <div className="mt-4 px-2 py-3 rounded-lg border border-orange-600 last:border-b-0">
      <div className="flex items-center space-x-3">
        <img
          src={imageUrl + "product/" + product.productImages[0]}
          alt={product.productName}
          className="w-20 h-20 border border-red-500 object-cover"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = "https://placehold.co/40x40/cbd5e1/4b5563?text=AV";
          }}
        />
        <div className="w-full">
          <p className="font-medium text-gray-800 capitalize hover:text-blue-700 border-b border-red-500 pb-2 mb-2">
            {product.productName}
          </p>
          <p className="font-medium text-gray-800 capitalize hover:text-blue-700">
            Cửa hàng: {product.sellerUsername}
          </p>
          <p className="font-medium text-gray-800 capitalize hover:text-blue-700">
            Email: <span className="lowercase">{product.sellerEmail}</span>
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center space-x-4 ">
        <p className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors hover:border-blue-500">
          Đã bán {product.sold}
        </p>
        <p className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors hover:border-blue-500">
          Lượt xem {product.views}
        </p>
        <p className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors hover:border-blue-500">
          Giá bán {product.variants[0].price.toLocaleString()}
        </p>
        {product.variants[0]?.salePrice > 0 && (
          <p className="px-3 py-1 text-sm rounded-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors hover:border-blue-500">
            Giá KM {product.variants[0]?.salePrice?.toLocaleString()}
          </p>
        )}
        <p className="px-3 py-1 text-sm rounded-md border border-gray-300 text-red-500 hover:bg-gray-50 transition-colors hover:border-blue-500 hover:text-red-700">
          Doanh thu {product.revenue.toLocaleString()}
        </p>
      </div>
      <div className="mt-4 flex items-center space-x-4 border-t border-orange-300 pt-4 pb-2">
        <button
          className="border border-gray-500 hover:border-blue-500 p-2 rounded hover:bg-blue-500 hover:text-white capitalize"
          // onClick={() => handleActiveProduct(product.id)}
        >
          {" "}
          {product.isActive ? "Đang hoạt động" : "Tạm ngưng hoạt động"}{" "}
        </button>
        <button
          className={`${
            product.blocked
              ? "border-red-500 bg-red-500 text-white"
              : "border-gray-500 hover:border-blue-500 hover:bg-blue-500 hover:text-white"
          } p-2 rounded border capitalize`}
          onClick={() => handleBlockProduct(product)}
        >
          {" "}
          {product.blocked ? "Gỡ vi phạm" : "Không vi phạm"}{" "}
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
