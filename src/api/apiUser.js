import axiosInstance from "./axios";

const apiUser = {
  register: (data) => {
    return axiosInstance.post("users/register", data);
  },

  checkEmail: (email) => {
    return axiosInstance.get(`users/check/email/${email}`);
  },

  login: (data) => {
    return axiosInstance.post("users/login", data);
  },

  loginWithGoogle: (data) => {
    return axiosInstance.post("users/login/google", data);
  },

  myprofile: (header) => {
    return axiosInstance.get(`users/myInfo`, header);
  },

  updateUser: (data, header) => {
    return axiosInstance.put(`users`, data, header);
  },

  getSellerInfo: (sellerId) => {
    return axiosInstance.get(`users/seller/get/seller/info/id/${sellerId}`);
  },

  forgotpassword: (data) => {
    return axiosInstance.post("users/forgotpassword", data);
  },

  sellerRegister: (data) => {
    return axiosInstance.post("users/seller/register", data);
  },

  //admin
  getUserByRole: (role, page, header) => {
    return axiosInstance.get(
      `users/admin/users/role/${role}?page=${page}`,
      header
    );
  },

  adminDeactiveUser: (id, header) => {
    return axiosInstance.post(`users/admin/deactive/user/id/${id}`, {}, header);
  },

  adminActiveUser: (id, header) => {
    return axiosInstance.post(`users/admin/active/user/id/${id}`, {}, header);
  },

  adminGetSellerToken: (sellerId, header) => {
    return axiosInstance.post(
      `users/admin/get/seller/token/${sellerId}`,
      {},
      header
    );
  },

  
};

export default apiUser;
