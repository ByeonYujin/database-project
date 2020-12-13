import axios from "axios";
import CONFIG from "./config"

const DOMAIN = `${CONFIG.SERVER_PROTOCOL}://${CONFIG.SERVER_URL}:${CONFIG.SERVER_PORT}/api/`

export const request = (method, url, data, headers) => {
    if (localStorage.getItem('token')) {
        headers = { ...headers, Authorization: `Bearer ${localStorage.getItem('token')}` }
        // axios.interceptors.request.use((config) => {
        //     config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
        // })
    }
    
    return axios.request({
        method,
        url: DOMAIN + url,
        data,
        headers
    })
}