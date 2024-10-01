import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './GoalForm.css'; 

const GoalForm = () => {
    const [description, setDescription] = useState('');
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [achieved, setAchieved] = useState(false);
    const [error, setError] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (new Date(endDate) < new Date(startDate)) {
            setError('End date cannot be earlier than start date.');
            toast.error('End date cannot be earlier than start date.');
            return;
        }

        try {
            await axios.post('http://localhost:8082/api/goal', {
                description,
                startDate,
                endDate,
                achieved
            });
            setDescription('');
            setStartDate('');
            setEndDate('');
            setAchieved(false);
            setError(null);
            toast.success('Goal added successfully!');
        } catch (error) {
            console.error("There was an error creating the goal!", error);
            toast.error('Failed to add goal.');
        }
    };

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <h2>Set Goal</h2>
                <div>
                    <label>Description:</label>
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        placeholder="Describe your goal here..."
                        required
                    />
                </div>
                <div>
                    <label>Start Date:</label>
                    <input
                        type="date"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>End Date:</label>
                    <input
                        type="date"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                        required
                    />
                </div>
                
                <button type="submit">Submit</button>
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default GoalForm;
