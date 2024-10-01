import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { notification } from 'antd';
import './WorkoutForm.css';

const WorkoutForm = ({ onWorkoutAdded }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:8082/api/workout', data);
      notification.success({
        message: 'Workout added successfully',
        duration: 5,
      });
      reset();  
      onWorkoutAdded(response.data); 
    } catch (error) {
      notification.error({
        message: 'Error while adding workout',
        description: error.response?.data || 'Something went wrong.',
        duration: 5,
      });
    }
  };

  return (
    <form className="workout-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <h2>Add Workouts</h2>
        <label htmlFor="type">Type</label>
        <select id="type" {...register('type', { required: true })}>
          <option value="">Select a workout type</option>
          <option value="Cardio">Cardio</option>
          <option value="Strength">Strength</option>
          <option value="Flexibility">Flexibility</option>
          <option value="HIIT">HIIT</option>
          <option value="Pilates">Pilates</option>
          <option value="Dance">Dance</option>
          <option value="Swimming">Swimming</option>
          <option value="Cycling">Cycling</option>
          <option value="Running">Running</option>
          <option value="Walking">Walking</option>
          <option value="Boxing">Boxing</option>
          <option value="CrossFit">CrossFit</option>
          <option value="Rowing">Rowing</option>
          <option value="Stretching">Stretching</option>
          <option value="Martial Arts">Martial Arts</option>
          <option value="Gymnastics">Gymnastics</option>
          <option value="Climbing">Climbing</option>
          <option value="Plyometrics">Plyometrics</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="date">Date</label>
        <input type="date" id="date" {...register('date', { required: true })} />
      </div>

      <div className="form-group">
        <label htmlFor="duration">Duration</label>
        <input type="number" id="duration" {...register('duration', { required: true })} />
      </div>

      <div className="form-group">
        <label htmlFor="caloriesBurned">Calories Burned</label>
        <input type="number" id="caloriesBurned" {...register('caloriesBurned', { required: true })} />
      </div>

      <div className="form-group">
        <label htmlFor="distanceCovered">Distance Covered</label>
        <input type="number" id="distanceCovered" {...register('distanceCovered', { required: true })} />
      </div>

      <div className="form-group">
        <label htmlFor="stepsTaken">Steps Taken</label>
        <input type="number" id="stepsTaken" {...register('stepsTaken', { required: true })} />
      </div>

      <button type="submit" className="submit-button">Submit</button>
    </form>
  );
};

export default WorkoutForm;
