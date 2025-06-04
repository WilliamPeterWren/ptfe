import axiosInstance from "./axios";

const apiShippingFee = {
  create: (data, header) => {
    return axiosInstance.post("shippings", data, header);
  },

  getAll: () => {
    return axiosInstance.get("shippings");
  },

  getOne: (id) => {
    return axiosInstance.get(`shippings/${id}`);
  },

  update: (id, data, header) => {
    return axiosInstance.get(`shippings/${id}`, data, header);
  },
};

export default apiShippingFee;
