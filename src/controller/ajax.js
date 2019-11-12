import axios from "axios";

import { Toast } from 'antd-mobile';
import {BASE_URL} from "../config/const_config"

function ajax(url, param, method="get", host=BASE_URL) {

    let promise = new Promise((resolve, reject)=>{
        method = method.toLowerCase();
        if (method === "get") {
            axios.get(host + url, {
                params: param
            }).then(response=>{
                resolve(response.data);
            }).catch(error=>{
                Toast.fail(error.message);
            })
        } else if (method === "post") {
            axios.post(host + url, param).then(response=>{
                resolve(response.data);
            }).catch(error=>{
                Toast.fail(error.message);            })
        }
    });

   return promise;
}

export default ajax;
