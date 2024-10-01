import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UpdateGoalForm from '../Form/UpdateGoalForm';
import './GoalList.css';

const GoalList = () => {
    const [goals, setGoals] = useState([]);
    const [selectedGoal, setSelectedGoal] = useState(null);

    const fetchGoals = async () => {
        try {
            const response = await axios.get('http://localhost:8082/api/goals');
            setGoals(response.data);
        } catch (error) {
            console.error("There was an error fetching the goals!", error);
        }
    };

    useEffect(() => {
        fetchGoals()
            .then(response => {
                console.log(response.data); // Ensure this prints the goals
                setGoals(response.data);
            })
            .catch(error => console.error("There was an error fetching the goals!", error));
    }, []);

    const handleUpdateClick = (goal) => {
        console.log("Edit button clicked for goal:", goal); // Debugging log
        setSelectedGoal(goal);
    };

    const handleGoalUpdated = (updatedGoal) => {
        const updatedGoals = goals.map(goal =>
            goal.id === updatedGoal.id ? updatedGoal : goal
        );
        setGoals(updatedGoals);
        setSelectedGoal(null); // Close form after update
    };

    return (
        <div className="goal-list-container">
            <div className="goal-list">
                <h2>Goal List</h2>
                <ul>
                    {goals.length > 0 ? (
                        goals.map(goal => (
                            <li key={goal.id}>
                                <p><span>Description:</span> {goal.description}</p>
                                <p><span>Start Date:</span> {new Date(goal.startDate).toLocaleDateString()}</p>
                                <p><span>End Date:</span> {new Date(goal.endDate).toLocaleDateString()}</p>
                                <div>
                                    <label>Achieved:</label>
                                    <input
                                        type="checkbox"
                                        checked={goal.achieved}
                                        readOnly // Make checkbox read-only
                                    />
                                    <span>{goal.achieved ? 'Yes' : 'No'}</span>
                                </div>
                                <button onClick={() => handleUpdateClick(goal)}>Edit</button>
                            </li>
                        ))
                    ) : (
                        <p className="no-goals">No goals available.</p>
                    )}
                </ul>
            </div>

            {selectedGoal && (
                <div className="update-form-container">
                    {/* <h3>Updating Goal</h3> */}
                    {/* Display selected goal info for debugging
                    <p>Updating Goal with ID: {selectedGoal.id}</p>  */}
                    <UpdateGoalForm 
                        goal={selectedGoal} 
                        onGoalUpdated={handleGoalUpdated}
                    />
                </div>
            )}
        </div>
    );
};

export default GoalList;

