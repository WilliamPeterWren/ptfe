import axiosInstance from "./axios";

const apiShippingFee = {
  getAll: () => {
    return axiosInstance.get("shippings");
  },

  getAllByAdmin: () => {
    return axiosInstance.get("shippings/admin");
  },

  getOne: (id) => {
    return axiosInstance.get(`shippings/${id}`);
  },

  // admin section
  create: (data, header) => {
    return axiosInstance.post("shippings", data, header);
  },

  update: (id, data, header) => {
    return axiosInstance.put(`shippings/${id}`, data, header);
  },

  delete: (id, header) => {
    return axiosInstance.delete(`shippings/${id}`, header);
  },
};

export default apiShippingFee;
