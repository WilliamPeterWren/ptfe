import axiosInstance from "./axios";

const apiCategory = {
  getAll: (sellerId) => {
    return axiosInstance.get(`/categories/get-by-sellerid/${sellerId}`);
  },

  createCategory: (data, header) => {
    return axiosInstance.post("/categories", data, header);
  },

  update: (id, data, header) => {
    return axiosInstance.put(`/categories/id/${id}`, data, header);
  },
};

export default apiCategory;
