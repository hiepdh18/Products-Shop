import { createContext } from "react";
import axios from "axios";

import { API_URL, LOCAL_STORAGE_TOKEN_NAME } from "../constans/constants";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const signinUser = async userForm => {
        try {
            const response = await axios.post(`${API_URL}/user/signin`, userForm)
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
            return response.data;
        } catch (err) {
            if (err.response.data) return err.response.data
            else return { success: false, message: err.message }
        }
    }
    // data
    const authContextData = { signinUser }
    // return
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
