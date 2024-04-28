import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import Home from './Home';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Report from './Components/Report';
import Feedback from './Components/Feedback';

export default function App() {

    return (
        <div className='app'>
            <Router>
                <Routes>
                        <Route path='/home' index element={<Home />} />
                </Routes>
                <Container className='d-flex align-items-center justify-content-center' style={{ minHeight: '100vh' }}>
                    <Routes>
                        <Route path='/' >
                            <Route index element={<Login />} />
                            <Route path='/signup' element={<Signup />} />
                            <Route path='/report' element={<Report />} />
                            <Route path='/feedback' element={<Feedback />} />
                        </Route>
                    </Routes>
                </Container>

            </Router>
        </div>
    )
}
