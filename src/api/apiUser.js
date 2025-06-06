import axiosInstance from "./axios";

const apiUser = {
  register: (data) => {
    return axiosInstance.post("users/register", data);
  },

  login: (data) => {
    return axiosInstance.post("users/login", data);
  },

  myprofile: (header) => {
    return axiosInstance.get(`users/myInfo`, header);
  },

  updateUser: (data, header) => {
    return axiosInstance.put(`users`, data, header);
  },

  getSellerInfo: (sellerId) => {
    return axiosInstance.get(`users/get/seller/info/id/${sellerId}`);
  },
};

export default apiUser;
