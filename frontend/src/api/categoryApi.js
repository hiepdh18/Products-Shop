import axiosClient from "./axiosClient"

const categoryApi = {
    getCategories: async (id) => {
        const url = `/category/${id}`
        try {
            return await axiosClient.get(url)
        } catch (error) {

        }

    }
}

export default categoryApi