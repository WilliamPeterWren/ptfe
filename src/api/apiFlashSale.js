import axiosInstance from "./axios";

const apiFlashSale = {
  getAll: () => {
    return axiosInstance.get(`flashsales/get/flashsales/available`);
  },

  getProductByFlashsaleId: (id) => {
    return axiosInstance.get(`flashsales/get/items/${id}`);
  },

  getProductByFlashsaleIdPage: (id) => {
    return axiosInstance.get(`flashsales/get/items/page/${id}`);
  },

  updateFlashSale: (id, data, header) => {
    return axiosInstance.put(`flashsales/update/seller/${id}`, data, header);
  },
};

export default apiFlashSale;
