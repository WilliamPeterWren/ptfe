import axiosInstance from "./axios";

const apiReview = {
  getReview: (productId) => {
    return axiosInstance.get(`reviews/get/reviews/product/id/${productId}`);
  },
  create: (data, header) => {
    return axiosInstance.post(`reviews`, data, header);
  },
};

export default apiReview;
