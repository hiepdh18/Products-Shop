import { createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
import { apiUrl, LOCAL_STORAGE_TOKEN_NAME } from "./constants";
import axios from "axios";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {
    const [authState, dispatch] = useReducer(authReducer, {
        isAuthenticated: false,
        authLoading: true,
        user: null
    })

    const signinUser = async userForm => {
        try {
            const response = await axios.post(`${apiUrl}/user/signin`)
            if (response.data.success)
                localStorage.setItem(LOCAL_STORAGE_TOKEN_NAME, response.data.accessToken)
        } catch (err) {

        }
    }
}

export default AuthContextProvider
