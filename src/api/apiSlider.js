import axiosInstance from "./axios";

const apiSlider = {
   
    createSlider: (data) =>{
        return axiosInstance.post("/auth/local/register", data);
    },

    loginSlider: (data) =>{
        return axiosInstance.post("/auth/local", data);
    },

    getOne: (id) => {
        return axiosInstance.get(`/Sliders/${id}?populate=*`);
    },

    getAll: () => {
        return axiosInstance.get("/Sliders?populate=*");
    },
}

export default apiSlider;
