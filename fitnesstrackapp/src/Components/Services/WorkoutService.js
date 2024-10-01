import axios from 'axios';

const API_URL = 'http://localhost:8082/api';

export const postWorkout = async (workout) => {
  const response = await axios.post(`${API_URL}/workout`, workout);
  return response.data;
};

export const getWorkouts = async () => {
  const response = await axios.get(`${API_URL}/workouts`);
  return response.data;
};
