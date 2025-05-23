import axiosInstance from "./axios";

const apiProduct = {

  getAll: () => {
    return axiosInstance.get("/products?populate=*").then((res) => res.data);
  },

  getOne: (slug) =>{
    return axiosInstance.get(`/products?populate=*&filters[slug]=${slug}`)
  },

  getDetailProductBySlug: (product_slug) => {
    return axiosInstance.get(`/products?filters[slug][$eq]=${product_slug}&populate=*`).then((res) =>res.data);
  },

  getNewest: () => {
    return axiosInstance.get("/products?populate=*&sort=createdAt:desc&pagination[limit]=8").then((res) => res.data);
  },

  getMostView: () => {
    return axiosInstance.get("/products?populate=*&sort=views:desc&pagination[limit]=5").then((res) => res.data);
  },

  getProdmotion: () => {
    return axiosInstance.get("/products?filters[is_on_sale][$eq]=true&pagination[limit]=5&sort=createdAt:desc&populate=*").then((res) => res.data);
  },

  getProductByCatSlug: (slug) => {
    return axiosInstance.get(`/products?filters[category][slug][$containsi]=${slug}&populate=*`).then((res) => res.data);
  }, 

  getProductByBrandSlug: (slug) => {    
    return axiosInstance.get(`/products?filters[brand][slug][$eq]=${slug}&sort=createdAt:desc&populate=*`).then((res) => res.data);
  },

  getProductByCatId: (id) => {
    return axiosInstance.get(`/products?filters[category][id][$eq]=${id}&populate=*`).then((res) => res.data);
  }, 

  getProductByBrandId: (id) => {
    return axiosInstance.get(`/products?filters[brand][id][$eq]=${id}&populate=*`).then((res) => res.data);
  }, 

  getProductPagination: (page, limit) => {
    return axiosInstance.get(`/products?pagination[page]=${page}&pagination[pageSize]=${limit}&sort=createdAt:desc&populate=*`).then((res) => res.data);
  },

  createProduct: (data) => {
    return axiosInstance.post(`/products`, data)
  },

  deleteProductById: (id) =>{
    return axiosInstance.delete(`/products/${id}`).then((res) => res.data);
  }, 

  getProductBySearch: (data) => {
    return axiosInstance.get(`/products?filters[product_name][$containsi]=${data}&populate=*`).then((res) => res.data);
  },
  
  editProduct: (id, product) => {
    return axiosInstance.put(`/products/${id}`, product).then((res) => res.data);
  },

  getProductById: (id) => {
    return axiosInstance.get(`/products/${id}?populate=*`).then((res) => res.data);
  },
}

export default apiProduct;