import axiosInstance from "./axios";

const apiCart = {
  create: () =>{

  },

  getCart: (header) => {
    return axiosInstance.get(`carts`, header);
  },

  addToCart: (data, header) => {
    return axiosInstance.post(`carts/addtocartt`, data, header);
  },

  deleteItem: (variantId, header) => {
    return axiosInstance.delete(
      `carts/cartitem/variantid/${variantId}`,
      header
    );
  },

  deleteSeller: (sellerId, header) => {
    return axiosInstance.delete(`carts/seller/sellerId/${sellerId}`, header);
  },
};

export default apiCart;
