import axiosInstance from "./axios";

const apiCategory = {
  getAll: (sellerId) => {
    return axiosInstance.get(`/categories/get-by-sellerid/${sellerId}`);
  },

  getOne: (id) => {
    return axiosInstance.get(`/categories/${id}`).then((res) => res.data);
  },

  createCategory: (data, header) => {
    return axiosInstance.post("/categories", data, header);
  },

  getCategoryById: (id) => {
    return axiosInstance.get(`/categories/${id}`).then((res) => res.data);
  },

  editCategory: (id, category) => {
    return axiosInstance
      .put(`/categories/${id}`, category)
      .then((res) => res.data);
  },

  deleteCategoryById: (id) => {
    return axiosInstance.delete(`/categories/${id}`).then((res) => res.data);
  },
};

export default apiCategory;
