import NProgress from "@/config/nprogress";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { AxiosCanceler } from "./helper/axiosCancel";
import { store } from "@/redux";
import {ResultData} from "@/api/interface"
import { ResultEnum } from "@/enums/httpEnum";


const axiosCanceler = new AxiosCanceler();

const config = {
  baseURL: import.meta.env.VITE_API_URL as string,
  timeout: 10000,
  withCredentials: true,
};


class RequestHttp {
  service: AxiosInstance;
  public constructor(config: AxiosRequestConfig) {
    this.service = axios.create(config);

    this.service.interceptors.request.use(
      (config: AxiosRequestConfig) => {
        NProgress.start();
        axiosCanceler.addPending(config);
        config.headers!.noLoading || showFullScreenLoading();
        const token: string = store.getState().global.taken;
        return {...config, headers: {...config.headers, "x-access-token": token}}
      },
      (error: AxiosError) => {
        return Promise.reject(error);
      }
    );

    this.service.interceptors.response.use(
      (response: AxiosResponse)=>{
        const {data, config} = response;
        NProgress.done();
        axiosCanceler.removePending(config);
        tryHideFullScreenLoading();
        if(data.code == ResultEnum.OVERDUE) {
          
        }

      }, ()=>{}
    )
  }

  post<T>(url: string, params?: object, _object = {}): Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }
}

export default new RequestHttp(config);
