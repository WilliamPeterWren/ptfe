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

  getRandomProducts: (limit) => {
    return axiosInstance.get(`/products/get/product/rand/limit/${limit}`);
  },

  getTopSearchProducts: (page, size) => {
    return axiosInstance.get(
      `/products/get/product/topsearch?page=${page}&size=${size}`
    );
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

  getProductByPeterCategoryOrderBySoldDesc: (peterCategoryId) => {
    return axiosInstance.get(
      `/products/get/product/peter/${peterCategoryId}/sold`
    );
  },

  getProductsByPeterCategorySort: (peterCategoryId, page, size, sort) => {
    return axiosInstance.get(
      `/products/sort/petercategory?peterCategory=${peterCategoryId}&page=${page}&size=${size}&sort=${sort}`
    );
  },

  getProductByPeterCategoryOrderByCreatedAtDesc: (peterCategoryId) => {
    return axiosInstance.get(
      `/products/get/product/peter/${peterCategoryId}/created`
    );
  },

  searchProductByProductName: (productName, page) => {
    return axiosInstance.get(
      `/products/search/product/productname/${productName}?page=${page}`
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

  // seller
  getBestSoldProduct: (limit, header) => {
    return axiosInstance.get(`products/seller/bestsold/limit/${limit}`, header);
  },

  createProduct: (data, header) => {
    return axiosInstance.post(`products/seller`, data, header);
  },

  deleteProduct: (id, header) => {
    return axiosInstance.delete(`products/seller/${id}`, header);
  },

  updateProduct: (id, data, header) => {
    return axiosInstance.put(`products/seller/${id}`, data, header);
  },

  // admin
  adminGetAll: (page, size, header) => {
    return axiosInstance.get(
      `products/admin/get-products?page=${page}&size=${size}`,
      header
    );
  },

  adminBlockProduct: (id, header) => {
    return axiosInstance.post(`products/admin/block/id/${id}`, {}, header);
  },

  adminGetProductBySellerId: (sellerId, page, header) => {
    return axiosInstance.get(
      `/products/admin/get-products/seller/${sellerId}?page=${page}`,
      header
    );
  },
};

export default apiProduct;
