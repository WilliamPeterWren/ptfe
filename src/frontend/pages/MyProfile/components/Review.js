import React, { useState, useEffect } from "react";
import { Star, Upload, X, Send } from "lucide-react";
import { imageUrl } from "../../../../api/config";

function Review(props) {
  const { openModal, setOpenModal, order } = props;

  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);

  useEffect(() => {
    if (openModal) {
      console.log("Order for review:", order);
      setRating(0);
      setComment("");
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  }, [openModal, order]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      setImagePreviewUrl(URL.createObjectURL(file));
    } else {
      setSelectedImage(null);
      setImagePreviewUrl(null);
    }
  };

  useEffect(() => {
    return () => {
      if (imagePreviewUrl) {
        URL.revokeObjectURL(imagePreviewUrl);
      }
    };
  }, [imagePreviewUrl]);

  const handleSubmit = () => {
    console.log("Submitting review:");
    console.log("Order ID:", order?.id);
    console.log("Rating:", rating);
    console.log("Comment:", comment);
    console.log("Selected Image:", selectedImage);

    setOpenModal(false);
  };

  const handleCancel = () => {
    setOpenModal(false);
  };

  if (!openModal) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto relative transform transition-all sm:my-8 sm:w-full">
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

        {/* Scrollable area for order items */}
        {order?.items && order.items.length > 0 && (
          <div className="max-h-96 overflow-y-auto pr-2">
            {" "}
            {/* Added max-h-96 and overflow-y-auto */}
            {order.items.map((item, index) => {
              return (
                <div
                  key={index}
                  className="mb-6 border-b pb-4 last:border-b-0 last:pb-0"
                >
                  {" "}
                  {/* Added border-b for separation */}
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
                                starValue <= (hoverRating || rating)
                                  ? "text-yellow-400 fill-yellow-400"
                                  : "text-gray-300"
                              }
                            `}
                            onClick={() => setRating(starValue)}
                            onMouseEnter={() => setHoverRating(starValue)}
                            onMouseLeave={() => setHoverRating(0)}
                          />
                        );
                      })}
                    </div>
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor={`comment-${index}`} // Unique ID for each textarea
                      className="block text-gray-700 text-sm font-bold mb-2"
                    >
                      Bình luận của bạn:
                    </label>
                    <textarea
                      id={`comment-${index}`}
                      className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:ring-2 focus:ring-orange-300 focus:border-transparent h-24 resize-none"
                      placeholder="Viết đánh giá của bạn về sản phẩm..."
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                    ></textarea>
                  </div>
                  <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2">
                      Thêm hình ảnh (tùy chọn):
                    </label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                      id={`image-upload-${index}`} // Unique ID for each file input
                    />
                    <label
                      htmlFor={`image-upload-${index}`}
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
                          onClick={() => {
                            setSelectedImage(null);
                            setImagePreviewUrl(null);
                          }}
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
        )}

        <div className="flex justify-end space-x-4 mt-6">
          {" "}
          {/* Added mt-6 for spacing from scrollable area */}
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
