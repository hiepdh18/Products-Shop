import axiosClient from "./axiosClient"

const userApi = {
    signin: async (userForm) => {
        const url = '/user/signin'
        try {
            return await axiosClient.post(url, userForm)
        } catch (error) {
            return error
        }
    }
}

export default userApi