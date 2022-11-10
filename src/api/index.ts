import NProgress from "@/config/nprogress";
import axios, {AxiosError, AxiosInstance, AxiosRequestConfig} from 'axios';
import { AxiosCanceler } from "./helper/axiosCancel";


// const axionsCanceler = new AxiosCanceler();

const config = {
    baseURL: import.meta.env.VITE_API_URL as string,
    timeout: 10000,
    withCredentials: true

}
console.log(config);

class RequestHttp{
	service: AxiosInstance;
    public constructor(config: AxiosRequestConfig){
        this.service = axios.create(config);

        this.service.interceptors.request.use(
            (config: AxiosRequestConfig) =>{
                NProgress.start();
                AxiosCanceler.addPending(config);
                config.headers!.noLoading;
            },
            (error: AxiosError) => {
                return Promise.reject(error);
            }
        )
    }

}

export default new RequestHttp(config);