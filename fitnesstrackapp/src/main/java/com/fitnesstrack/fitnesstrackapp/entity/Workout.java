package com.fitnesstrack.fitnesstrackapp.entity;

import com.fitnesstrack.fitnesstrackapp.dto.WorkoutDto;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

import java.util.Date;

@Entity
@Data
public class Workout {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private String type;
    private Date date;
    private int duration;
    private int caloriesBurned;
    private double distanceCovered;
    private int stepsTaken;

    public WorkoutDto getWorkoutDto() {

        WorkoutDto workoutDto = new WorkoutDto();
        workoutDto.setId(this.id);
        workoutDto.setType(this.type);
        workoutDto.setDate(this.date);
        workoutDto.setDuration(this.duration);
        workoutDto.setCaloriesBurned(this.caloriesBurned);
        workoutDto.setDistanceCovered(this.distanceCovered);
        workoutDto.setStepsTaken(this.stepsTaken);

        return workoutDto;
    }
}
