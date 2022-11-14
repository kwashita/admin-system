import NProgress from "@/config/nprogress";
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { showFullScreenLoading, tryHideFullScreenLoading } from "@/config/serviceLoading";
import { AxiosCanceler } from "./helper/axiosCancel";
import { store } from "@/redux";
import {ResultData} from "@/api/interface"
import { ResultEnum } from "@/enums/httpEnum";
import {setToken} from "@/redux/modules/global/action";
import { message } from "antd";
import {checkStatus} from './helper/checkStatus';

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
          store.dispatch(setToken(""));
          message.error(data.msg);
          window.location.href = '/login';
          return Promise.reject(data);
        }
        if(data.code && data.code !== ResultEnum.SUCCESS) {
          message.error(data.msg);
          return Promise.reject(data);
        }
        return data;

      }, 
      async (error: AxiosError)=>{
        const {response} = error;
        NProgress.done();
        tryHideFullScreenLoading();
        if(error.message.indexOf("timeout") !== -1) {
          message.error("Time out, please try it later!");
        }
        if(response) checkStatus(response.status);
        if(!window.navigator.onLine) window.location.hash = "/500";
        return Promise.reject(error);
      }
    );
  }
  get<T>(url: string, params?: object, _object = {} ): Promise<ResultData<T>> {
    return this.service.get(url, {params, ..._object})
  }

  post<T>(url: string, params?: object, _object = {}): 
   Promise<ResultData<T>> {
    return this.service.post(url, params, _object)
  }
}

export default new RequestHttp(config);
