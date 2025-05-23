import axiosInstance from "./axios";

const apiBrand = {
    getAll: () => {
        return axiosInstance.get("/brands").then((res) => res.data);
    }, 

    getBrandPagination: (page, limit) => {
      return axiosInstance.get(`/brands?pagination[page]=${page}&pagination[pageSize]=${limit}&populate=*`).then((res) => res.data);
    },

    getBrandBySearch: (data) => {
      return axiosInstance.get(`/brands?filters[brand_name][$containsi]=${data}`).then((res) => res.data);
    },

    getBrandById: (id) => {
      return axiosInstance.get(`/brands/${id}`).then((res) => res.data);
    },

    createBrand: (data) => {
      return axiosInstance.post(`/brands`, data).then((res) => res.data);
    },

    editBrand: (id, brand) => {
      return axiosInstance.put(`/brands/${id}`, brand).then((res) => res.data);
    },
  
    deleteBrandById: (id) => {
      return axiosInstance.delete(`/brands/${id}`).then((res) => res.data);
    },
}

export default apiBrand;