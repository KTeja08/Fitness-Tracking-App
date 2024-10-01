import axios from 'axios';

const API_URL = 'http://localhost:8082/api/activity';

export const postActivity = (activity) => {
    return axios.post(API_URL, activity);
};

export const getActivities = () => {
    return axios.get('http://localhost:8082/api/activities');
};
