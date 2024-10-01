import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Allforms.css';

export default function ForgetPasswordForm() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault(); 

        if (!email) {
            toast.error("Please enter a valid email.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8082/api/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ mail: email }),
            });

            const result = await response.json();

            if (!response.ok) {
                const errorMessage = result.message || "Failed to send reset link. Please try again.";
                toast.error(errorMessage);
            } else {
                toast.error("An error occurred. Please try again.");
            }
        } catch (error) {
            console.error("Error:", error);
            toast.success("Password reset link sent to your email.");
           
        }
    };

    return (
        <div className="forget-password-form">
            <h1>Send link on your email for reset password</h1>
            <form onSubmit={handleSubmit}>
                <label>Email:</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <button type="submit">Send Password Reset Link</button>
            </form>
            <ToastContainer />
        </div>
    );
}
