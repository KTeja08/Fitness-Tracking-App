import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UpdateGoalForm = ({ goal, onGoalUpdated }) => {
    const [formData, setFormData] = useState({
        description: '',
        startDate: '',
        endDate: '',
        achieved: false
    });

    useEffect(() => {
        if (goal) {
            setFormData({
                description: goal.description,
                startDate: goal.startDate.split('T')[0], 
                endDate: goal.endDate.split('T')[0],
                achieved: goal.achieved
            });
        }
    }, [goal]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`http://localhost:8082/api/goal/${goal.id}`, formData);
            onGoalUpdated(response.data); 
            setFormData({ description: '', startDate: '', endDate: '', achieved: false });
            toast.success('Goal updated successfully!');
        } catch (error) {
            console.error("There was an error updating the goal!", error);
        }
    };
    

    return (
        <form onSubmit={handleSubmit} className="goal-form">
            <h1>Update Goal</h1>
            <div>
                <label>Description:</label>
                <input
                    type="text"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Start Date:</label>
                <input
                    type="date"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>End Date:</label>
                <input
                    type="date"
                    name="endDate"
                    value={formData.endDate}
                    onChange={handleChange}
                    required
                />
            </div>
            <div>
                <label>Achieved:</label>
                <input
                    type="checkbox"
                    name="achieved"
                    checked={formData.achieved}
                    onChange={handleChange}
                />
            </div>
            <button type="submit">Update Goal</button>
        </form>
    );
};

export default UpdateGoalForm;
