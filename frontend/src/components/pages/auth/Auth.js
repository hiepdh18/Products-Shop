import React, { useContext } from 'react'
import { Spinner } from 'react-bootstrap'

import SigninForm from './SigninForm'
import SignupForm from './SignupForm'
import './auth.css'
import { AuthContext } from '../../../contexts/AuthContext'
import { Redirect } from 'react-router-dom'

function Auth({ authRoute }) {

    const { authState: { isAuthenticated, authLoading } } = useContext(AuthContext)
    let body
    if (authLoading)
        body = (
            <>
                <div className="d-flex justify-content-center mt-2">
                    <Spinner animation='border' variant='info' />
                </div>
            </>
        )
    else if (isAuthenticated)
        return <Redirect to='/dashboard' />
    else body = (
        <>
            <h2>NCC-Shop</h2>
            <h5>we're awsome!!! 🚀🚀🚀🚀 </h5>
            {authRoute === 'signup' && <SignupForm />}
            {authRoute === 'signin' && <SigninForm />}
        </>
    )

    return (
        <div className="landing">
            <div className="dark-overlay">
                <div className="landing-inner">
                    {body}
                </div>
            </div>
        </div>
    )
}

export default Auth
