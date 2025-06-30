import axios from "axios"
import conf from "../conf/conf"

const instance = axios.create({
    baseURL:conf.baseUrl
})

instance.interceptors.request.use((config)=>{
    const token = localStorage.getItem('token');
    if(token){
        config.headers.Authorization = `Bearer ${token}`
    }
    return config;
})

export default instance;