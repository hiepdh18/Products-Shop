import axiosClient from "./axiosClient"

const productApi = {
    getProducts: (page) => {
        const url = `/product/${page}`
        return axiosClient.get(url)
    }
}
export default productApi