import axiosInstance from "./axios";

const apiUser = {
    // create user
    createUser: (data) =>{
        return axiosInstance.post("/auth/local/register", data);
    },

    loginUser: (data) =>{
        return axiosInstance.post("/auth/local", data);
    },

    getOne: (id) => {
        return axiosInstance.get(`/users/${id}?populate=*`);
    },

    getAll: () => {
        return axiosInstance.get("/users?populate=*");
    },
}

export default apiUser;
