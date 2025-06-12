import axiosInstance from "./axios";

const apiFile = {
  uploadFileProduct: (data) => {
    return axiosInstance.post(`files/upload`, data);
  },

  uploadFileReview: (data) => {
    return axiosInstance.post(`files/upload/review`, data);
  },
};

export default apiFile;
