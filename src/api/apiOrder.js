import axiosInstance from "./axios";

const apiOrder = {
    getAll: () => {
        return axiosInstance.get("/orders?populate=*").then((res) => res.data);
    }, 

    getOrderPagination: (page, limit) => {
      return axiosInstance.get(`/orders?pagination[page]=${page}&pagination[pageSize]=${limit}&populate=*`).then((res) => res.data);
    },    

    getOrderById: (id) => {
      return axiosInstance.get(`/orders/${id}?populate=*`).then((res) => res.data);
    },

    createOrder: (data) => {
      return axiosInstance.post(`/orders`, data).then((res) => res.data);
    }, 

    updateOrder: (id, data) => {
      return axiosInstance.put(`/orders/${id}`, data).then((res) => res.data);
    },

    getOrderByUserId: (userId) => { 
      return axiosInstance.get(`/orders?filters[user][id][$eq]=${userId}&populate=*`).then((res) => res.data);
    },
}

export default apiOrder;