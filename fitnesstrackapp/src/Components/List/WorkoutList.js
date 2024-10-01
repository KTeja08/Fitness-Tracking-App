import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import axios from 'axios'; // Import axios
import './WorkoutList.css'

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]); // Declare state for workouts

    useEffect(() => {
        // Fetch workouts data when the component mounts
        axios.get('http://localhost:8082/api/workouts')
            .then(response => {
                setWorkouts(response.data); // Set workouts state with the data
            })
            .catch(error => {
                console.error("There was an error fetching the workouts!", error);
            });
    }, []); // Empty dependency array means this runs once when the component mounts

    return (
        <div className="workout-list">
            <h2>Workout List</h2>
            {workouts.length === 0 ? (
                <p>No workouts found.</p>
            ) : (
                <ul>
                    {workouts.map(workout => (
                        <li key={workout.id} className="workout-item">
                            <p><strong>Type:</strong> {workout.type}</p>
                            <p><strong>Date:</strong> {new Date(workout.date).toLocaleDateString()}</p>
                            <p><strong>Duration:</strong> {workout.duration} minutes</p>
                            <p><strong>Calories Burned:</strong> {workout.caloriesBurned}</p>
                            <p><strong>Distance Covered:</strong> {workout.distanceCovered}</p>
                            <p><strong>Steps Taken:</strong> {workout.stepsTaken}</p>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default WorkoutList;
