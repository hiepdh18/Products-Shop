import React from 'react'
import SigninForm from './SigninForm'
import SignupForm from './SignupForm'
import './auth.css'

function Auth({ authRoute }) {
    let body = (
        <>
            <h2>NCC-Shop</h2>
            <h5>we are awsome!!! 🚀🚀🚀🚀 </h5>
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
