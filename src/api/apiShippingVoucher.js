import axiosInstance from "./axios";

const apiShippingVoucher = {
  create: (data, header) => {
    return axiosInstance.post("shipping-vouchers", data, header);
  },

  getAll: () => {
    return axiosInstance.get("shipping-vouchers");
  },

  getOne: (id) => {
    return axiosInstance.get(`shipping-vouchers/${id}`);
  },

  update: (id, data, header) => {
    return axiosInstance.get(`shipping-vouchers/${id}`, data, header);
  },
};

export default apiShippingVoucher;
