import axiosInstance from "./axios";

const apiEmail = {
  
  sendEmail: (data) => {
    return axiosInstance.post(`email/send2`, data);
  },

};

export default apiEmail;
