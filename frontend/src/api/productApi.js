import axiosClient from "./axiosClient"

const productApi = {
    getProductsByCat: async (catId, page) => {
        const url = `/product?id=${catId}&page=${page}`
        try {
            return await axiosClient.get(url)
        } catch (error) {
            
        }
    },
    getProducts: async (page) => {
        const url = `/product/${page}`
        try {
            return await axiosClient.get(url)
        } catch (error) {

        }

    },
    getProduct: async(id) =>{
        const url = `product/get-product/${id}`
        try {
            return await axiosClient.get(url)
        } catch (error) {
            
        }
    },
    createProduct: async (formData)=>{
        
        const url =`product/`
        const config = {
            headers: { 'content-type': 'multipart/form-data' }
        }
        try {
            axiosClient.post(url, formData,config)
        } catch (error) {
            
        }
    }
}

export default productApi