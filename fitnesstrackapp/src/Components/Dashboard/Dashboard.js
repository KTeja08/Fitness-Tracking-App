import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import "./Dashboard.css";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const Dashboard = () => {
    const [caloriesBurned, setCaloriesBurned] = useState(0);
    const [distanceCovered, setDistanceCovered] = useState(0.0);
    const [stepsTaken, setStepsTaken] = useState(0);
    const [timeSpent, setTimeSpent] = useState(0);
    const [achievedGoals, setAchievedGoals] = useState(0);
    const [notAchievedGoals, setNotAchievedGoals] = useState(0);
    const [recentWorkouts, setRecentWorkouts] = useState([]);
    const [recentActivities, setRecentActivities] = useState([]);

    useEffect(() => {
        fetchDashboardData();
    }, []);

    const fetchDashboardData = async () => {
        try {
            const calories = await axios.get('http://localhost:8082/api/dashboard/calories-burned');
            const distance = await axios.get('http://localhost:8082/api/dashboard/distance-covered');
            const steps = await axios.get('http://localhost:8082/api/dashboard/steps-taken');
            const time = await axios.get('http://localhost:8082/api/dashboard/time-spent');
            const achieved = await axios.get('http://localhost:8082/api/dashboard/achieved-goals');
            const notAchieved = await axios.get('http://localhost:8082/api/dashboard/not-achieved-goals');
            const workouts = await axios.get('http://localhost:8082/api/dashboard/recent-workouts');
            const activities = await axios.get('http://localhost:8082/api/dashboard/recent-activities');

            setCaloriesBurned(calories.data);
            setDistanceCovered(distance.data);
            setStepsTaken(steps.data);
            setTimeSpent(time.data);
            setAchievedGoals(achieved.data);
            setNotAchievedGoals(notAchieved.data);
            setRecentWorkouts(workouts.data);
            setRecentActivities(activities.data);
        } catch (error) {
            console.error('Error fetching dashboard data:', error);
        }
    };

    const workoutsData = {
        labels: recentWorkouts.map(workout => workout.date),
        datasets: [
            {
                label: 'Calories Burned',
                data: recentWorkouts.map(workout => workout.caloriesBurned),
                fill: false,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,0.2)',
                tension: 0.1
            },
            {
                label: 'Duration (minutes)',
                data: recentWorkouts.map(workout => workout.duration),
                fill: false,
                backgroundColor: 'rgba(153,102,255,1)',
                borderColor: 'rgba(153,102,255,0.2)',
                tension: 0.1
            }
        ]
    };

    const activitiesData = {
        labels: recentActivities.map(activity => activity.date),
        datasets: [
            {
                label: 'Calories Burned',
                data: recentActivities.map(activity => activity.caloriesBurned),
                fill: false,
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(75,192,192,0.2)',
                tension: 0.1
            },
            {
                label: 'Steps Taken',
                data: recentActivities.map(activity => activity.steps), 
                fill: false,
                backgroundColor: 'rgba(153,102,255,1)',
                borderColor: 'rgba(153,102,255,0.2)',
                tension: 0.1
            },
            {
                label: 'Distance Covered (km)',
                data: recentActivities.map(activity => activity.distance), 
                fill: false,
                backgroundColor: 'rgba(255,159,64,1)',
                borderColor: 'rgba(255,159,64,0.2)',
                tension: 0.1
            }
        ]
    };
    

    const data = {
        labels: ['Calories Burned', 'Distance Covered', 'Steps Taken', 'Time Spent'],
        datasets: [
            {
                label: 'Workout Summary',
                backgroundColor: 'rgba(75,192,192,1)',
                borderColor: 'rgba(0,0,0,1)',
                borderWidth: 2,
                data: [caloriesBurned, distanceCovered, stepsTaken, timeSpent],
            },
        ],
    };

    return (
        <div className="dashboard">
            <div className="card-container">
                <div className="card-title-box">
                    <div className="card-title">Total Calories Burned</div>
                    <div className="card-text">{caloriesBurned} Kcal</div>
                </div>
                <div className="card-title-box">
                    <div className="card-title">Total Distance Covered</div>
                    <div className="card-text">{distanceCovered} km</div>
                </div>
                <div className="card-title-box">
                    <div className="card-title">Total Steps Taken</div>
                    <div className="card-text">{stepsTaken}</div>
                </div>
                <div className="card-title-box">
                    <div className="card-title">Total Time Spent</div>
                    <div className="card-text">{timeSpent} minutes</div>
                </div>
                <div className="card-title-box">
                    <div className="card-title">Achieved Goals</div>
                    <div className="card-text">{achievedGoals}</div>
                </div>
                <div className="card-title-box">
                    <div className="card-title">Not Achieved Goals</div>
                    <div className="card-text">{notAchievedGoals}</div>
                </div>
            </div>
            <div className="chart-container">
                <div className="bar-chart">
                    <Bar
                        data={data}
                        options={{
                            title: {
                                display: true,
                                text: 'Workout Summary',
                                fontSize: 20,
                            },
                            legend: {
                                display: true,
                                position: 'right',
                            },
                        }}
                    />
                </div>
                <div className="line-charts">
                    <div className="chart-box">
                        <h2>Recent Workouts</h2>
                        <Line
                            data={workoutsData}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Recent Workouts',
                                    fontSize: 20,
                                },
                                legend: {
                                    display: true,
                                    position: 'right',
                                },
                            }}
                        />
                    </div>
                    <div className="chart-box">
                        <h2>Recent Activities</h2>
                        <Line
                            data={activitiesData}
                            options={{
                                title: {
                                    display: true,
                                    text: 'Recent Activities',
                                    fontSize: 20,
                                },
                                legend: {
                                    display: true,
                                    position: 'right',
                                },
                            }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
