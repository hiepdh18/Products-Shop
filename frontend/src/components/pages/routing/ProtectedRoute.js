import React, { useContext } from 'react'
import { Spinner } from 'react-bootstrap'
import { Redirect, Route } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'


function ProtectedRoute({ component: Component, ...rest }) {
    const {
        authState: { authLoading, isAuthenticated }
    } = useContext(AuthContext)

    if (authLoading)
        return (
            <div className='spinner-container'>
                <Spinner animation='border' variant='info' />
            </div>
        )
    return (
        <div>
            <Route
                {...rest}
                render={props =>
                    isAuthenticated ? (
                        <>
                            {/* <NavbarMenu /> */}
                            <Component {...rest} {...props} />
                        </>
                    ) : (
                        <Redirect to='/signin' />
                    )
                }
            />

        </div>
    )
}

export default ProtectedRoute
