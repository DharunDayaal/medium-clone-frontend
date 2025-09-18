import { useAuthStore } from "@/store/authstore";
import axios, { AxiosError, AxiosInstance, AxiosResponse } from "axios";

type Response<T = unknown> = AxiosResponse<T>

const axiosInstance: AxiosInstance = axios.create({
    timeout: 100000,
    headers: {
        'Content-Type': 'application/json'
    }
})


axiosInstance.interceptors.response.use(
    (response: Response): Response => {
        return response
    },
    async (error: AxiosError) => {
        if(error.response?.status === 401) {
            const { clearAuth }= useAuthStore.getState();
            clearAuth();
        }
        return Promise.reject(error)
    }
)

export default axiosInstance