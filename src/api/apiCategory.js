import axiosInstance from "./axios";

const apiCategory = {

  getAll: () => {
    return axiosInstance.get("/categories").then((res) => res.data);
  },  

  getOne: (id) => {
    return axiosInstance.get(`/categories/${id}`).then((res) => res.data);
  },

  getCategoryPagination: (page, limit) => {
    return axiosInstance.get(`/categories?pagination[page]=${page}&pagination[pageSize]=${limit}&populate=*`).then((res) => res.data);
  },

  createCategory: (category) => {
    return axiosInstance.post("/categories", category).then((res) => res.data);
  },

  getCategoryById: (id) => {
    return axiosInstance.get(`/categories/${id}`).then((res) => res.data);
  },

  editCategory: (id, category) => {
    return axiosInstance.put(`/categories/${id}`, category).then((res) => res.data);
  },

  deleteCategoryById: (id) => {
    return axiosInstance.delete(`/categories/${id}`).then((res) => res.data);
  },
}

export default apiCategory;