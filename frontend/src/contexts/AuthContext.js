import { createContext, useReducer } from "react";
import { authReducer } from "../reducers/authReducer";
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

        } catch (err) {

        }
    }
}

export default AuthContextProvider
