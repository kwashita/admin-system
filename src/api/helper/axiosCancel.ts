import axios, {AxiosRequestConfig, Canceler} from "axios";
import qs from "qs";
import { isFunction } from "@/utils/is/index";

let pendingMap = new Map<string, Canceler>();

export const getPendingUrl = (config: AxiosRequestConfig) => [config.method, config.url, qs.stringify(config.data), qs.stringify(config.params)].join("&");

export class AxiosCanceler{
    addPending(config: AxiosRequestConfig){
        this.removePending(config);
        const url = getPendingUrl(config);
        config.cancelToken = 
            config.cancelToken || new axios.CancelToken(cancel => {
                if(!pendingMap.has(url)){
                    pendingMap.set(url, cancel);
                }
            })
    }

    removePending(config: AxiosRequestConfig){
        const url = getPendingUrl(config);

        if(pendingMap.has(url)){
            const cancel = pendingMap.get(url);
            cancel && cancel(); 
            pendingMap.delete(url);
        }
    }

    removeAllPending(){
        pendingMap.forEach(cancel =>{
            cancel && isFunction(cancel) && cancel();
        })
    }
}