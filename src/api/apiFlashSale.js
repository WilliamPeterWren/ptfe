import axiosInstance from "./axios";

const apiFlashSale = {
  getAll: () => {
    return axiosInstance.get(`flashsales/get/flashsales/available`);
  },

  sellerGetAll: (header) => {
    return axiosInstance.get(
      `flashsales/seller/get/flashsales/available`,
      header
    );
  },

  adminGetAll: (header) => {
    return axiosInstance.get(`flashsales/admin/get/flashsales`, header);
  },

  getProductByFlashsaleIdPage: (id) => {
    return axiosInstance.get(`flashsales/get/items/page/${id}`);
  },

  getProductByFlashsaleIdPageable: (id, page, size) => {
    return axiosInstance.get(
      `flashsales/get/items/pageable/${id}?page=${page}&size=${size}`
    );
  },

  updateFlashSale: (id, data, header) => {
    return axiosInstance.put(
      `flashsales/seller/update/seller/${id}`,
      data,
      header
    );
  },

  getProductByFlashsaleId: (id) => {
    return axiosInstance.get(`flashsales/get/items/${id}`);
  },

  sellerGetProductByFlashsaleId: (id, page, size, header) => {
    return axiosInstance.get(
      `flashsales/seller/get/product/flashsale/id/${id}?page=${page}&size=${size}`,
      header
    );
  },

  sellerRemoveProductFromFlashsale: (data, header) => {
    return axiosInstance.post(
      `flashsales/seller/remove/product/flashsale`,
      data,
      header
    );
  },

  // admin
  create: (data, header) => {
    return axiosInstance.post("flashsales/admin", data, header);
  },
  update: (id, data, header) => {
    return axiosInstance.put(
      `flashsales/admin/update/staff/${id}`,
      data,
      header
    );
  },
  delete: (id, header) => {
    return axiosInstance.delete(`flashsales/admin/id/${id}`, header);
  },
};

export default apiFlashSale;
