import qs from "qs";
import {Login} from "../../api/interface/index"
import {PORT1} from "../../api/config/servicePort";



import http from '../../api';

export const loginApi = (params: Login.ReqLoginForm) =>{
    return http.post<Login.ResLogin>(PORT1 + `/login`, params)
}
