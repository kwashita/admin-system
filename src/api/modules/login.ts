import qs from "qs";
import {Login} from "@/api/interface/index"
import http from '@/api';
import {PORT1} from "@/api/config/servicePort";


export const loginApi = (params: Login.ReqLoginForm) =>{
    return http.post<Login.ResLogin>(PORT1 + `/login`, params)
}
