import axiosInstance from "./axios";

const apiOrder = {
  createOrder: (data, header) => {
    return axiosInstance.post(`orders`, data, header);
  },

  getAll: (header) => {
    return axiosInstance.get("orders/user/getall", header);
  },

  getOrderByUserIdAndStatus: (status, header) => {
    return axiosInstance.get(`orders/user/orderstatus/${status}`, header);
  },

  // ----------------- seller -----------------

  getOrderBySellerId: (page, header) => {
    return axiosInstance.get(`orders/seller/getall?page=${page}&size=10`, header);
  },

  getOrderBySellerIdAndStatus: (status, header) => {
    return axiosInstance.get(`orders/seller/orderstatus/${status}`, header);
  },

  getByIdSeller: (id, header) => {
    return axiosInstance.get(`orders/seller/id/${id}`, header);
  },

  updateStatusBySeller: (id, data, header) => {
    return axiosInstance.put(`orders/seller/id/${id}`, data, header);
  },

  // ----------------- shipper -----------------
  getOrderByShipperId: (header) => {
    return axiosInstance.get("orders/shipper/getall", header);
  },

  getOrderByShipperIdAndStatus: (status, header) => {
    return axiosInstance.get(`orders/shipper/orderstatus/${status}`, header);
  },

  getByIdShipper: (id, header) => {
    return axiosInstance.get(`orders/shipper/id/${id}`, header);
  },

  updateStatusByShipper: (id, data, header) => {
    return axiosInstance.put(`orders/shipper/id/${id}`, data, header);
  },

  recieveOrderByShipper: (orderId, header) => {
    return axiosInstance.post(
      `orders/shipper/receive/id/${orderId}`,
      {},
      header
    );
  },
};

export default apiOrder;
