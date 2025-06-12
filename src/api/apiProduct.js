import axiosInstance from "./axios";

const apiProduct = {
  getProductBySellerId: (sellerId, page) => {
    return axiosInstance.get(
      `/products/get-products/seller/${sellerId}?page=${page}`
    );
  },

  getProductById: (id) => {
    return axiosInstance.get(`/products/id/${id}`);
  },

  createProduct: (data, header) => {
    return axiosInstance.post(`/products/seller`, data, header);
  },

  deleteProduct: (id, header) => {
    return axiosInstance.delete(`/products/seller/${id}`, header);
  },

  updateProduct: (id, data, header) => {
    return axiosInstance.put(`/products/seller/${id}`, data, header);
  },

  getRandomProducts: (limit) => {
    return axiosInstance.get(`/products/get/product/rand/limit/${limit}`);
  },

  getBySlug: (slug) => {
    return axiosInstance.get(`/products/slug/${slug}`);
  },

  getBySlugAndFlashsaleId: (slug, flashsaleId) => {
    return axiosInstance.get(
      `/products/slug/${slug}?flashsaleId=${flashsaleId}`
    );
  },

  getProductByPeterCategory: (peterCategoryId) => {
    return axiosInstance.get(`/products/get/product/peter/${peterCategoryId}`);
  },

  searchProductByProductName: (productName) => {
    return axiosInstance.get(
      `/products/search/product/productname/${productName}`
    );
  },

  updateProductViews: (slug) => {
    return axiosInstance.post(`/products/update/views/slug/${slug}`);
  },

  getRandomProductBySellerIdLimit: (sellerId, limit) => {
    return axiosInstance.get(
      `products/rand/seller/id/${sellerId}/limit/${limit}`
    );
  },

  getProductBySellerIdAndCategoryId: (sellerId, categoryId) => {
    return axiosInstance.get(
      `products/seller/id/${sellerId}/category/id/${categoryId}`
    );
  },

  updateRatingByProductId: (rating, productId, header) => {
    return axiosInstance.get(
      `products/rating/${rating}/product/id/${productId}`,
      header
    );
  },
};

export default apiProduct;
