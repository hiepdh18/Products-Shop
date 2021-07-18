import { createContext } from "react";

import { LOCAL_STORAGE_TOKEN_NAME } from "../constans/constants";
import userApi from '../api/userApi'
export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    // const loadUser = async 
    const signinUser = async userForm => {
        try {
            const response = await userApi.signin(userForm)
            if (response.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.accessToken)
            return response
        } catch (err) {
            return err
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
