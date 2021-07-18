import axios from 'axios';
import queryString from 'query-string';
import { API_URL ,LOCAL_STORAGE_TOKEN_NAME } from '../constans/constants';

// Set up default config for http requests here
const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'content-type': 'application/json',
    },
    paramsSerializer: params => queryString.stringify(params)
})
axiosClient.interceptors.request.use(async config => {
    //handle reqquest
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_NAME)
    config.headers.Authorization = `Bearer ${token}`;
    return config
})
axiosClient.interceptors.response.use(
    response => {
        if (response && response.data)
            return response.data
        return response
    },
    err => {
       return err.response.data.message
    })

export default axiosClient
