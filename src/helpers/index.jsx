import axios from "axios"

let axiosInstance = axios.create({
    baseURL: 'localhost:5000'
});

axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

export default axiosInstance;