package com.fitnesstrack.fitnesstrackapp.services.workout;

import com.fitnesstrack.fitnesstrackapp.dto.WorkoutDto;

import java.util.List;

public interface WorkoutServices
{
    WorkoutDto postWorkout(WorkoutDto workoutDto);

    List<WorkoutDto> getWorkouts();

}
