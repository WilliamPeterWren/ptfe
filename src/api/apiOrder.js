import axiosInstance from "./axios";

const apiOrder = {
  createOrder: (data, header) => {
    return axiosInstance.post(`orders`, data, header);
  },

  getAll: (page, header) => {
    return axiosInstance.get(`orders/user/getall?page=${page}`, header);
  },

  getOrderByUserIdAndStatus: (status, page, header) => {
    return axiosInstance.get(
      `orders/user/orderstatus/${status}?page=${page}`,
      header
    );
  },

  // ----------------- seller -----------------

  getOrderBySellerId: (page, header) => {
    return axiosInstance.get(
      `orders/seller/getall?page=${page}&size=10`,
      header
    );
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

  sellerCountOrderThisMonth: (header) => {
    return axiosInstance.get(`orders/seller/count/order/thismonth`, header);
  },

  sellerCountOrderThisMonthCancelled: (header) => {
    return axiosInstance.get(
      `orders/seller/count/order/thismonth/cancelled`,
      header
    );
  },

  revenueThisMonth: (header) => {
    return axiosInstance.get(`orders/seller/revenue/thismonth`, header);
  },

  revenueLastMonth: (header) => {
    return axiosInstance.get(`orders/seller/revenue/lastmonth`, header);
  },

  getYearlyRevenuePerMonth: (header) => {
    return axiosInstance.get(`orders/seller/revenue/yearly/permonth`, header);
  },

  getDailyRevenueForMonth: (year, month, header) => {
    return axiosInstance.get(
      `orders/seller/revenue/daily?year=${year}&month=${month}`,
      header
    );
  },

  getTodayRevenue: (header) => {
    return axiosInstance.get(`orders/seller/revenue/today`, header);
  },

  getThisWeek: (header) => {
    return axiosInstance.get(`orders/seller/revenue/thisweek`, header);
  },

  getLastWeek: (header) => {
    return axiosInstance.get(`orders/seller/revenue/lastweek`, header);
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
