import axiosInstance from "./axios";

const apiProduct = {
  getProductBySellerId: (sellerId) => {
    return axiosInstance.get(`/products/get-products/seller/${sellerId}`);
  },

  getProductById: (id) => {
    return axiosInstance.get(`/products/id/${id}`);
  },

  createProduct: (data, header) => {
    return axiosInstance.post(`/products`, data, header);
  },
};

export default apiProduct;
