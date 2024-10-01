import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

export default function SignIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8082/api/login', { email, password });
            console.log('User logged in:', response.data);
            sessionStorage.setItem('studentEmail', email);
            toast.success("Welcome! Logged in successfully", {
                autoClose: 3000,
            });
            setTimeout(() => {
                navigate('/user/profile');
            }, 3000);
        } catch (error) {
            if (error.response) {
                // The request was made, and the server responded with a status code
                toast.error(error.response.data.message || 'Invalid email or password.', {
                    autoClose: 3000,
                });
            } else {
                // Something happened in setting up the request
                toast.error('An error occurred. Please try again later.', {
                    autoClose: 3000,
                });
            }
        }
    };

    return (
        <div className="background">
            <div className="container">
                <div className="form-wrapper">
                    <h2 className="form-title">Sign in to your account</h2>
                    <p className="form-subtitle">
                        Or
                        <a href="/user-signup" className="link"> create an account</a>
                    </p>
                </div>

                <div className="form-container">
                    <h1>User Login</h1>
                    <div className="form-box">
                        <form onSubmit={handleSubmit} className="form">
                            <div className="input-group">
                                <label htmlFor="email" className="label">Email address</label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="input"
                                    placeholder="Enter your email address"
                                    aria-label="Email address"
                                />
                            </div>

                            <div className="input-group">
                                <label htmlFor="password" className="label">Password</label>
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="input"
                                    placeholder="Enter your password"
                                    aria-label="Password"
                                />
                            </div>

                            <div className="options">
                                <div className="checkbox-group">
                                    {/* Add any additional options or checkboxes here if needed */}
                                </div>
                                <div className="forgot-password">
                                    <a href="#" className="link">Forgot your password?</a>
                                </div>
                            </div>

                            <button type="submit" className="submit-btn">Sign in</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer /> 
        </div>
    );
}
