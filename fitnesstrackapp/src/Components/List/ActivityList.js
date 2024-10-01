import React, { useEffect, useState } from 'react';
import { getActivities } from '../Services/ActivityService';

const ActivityList = () => {
    const [activities, setActivities] = useState([]);

    useEffect(() => {
        getActivities()
            .then(response => {
                console.log(response.data); // Check if this logs the correct data
                setActivities(response.data);
            })
            .catch(error => console.error("There was an error fetching the activities!", error));
    }, []);
    
    return (
        <div className="activity-list">
            <h2>Activity List</h2>
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>
                        <p><span>Date:</span> {new Date(activity.date).toLocaleDateString()}</p>
                        <p><span>Steps:</span> {activity.steps}</p>
                        <p><span>Distance:</span> {activity.distance} km</p>
                        <p><span>Calories Burned:</span> {activity.caloriesBurned}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ActivityList;
