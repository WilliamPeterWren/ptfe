import axiosInstance from "./axios";

const apiReview = {
  getReview: (productId) => {
    return axiosInstance.get(`reviews/get/reviews/product/id/${productId}`);
  },
};

export default apiReview;
