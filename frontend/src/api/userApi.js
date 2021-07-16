import axiosClient from "./axiosClient"

const userApi = {
    signin: async (userForm) => {
        const url = `/user/signin`
        return await axiosClient.get(url, userForm)
    }
}
export default userApi