import React, { useContext, useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import userApi from '../../../api/userApi';
import { LOCAL_STORAGE_TOKEN_NAME } from '../../../constans/constants';
import { AuthContext } from '../../../contexts/AuthContext';
import AlertMessage from '../../layout/AlertMessage';

function SignupForm() {
    // context
    const { loadUser } = useContext(AuthContext)

    // local satate
    const [signupForm, setSignupForm] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    })
    const {name, email, password, confirmPassword} = signupForm
    const [alert, setAlert] = useState(null)


    const onChangeSignupForm = event => {
        setSignupForm({
            ...signupForm,
            [event.target.name]: event.target.value
        })
    }
    const signup = async event => {
        event.preventDefault()
        if(password !== confirmPassword){
            setAlert({
                type: 'warning',
                message: 'confirm password is not match!!!'
            })
            setTimeout(() => {
                setAlert(null)
            }, 5000);
            return 
        }
        try {
            const signupData = await userApi.signup({
                name,
                email,
                password,
            })
            if (signupData.success) {
                localStorage.setItem(
                    LOCAL_STORAGE_TOKEN_NAME,
                    signupData.accessToken
                )
                await loadUser()
            } else {
                setAlert({
                    type: 'warning',
                    message: signupData.message
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
            <Form className='my-4' onSubmit={signup}>
                <AlertMessage info={alert}></AlertMessage>
                <Form.Group >
                    <Form.Control
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        required
                        onChange={onChangeSignupForm}
                    />
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Control
                        type='text'
                        placeholder='Email'
                        name='email'
                        value={email}
                        required
                        onChange={onChangeSignupForm}
                    />
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Control
                        type='password'
                        placeholder='Password'
                        name='password'
                        value={password}
                        required
                        onChange={onChangeSignupForm} />
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Control
                        type='password'
                        placeholder='Confirm password'
                        name='confirmPassword'
                        value={confirmPassword}
                        required
                        onChange={onChangeSignupForm}
                    />
                </Form.Group>
                <Button
                    variant='success'
                    className='mt-3'
                    type='submit'>Signup</Button>
            </Form>
            <p>Already had an account?
                <Link to='/signin'>
                    <Button variant='info' size='sm' className='m-2'>Signin</Button>
                </Link>
            </p>
        </>

    )
}

export default SignupForm;