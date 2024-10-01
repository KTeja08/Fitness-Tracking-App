import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import './Allforms.css';

export default function UserLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8082/api/login', { email, password });
            const { token, user } = response.data;
            sessionStorage.setItem('token', token);
            sessionStorage.setItem('user', JSON.stringify(user));
            toast.success('Login successful');
            setTimeout(() => {
                navigate('/dashboard');
            }, 3000);
        } catch (error) {
            toast.error('Invalid email or password.');
        }
    };

    const handleForgetPassword = () => {
        navigate('/forget-password');
    };

    return (
        <div className="login-form">
            <h1>User Login</h1>
            <form onSubmit={handleLogin}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>Password:</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Login</button>
                <p>
                <a href="#" onClick={handleForgetPassword} className="forgot-password-link">
                    Forgot Password?
                </a>
            </p>
            </form>

            <ToastContainer />
        </div>
    );
}
