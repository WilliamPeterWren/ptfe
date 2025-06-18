import axiosInstance from "./axios";

const apiPeterCategory = {
  create: (data, header) => {
    return axiosInstance.post("petercategories", data, header);
  },

  getAll: () => {
    return axiosInstance.get("petercategories");
  },

  getOne: (id) => {
    return axiosInstance.get(`petercategories/${id}`);
  },

  update: (id, data, header) => {
    return axiosInstance.put(`petercategories/${id}`, data, header);
  },

  delete: (id, header) => {
    return axiosInstance.delete(`petercategories/${id}`, header);
  },
};

export default apiPeterCategory;
