import axiosClient from "./axiosClient"

const productApi = {
    getProducts: async (catId, page) => {
        const url = `/product?id=${catId}&page=${page}`
        // const url = `/product/`

        console.log(url,{})
        try {
            return axiosClient.get(url)
        } catch (error) {
            
        }
        
    }
}

export default productApi