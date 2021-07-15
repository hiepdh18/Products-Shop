import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SigninForm() {
    return (
        <>
            <Form>
                <Form.Group>
                    <Form.Control type='text' placeholder='email' name='email' required />
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Control type='password' placeholder='password' name='password' required />
                </Form.Group>
                <Button variant='success' className='mt-3' type='submit'>Signin</Button>
            </Form>
            <p>Don't have an account?
                <Link to='/signup'>
                    <Button variant='info' size='sm' className='m-2'>Signup</Button>
                </Link>
            </p>
        </>
    )
}
export default SigninForm
