import React, { useState, useContext } from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link, useHistory } from 'react-router-dom';

import { AuthContext } from '../../../contexts/AuthContext'


function SigninForm() {

    // context
    const {signinUser} = useContext(AuthContext)
    
    // Router
    const history = useHistory()

    // Local state
    const [signinForm, setSigninForm] = useState({
        email: '',
        password: ''
    })
    const { email, password } = signinForm

    // function interact to form
    const onChangeSigninForm = event => setSigninForm({ ...signinForm, [event.target.name]: event.target.value })
    const signin = async event => {
        event.preventDefault()
        try {
            const signinData = await signinUser(signinForm)
            if(signinData.success){
                alert(signinData.message)
                history.push('/dashboard')
            } else {
                alert(signinData.message)
            }
        } catch (error) {
            // alert(error)
        }
    }
    return (
        <>
            <Form onSubmit={signin}>
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
