import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import userApi from '../../../api/userApi';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../../constans/constants';
import { AuthContext } from '../../../contexts/AuthContext'
import AlertMessage from '../../layout/AlertMessage';

function SigninForm() {

    // context
    const {  loadUser } = useContext(AuthContext)

    // Local state
    const [signinForm, setSigninForm] = useState({
        email: '',
        password: ''
    })
    const { email, password } = signinForm
    const [alert, setAlert] = useState(null)

    // function interact to form
    const onChangeSigninForm = event => setSigninForm({ ...signinForm, [event.target.name]: event.target.value })
    const signin = async event => {
        event.preventDefault()
        try {
            const signinData = await userApi.signin(signinForm)
            if (signinData.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    signinData.accessToken
                )
                await loadUser()
            } else {
               setAlert({
                   type:'warning',
                   message : signinData.message
               })
               setTimeout(() => {
                   setAlert(null)
               }, 5000);
            }
        } catch (error) {
          
        }
    }
    return (
        <>
            <Form onSubmit={signin}>
                <AlertMessage info={alert}></AlertMessage>
                <Form.Group>
                    <Form.Control
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={email}
                        onChange={onChangeSigninForm}
                        required />
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        onChange={onChangeSigninForm}
                        required />
                </Form.Group>
                <Button variant='success' className='mt-3' type='submit'>Signin</Button>
            </Form>
            <p>Don't have an account yet?
                <Link to='/signup'>
                    <Button variant='info' size='sm' className='m-2'>Signup</Button>
                </Link>
            </p>
        </>
    )
}
export default SigninForm
