import React, { useRef, useState } from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useStateContext } from '../contexts/Context';
import { Link, useNavigate } from 'react-router-dom'

export default function Signup() {
    const { signup, currentUser } = useStateContext();

    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const usernameRef = useRef()
    const fullNameRef = useRef()

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')
    const navigate = useNavigate();

    const [selected, setSelected] = useState('student');

    async function handleSubmit(e) {
        e.preventDefault();
        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Passwords do not match')
        }
        try {
            setError('')
            setLoading(true)
            await signup(selected, fullNameRef.current.value, usernameRef.current.value, emailRef.current.value, passwordRef.current.value,)
            navigate('/home')
        } catch {
            setError('Failed to create account')
        }
    }

    return (
        <div className='auth__container'>
            <Card>
                <Card.Body>
                    <div className='text-center mb-4'>
                        <h2 className='text-base font-semibold'>E-Maintenance Portal</h2>
                    </div>
                    {error && <Alert variant='danger'>{error}</Alert>}
                    <div className='flex flex-row tabs w-9/10 bg-white justify-between mb-4 items-center'>
                        <div>
                            <button onClick={() => setSelected('student')} className={`flex items-center justify-center w-[150px] ${selected === 'student' && 'bg-blue text-white'}`}>Student</button>
                        </div>
                        <div>
                            <button onClick={() => setSelected('staff')} className={`flex items-center justify-center w-[150px] ${selected === 'staff' && 'bg-blue text-white'}`}>Staff</button>
                        </div>
                    </div>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group id='email'>
                            <Form.Label>Email</Form.Label>
                            <Form.Control type='email' ref={emailRef} required />
                        </Form.Group>
                        <Form.Group id='email'>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control type='text' ref={fullNameRef} required />
                        </Form.Group>
                        <Form.Group id='username'>
                            <Form.Label>{selected === 'student' ? 'Matric No': 'Username'}</Form.Label>
                            <Form.Control type='text' ref={usernameRef} required />
                        </Form.Group>
                        <Form.Group id='password'>
                            <Form.Label>Password</Form.Label>
                            <Form.Control type='password' ref={passwordRef} required />
                        </Form.Group>
                        <Form.Group id='password-confirm'>
                            <Form.Label>Confirm Password</Form.Label>
                            <Form.Control type='password' ref={passwordConfirmRef} required />
                        </Form.Group>
                        <Button type='submit' className='w-100 mt-4' disabled={loading}>Sign Up</Button>
                    </Form>
                </Card.Body>
            </Card>
            <div className='w-100 text-center mt-2'>
                Already have an account? <Link to='/'>Login</Link>
            </div>
        </div>
    )
}