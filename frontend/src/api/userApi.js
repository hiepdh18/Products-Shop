import axiosClient from "./axiosClient"

const userApi = {
    signin: async (userForm) => {
        const url = '/user/signin'
        try {
            return await axiosClient.post(url, userForm)
        } catch (err) {
            // return err
        }
    },
    signup: async (userForm) => {
        const url = '/user/signup'
        try {
            return await axiosClient.post(url, userForm)
        } catch (err) {
            // return err
        }
    },
    loadUser: async () => {
        const url = '/user/check'
        try {
            return await axiosClient.get(url)
        }
        catch (err) {
            // return err
        }
    }
}

export default userApi