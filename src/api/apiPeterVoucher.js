import axiosInstance from "./axios";

const apiPeterVoucher = {
  create: (data, header) => {
    return axiosInstance.post("vouchers", data, header);
  },

  getAll: () => {
    return axiosInstance.get("vouchers");
  },

  getOne: (id) => {
    return axiosInstance.get(`vouchers/${id}`);
  },

  update: (id, data, header) => {
    return axiosInstance.get(`vouchers/${id}`, data, header);
  },
};

export default apiPeterVoucher;
