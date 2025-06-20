import axiosInstance from "./axios";

const apiOrder = {
  createOrder: (data, header) => {
    return axiosInstance.post(`orders`, data, header);
  },

  getAll: (page, header) => {
    return axiosInstance.get(`orders/user/getall?page=${page}`, header);
  },

  getOne: (id, header) => {
    return axiosInstance.get(`orders/user/detail/${id}`, header);
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

  getOrderBySellerIdAndStatus: (status, page, header) => {
    return axiosInstance.get(
      `orders/seller/orderstatus/${status}?page=${page}`,
      header
    );
  },

  getByIdSeller: (id, header) => {
    return axiosInstance.get(`orders/seller/id/${id}`, header);
  },

  updateStatusBySeller: (id, data, header) => {
    return axiosInstance.put(`orders/seller/id/${id}`, data, header);
  },

  // revenue
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

  // seller export
  getExportThisMonth: (header) => {
    return axiosInstance.get(`orders/seller/export/thismonth`, header);
  },

  getExportLastMonth: (header) => {
    return axiosInstance.get(`orders/seller/export/lastmonth`, header);
  },

  getExportThisWeek: (header) => {
    return axiosInstance.get(`orders/seller/export/thisweek`, header);
  },

  getExportLastWeek: (header) => {
    return axiosInstance.get(`orders/seller/export/lastweek`, header);
  },

  getExportToday: (header) => {
    return axiosInstance.get(`orders/seller/export/today`, header);
  },

  getExportThisYear: (header) => {
    return axiosInstance.get(`orders/seller/export/thisyear`, header);
  },

  // ----------------- shipper -----------------
  getOrderByShipperId: (page, header) => {
    return axiosInstance.get(`orders/shipper/getall?page=${page}`, header);
  },

  getOrderByShipperIdAndStatus: (status, page, header) => {
    return axiosInstance.get(
      `orders/shipper/orderstatus/${status}?page=${page}`,
      header
    );
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
  // ----------------- admin -----------------

  // count
  adminGetUserCountOrderThisMonth: (header) => {
    return axiosInstance.get(`orders/count/order/thismonth`, header);
  },

  adminGetUserCountOrderThisMonthCancelled: (header) => {
    return axiosInstance.get(`orders/count/order/thismonth/cancelled`, header);
  },

  // revenue
  adminGetUserSpendingThisMonth: (header) => {
    return axiosInstance.get(`orders/spending/thismonth`, header);
  },

  adminGetUserSpendingLastMonth: (header) => {
    return axiosInstance.get(`orders/spending/lastmonth`, header);
  },

  adminGetUserSpendingPerMonth: (header) => {
    return axiosInstance.get(`orders/spending/yearly/permonth`, header);
  },

  adminGetUserSpendingForMonth: (year, month, header) => {
    return axiosInstance.get(
      `orders/spending/daily?year=${year}&month=${month}`,
      header
    );
  },

  adminGetUserSpendingToday: (header) => {
    return axiosInstance.get(`orders/spending/today`, header);
  },

  adminGetUserSpendingThisWeek: (header) => {
    return axiosInstance.get(`orders/spending/thisweek`, header);
  },

  adminGetUserSpendingLastWeek: (header) => {
    return axiosInstance.get(`orders/spending/lastweek`, header);
  },

  adminGetAllOrderPagination: (page, size, header) => {
    return axiosInstance.get(
      `orders/admin/getall/pagination2?page=${page}&size=${size}`,
      header
    );
  },

  adminGetAllOrderPaginationStatus: (status, page, size, header) => {
    return axiosInstance.get(
      `orders/admin/getall/pagination2/status/${status}?page=${page}&size=${size}`,
      header
    );
  },

  adminGetOneOrderById: (id, header) => {
    return axiosInstance.get(`orders/admin/get/id/${id}`, header);
  },
};

export default apiOrder;
