import axiosClient from "./axiosClient"

const typeApi = {
    getTypes: async () => {
        const url = `/type/`
        try {
            return await  axiosClient.get(url)
        } catch (error) {
        }
    }
}

export default typeApi