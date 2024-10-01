import React, { useState } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';

export default function SignupForm() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
    
        if (password !== confirmPassword) {
            toast.error('Passwords do not match!');
            return;
        }
    
        try {
            const response = await axios.post('http://localhost:8082/api/save-user', { fullName, email, password });
            console.log('User created:', response.data);
            toast.success("Congratulations! Your account is created.", {
                autoClose: 3000,
            });
            setTimeout(() => {
                navigate("/login");
            }, 4000);
        } catch (error) {
            console.error('There was an error!', error);
            toast.error('This email address already exists', {
                autoClose: 3000,
            });
        }
    };
    

    return (
        <div className="background">
            <div className="container">
                <div className="form-wrapper">
                    <h1 className="form-title">Create a New Account!!</h1>
                </div>
                <div className="form-container">
                    <form onSubmit={handleSubmit} className="form">
                        <div className="input-group">
                            <label htmlFor="fullName" className="label">
                                Full Name
                            </label>
                            <input
                                id="fullName"
                                name="fullName"
                                type="text"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                autoComplete="name"
                                className="input"
                                placeholder='First Name  Last Name'
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="email" className="label">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                autoComplete="email"
                                className="input"
                                placeholder='Enter email-id'
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="password" className="label">
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoComplete="new-password"
                                className="input"
                                placeholder='Enter Password'
                            />
                        </div>

                        <div className="input-group">
                            <label htmlFor="confirmPassword" className="label">
                                Confirm Password
                            </label>
                            <input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                autoComplete="new-password"
                                className="input"
                                placeholder='Confirm Password'
                            />
                        </div>

                        <button type="submit" className="submit-btn">
                            Sign up
                        </button>
                    </form>
                </div>
            </div>
            <ToastContainer /> 
        </div>
    );
}