import axiosInstance from "./axios";

const apiPeterVoucher = {
  create: (data, header) => {
    return axiosInstance.post("vouchers", data, header);
  },

  getAll: () => {
    return axiosInstance.get("vouchers");
  },

  adminGetAll: (page, size, header) => {
    return axiosInstance.get(`vouchers/admin/get/all?page=${page}&size=${size}`, header);
  },

  getOne: (id) => {
    return axiosInstance.get(`vouchers/${id}`);
  },

  update: (id, data, header) => {
    return axiosInstance.put(`vouchers/${id}`, data, header);
  },

  delete: (id, header) => {
    return axiosInstance.delete(`vouchers/${id}`, header);
  },
};

export default apiPeterVoucher;
