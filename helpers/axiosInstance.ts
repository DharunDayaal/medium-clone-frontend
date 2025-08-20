import axios, { AxiosInstance } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json'
    }
})

export default axiosInstance