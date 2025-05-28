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
    return axiosInstance.get(`petercategories/${id}`, data, header);
  },
};

export default apiPeterCategory;
