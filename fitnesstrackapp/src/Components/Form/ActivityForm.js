import React, { useState } from 'react';
import { notification } from 'antd';  
import { postActivity } from '../Services/ActivityService'; 

const ActivityForm = ({ onActivityAdded }) => {
    const [date, setDate] = useState('');
    const [steps, setSteps] = useState('');
    const [distance, setDistance] = useState('');
    const [caloriesBurned, setCaloriesBurned] = useState('');
    const [errors, setErrors] = useState({});  

    const validateForm = () => {
        const newErrors = {};
        if (!date) newErrors.date = 'Date is required';
        if (!steps) newErrors.steps = 'Steps are required';
        if (!distance) newErrors.distance = 'Distance is required';
        if (!caloriesBurned) newErrors.caloriesBurned = 'Calories burned is required';
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        const newActivity = {
            date,
            steps: parseInt(steps),
            distance: parseFloat(distance),
            caloriesBurned: parseInt(caloriesBurned),
        };

        postActivity(newActivity)
            .then((response) => {
                onActivityAdded(response.data);  // Pass the new activity back to the parent component
                notification.success({
                    message: 'Activity posted successfully',
                    duration: 5,
                });
                setDate('');
                setSteps('');
                setDistance('');
                setCaloriesBurned('');
                setErrors({});
            })
            .catch((error) => {
                console.error("There was an error posting the activity!", error);
                notification.error({
                    message: 'Error while posting Activity',
                    duration: 5,
                });
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                
                <h2>Add New Activities</h2>
                <label>Date:</label>
                <input 
                    type="date" 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)} 
                    required 
                />
                {errors.date && <span>{errors.date}</span>}
            </div>
            <div>
                <label>Steps:</label>
                <input 
                    type="number" 
                    value={steps} 
                    onChange={(e) => setSteps(e.target.value)} 
                    required 
                />
                {errors.steps && <span>{errors.steps}</span>}
            </div>
            <div>
                <label>Distance (km):</label>
                <input 
                    type="number" 
                    step="0.01" 
                    value={distance} 
                    onChange={(e) => setDistance(e.target.value)} 
                    required 
                />
                {errors.distance && <span>{errors.distance}</span>}
            </div>
            <div>
                <label>Calories Burned:</label>
                <input 
                    type="number" 
                    value={caloriesBurned} 
                    onChange={(e) => setCaloriesBurned(e.target.value)} 
                    required 
                />
                {errors.caloriesBurned && <span>{errors.caloriesBurned}</span>}
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

export default ActivityForm;
