import axiosInstance from "./axios";

const apiOrder = {
  createOrder: (data, header) => {
    return axiosInstance.post(`orders`, data, header);
  },

  getAll: (header) => {
    return axiosInstance.get("orders/user/getall", header);
  },

  getOrderByUserIdAndStatus: (status, header) => {
    return axiosInstance.get(`/orders/user/orderstatus/${status}`, header);
  },
};

export default apiOrder;
