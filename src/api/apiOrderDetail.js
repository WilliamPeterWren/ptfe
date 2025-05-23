import axiosInstance from "./axios";

const apiOrderDetail = {

    getOrderDetailByOrderId: (id) => {
      return axiosInstance.get(`/order-details?filters[order_id][$eq]=${id}`).then((res) => res.data);
    },

    createOrderDetail: (data) => {
      return axiosInstance.post(`/order-details`, data).then((res) => res.data);
    },

    
}

export default apiOrderDetail;