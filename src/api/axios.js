import axios from "axios";

import { apiUrl } from "./config";

const axiosInstance = axios.create({
    baseURL: apiUrl,
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json'
    }
})

axiosInstance.enableUploadFile = () => {
    axiosInstance.defaults.headers['Content-Type'] = 'multipart/form-data';
}

axiosInstance.enableJson = () => {
    axiosInstance.defaults.headers['Content-Type'] = 'application/json';
}

export default axiosInstance;