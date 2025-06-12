import axiosInstance from "./axios";

const apiShippingVoucher = {
  getOne: (id) => {
    return axiosInstance.get(`shipping-vouchers/${id}`);
  },

  getAll: () => {
    return axiosInstance.get("shipping-vouchers");
  },

  userGetAll: () => {
    return axiosInstance.get("shipping-vouchers/user/getall");
  },

  // admin section
  create: (count, data, header) => {
    return axiosInstance.post(`shipping-vouchers/count/${count}`, data, header);
  },

  update: (id, count, data, header) => {
    return axiosInstance.put(
      `shipping-vouchers/${id}/count/${count}`,
      data,
      header
    );
  },

  delete: (id, header) => {
    return axiosInstance.delete(`shipping-vouchers/${id}`, header);
  },
};

export default apiShippingVoucher;
