package com.fitnesstrack.fitnesstrackapp.services.workout;

import com.fitnesstrack.fitnesstrackapp.dto.WorkoutDto;
import com.fitnesstrack.fitnesstrackapp.entity.Workout;
import com.fitnesstrack.fitnesstrackapp.repository.WorkoutRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class WorkoutServicesImpl implements WorkoutServices {
    private final WorkoutRepository workoutRepository;

    @Override
    public WorkoutDto postWorkout(WorkoutDto workoutDto) {
        Workout workout = new Workout();

        workout.setDate(workoutDto.getDate());
        workout.setType(workoutDto.getType());
        workout.setDuration(workoutDto.getDuration());
        workout.setCaloriesBurned(workoutDto.getCaloriesBurned());
        workout.setStepsTaken(workoutDto.getStepsTaken());
        workout.setDistanceCovered(workoutDto.getDistanceCovered());

        // Save the workout entity and convert it to WorkoutDto
        Workout savedWorkout = workoutRepository.save(workout);
        return savedWorkout.getWorkoutDto();
    }

    @Override
    public List<WorkoutDto> getWorkouts() {
        List<Workout> workouts = workoutRepository.findAll();
        return workouts.stream()
                .map(Workout::getWorkoutDto)
                .collect(Collectors.toList());
    }
}
