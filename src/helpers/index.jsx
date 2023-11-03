import axios from "axios"

let axiosInstance = axios.create({
    baseURL: 'URL_HERE'
});

axiosInstance.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

export default axiosInstance;