import axios from 'axios';
import queryString from 'query-string';
import { API_URL  } from '../constans/constants';

// Set up default config for http requests here
const axiosClient = axios.create({
    baseURL: API_URL,
    headers: {
        'content-type': 'aplication/json'
    },
    paramsSerializer: params => queryString.stringify(params)
})
axiosClient.interceptors.request.use(async config => {
    //handle reqquest
    const token ='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYwZjIzOWFlZjY4Njc0MGEwOTljMTdkNCIsImVtYWlsIjoiYWRtaW5AZ21haWwuY29tIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNjI2NTE2MzQ0LCJleHAiOjE2MjY1MTk5NDR9.6fJKHjp32vrni4In1oBb8JbfD3YWXNEA0dbswHqcCj8'
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
        throw err
    })

export default axiosClient
