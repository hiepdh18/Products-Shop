import { createContext, useReducer, useEffect } from "react";

import { LOCAL_STORAGE_TOKEN_NAME, TYPE } from "../constans/constants";
import userApi from '../api/userApi'
import { authReducer } from "../reducers/authReducer";

export const AuthContext = createContext()

const AuthContextProvider = ({ children }) => {

    const [authState, dispatch] = useReducer(authReducer, {
        isAuthenticate: false,
        user: null,
        authLoading: true
    })
    // load user's info
    const loadUser = async () => {
        try {
            const response = await userApi.loadUser()
            if (response.success) {
                dispatch({
                    type: TYPE.SET_AUTH,
                    payload: {
                        isAuthenticated: true,
                        user: response.user
                    }
                })
            } else 
                dispatch({
                    type: TYPE.SET_AUTH,
                    payload: {
                        isAuthenticated: false,
                        user: null
                    }
                })
        } catch (error) {
            localStorage.removeItem(LOCAL_STORAGE_TOKEN_NAME)
            dispatch({
                type: TYPE.SET_AUTH,
                payload: {
                    isAuthenticated: false,
                    user: null
                }
            })
        }
    }
    useEffect(() => loadUser(), [])

    // data 
    const authContextData = { loadUser, authState }
    // return
    return (
        <AuthContext.Provider value={authContextData}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
