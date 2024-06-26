import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useStateContext } from '../contexts/Context';
import { Link, Navigate, useNavigate } from 'react-router-dom'
import logo from '../assets/crawford-univeristy-nigeria.png'

export default function Login() {
    const { currentUser, login } = useStateContext();

    const emailRef = useRef()
    const passwordRef = useRef()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate('/')
        } catch {
            setError('Account does not exist.')
        }
        setLoading(false)
    }
    if (currentUser) {
        return <Navigate to='/home' />
    }

    return (
        <div className='auth__container'>
            <div>
            <Card> 
                <Card.Body>
                    <div className='flex flex-col items-center justify-center mb-4'>
                        <img src={logo} alt='logo' className='logo' />
                        <h1 className='font-semibold text-base'>E-Maintenance Portal</h1>
                    </div>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Button type='submit' className='w-100 mt-4' disabled={loading}>Log In</Button>
                    </Form>
                    <div className='w-100 text-center mt-3'>
                        <Link to='/forgot-password'>Forgot Password?</Link>
                    </div>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Don't have an account? <Link to='/signup'>Signup</Link>
            </div>

            </div>
        </div>
    )
}