import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Allforms.css';

export default function ResetPasswordForm() {
    const [email, setEmail] = useState('');
    const [newPassword, setNewPassword] = useState('');

    const location = useLocation();
    const navigate = useNavigate(); // Initialize navigate

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const emailParam = params.get('email');
        if (emailParam) {
            setEmail(emailParam);
        }
    }, [location]);

    const handleResetPassword = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://localhost:8082/api/reset-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, newPassword }),
            });

            if (response.ok) {
                toast.success("Password reset successfully...!!");

                // Redirect to login page after a successful reset
                setTimeout(() => {
                    navigate('/login'); // Navigates to the login page
                }, 3000); // 3-second delay for user to see the success message
            } else {
                toast.error("Failed to reset password.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.error("An error occurred. Please try again.");
        }
    };

    return (
        <div className="reset-password-form">
            <h1>Reset your email password here</h1>
            <form onSubmit={handleResetPassword}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>New Password:</label>
                <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                />
                <button type="submit">Reset Password</button>
            </form>
            <ToastContainer />
        </div>
    );
}
