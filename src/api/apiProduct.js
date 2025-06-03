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

  deleteProduct: (id, header) => {
    return axiosInstance.delete(`/products/${id}`, header);
  },

  updateProduct: (id, data, header) => {
    return axiosInstance.put(`/products/${id}`, data, header);
  },

  getRandomProducts: (limit) => {
    return axiosInstance.get(`/products/get/product/rand/limit/${limit}`);
  },

  getBySlug: (slug) => {
    return axiosInstance.get(`/products/slug/${slug}`);
  },

  getProductByPeterCategory: (peterCategoryId) => {
    return axiosInstance.get(`/products/get/product/peter/${peterCategoryId}`);
  },

  searchProductByProductName: (productName) => {
    return axiosInstance.get(
      `/products/search/product/productname/${productName}`
    );
  },
};

export default apiProduct;
