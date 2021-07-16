import React from 'react';
import { Button, Form } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function SignupForm() {
    return (
        <>
            <Form className='my-4'>
                <Form.Group >
                    <Form.Control type='text' placeholder='Name' name='name' required />
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Control type='text' placeholder='Email' name='email' required />
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Control type='password' placeholder='Password' name='password' required />
                </Form.Group>
                <Form.Group className='mt-2'>
                    <Form.Control type='password' placeholder='Confirm password' name='confirmPassword' required />
                </Form.Group>
                <Button variant='success' className='mt-3' type='submit'>Signin</Button>
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