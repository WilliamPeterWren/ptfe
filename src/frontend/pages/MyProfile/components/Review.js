import React, { useState, useEffect } from "react";
import { Star, Upload, X, Send } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import Cookies from "js-cookie";
import Swal from "sweetalert2";

import { imageUrl } from "../../../../api/config";
import apiReview from "../../../../api/apiReview";

function Review(props) {
  const { openModal, setOpenModal, order, setShowReview } = props;
  const accessToken = Cookies.get("accessToken");

  const [productReviews, setProductReviews] = useState({});

  useEffect(() => {
    if (openModal && order?.items) {
      const initialReviews = {};
      order.items.forEach((item) => {
        if (!item.alreadyReview) {
          initialReviews[`${item.productId}-${item.variantId}`] = {
            rating: 0,
            comment: "",
            selectedImage: null,
            imagePreviewUrl: null,
          };
        }
      });
      setProductReviews(initialReviews);
    }
  }, [openModal, order]);

  useEffect(() => {
    return () => {
      Object.values(productReviews).forEach((review) => {
        if (review.imagePreviewUrl) {
          URL.revokeObjectURL(review.imagePreviewUrl);
        }
      });
    };
  }, [productReviews]);

  const handleRatingChange = (itemId, value) => {
    setProductReviews((prevReviews) => ({
      ...prevReviews,
      [itemId]: { ...prevReviews[itemId], rating: value },
    }));
  };

  const handleCommentChange = (itemId, value) => {
    setProductReviews((prevReviews) => ({
      ...prevReviews,
      [itemId]: { ...prevReviews[itemId], comment: value },
    }));
  };

  const handleImageChange = (itemId, event) => {
    const file = event.target.files[0];
    setProductReviews((prevReviews) => {
      const currentImagePreviewUrl = prevReviews[itemId]?.imagePreviewUrl;
      if (currentImagePreviewUrl) {
        URL.revokeObjectURL(currentImagePreviewUrl);
      }
      return {
        ...prevReviews,
        [itemId]: {
          ...prevReviews[itemId],
          selectedImage: file,
          imagePreviewUrl: file ? URL.createObjectURL(file) : null,
        },
      };
    });
  };

  const handleRemoveImage = (itemId) => {
    setProductReviews((prevReviews) => {
      const currentImagePreviewUrl = prevReviews[itemId]?.imagePreviewUrl;
      if (currentImagePreviewUrl) {
        URL.revokeObjectURL(currentImagePreviewUrl);
      }
      return {
        ...prevReviews,
        [itemId]: {
          ...prevReviews[itemId],
          selectedImage: null,
          imagePreviewUrl: null,
        },
      };
    });
  };

  const handleSubmit = async () => {
    for (const item of order.items) {
      const itemId = `${item.productId}-${item.variantId}`;
      const reviewData = productReviews[itemId];

      if (reviewData && !item.alreadyReview) {
        const { rating, comment, selectedImage } = reviewData;

        let uuidFileName = null;
        if (selectedImage) {
          const formData = new FormData();
          uuidFileName = uuidv4() + "_" + selectedImage.name;
          formData.append("files", selectedImage, uuidFileName);

          try {
            await fetch("http://localhost:8889/api/files/upload/review", {
              method: "POST",
              body: formData,
            });
            // await apiFile.uploadFileReview(formData);
          } catch (error) {
            console.error("Error uploading image for review:", error);
            continue;
          }
        }

        const dataReview = {
          userId: order?.userId,
          productId: item.productId,
          variantId: item.variantId,
          orderId: order?.id,
          comment,
          image: uuidFileName,
          star: rating,
        };

        console.log(
          `Submitting review for product ${item.productName}:`,
          dataReview
        );

        await apiReview
          .create(dataReview, {
            headers: {
              Authorization: `Bearer ${accessToken}`,
            },
          })
          .then((res) => {
            console.log(res);
            setShowReview(false);
            Swal.fire({
              title: "Đánh giá thành công!",
              text: "Đánh giá đã được ghi nhận",
              icon: "success",
              timer: 1500,
              timerProgressBar: true,
              showConfirmButton: false,
            });
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }

    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  if (!openModal) {
    return null;
  }

  const itemsToReview =
    order?.items?.filter((item) => !item.alreadyReview) || [];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className=" bg-white rounded-lg shadow-xl p-6 w-full max-w-lg mx-auto relative transform transition-all md:my-8 md:w-full">
        <button
          onClick={handleCancel}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors duration-200"
          aria-label="Close review modal"
        >
          <X size={24} />
        </button>

        <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
          Đánh giá sản phẩm
        </h2>

        {itemsToReview.length > 0 ? (
          <div className="max-h-96 overflow-y-auto pr-2">
            {itemsToReview.map((item) => {
              const itemId = `${item.productId}-${item.variantId}`;
              const { rating, comment, imagePreviewUrl } =
                productReviews[itemId] || {}; // Get current review data for this item

              return (
                <div
                  key={itemId}
                  className="mb-6 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  <div className="flex items-center mb-4 p-2 bg-gray-50 rounded-md">
                    <img
                      src={imageUrl + "product/" + item.image}
                      alt={item.productName}
                      className="w-12 h-12 object-cover rounded-md mr-3"
                    />
                    <div>
                      <p className="font-semibold text-gray-700">
                        {item.productName}
                      </p>
                      <p className="text-sm text-gray-500">
                        {item.variantName}
                      </p>
                    </div>
                  </div>
                  <div className="mb-4 text-center">
                    <p className="text-gray-700 mb-2">Chất lượng sản phẩm:</p>
                    <div className="flex justify-center space-x-1">
                      {[...Array(5)].map((_, index) => {
                        const starValue = index + 1;
                        return (
                          <Star
                            key={starValue}
                            size={32}
                            className={`cursor-pointer transition-colors duration-200
                              ${
                                starValue <= rating
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }
                            `}
                            onClick={() =>
                              handleRatingChange(itemId, starValue)
                            }
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`comment-${itemId}`}
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Bình luận của bạn:
                    </label>
                    <textarea
                      id={`comment-${itemId}`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent h-24 resize-none"
                      placeholder="Viết đánh giá của bạn về sản phẩm..."
                      value={comment || ""}
                      onChange={(e) =>
                        handleCommentChange(itemId, e.target.value)
                      }
                    ></textarea>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Thêm hình ảnh (tùy chọn):
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageChange(itemId, e)}
                      className="hidden"
                      id={`image-upload-${itemId}`}
                    />
                    <label
                      htmlFor={`image-upload-${itemId}`}
                      className="cursor-pointer bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md inline-flex items-center transition-colors duration-200"
                    >
                      <Upload size={20} className="mr-2" />
                      Chọn ảnh
                    </label>
                    {imagePreviewUrl && (
                      <div className="mt-4 relative w-32 h-32 border border-gray-300 rounded-md overflow-hidden">
                        <img
                          src={imagePreviewUrl}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                        <button
                          onClick={() => handleRemoveImage(itemId)}
                          className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs"
                          aria-label="Remove image"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <p className="text-center text-gray-600">
            Tất cả sản phẩm trong đơn hàng này đã được đánh giá.
          </p>
        )}

        <div className="flex justify-end space-x-4 mt-6">
          <button
            onClick={handleCancel}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-md transition-colors duration-200 inline-flex items-center"
          >
            <X size={20} className="mr-2" />
            Hủy
          </button>
          <button
            onClick={handleSubmit}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-md transition-colors duration-200 inline-flex items-center"
          >
            <Send size={20} className="mr-2" />
            Gửi đánh giá
          </button>
        </div>
      </div>
    </div>
  );
}

export default Review;
