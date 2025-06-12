import axiosInstance from "./axios";

const apiAddress = {
  getAddress: (header) => {
    return axiosInstance.get(`addresses`, header);
  },

  create: (data, header) => {
    return axiosInstance.post(`addresses`, data, header);
  },

  update: (id, data, header) => {
    return axiosInstance.put(`addresses/${id}`, data, header);
  },
};

export default apiAddress;
