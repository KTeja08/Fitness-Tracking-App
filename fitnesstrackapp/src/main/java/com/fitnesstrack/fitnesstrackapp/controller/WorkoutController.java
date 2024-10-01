package com.fitnesstrack.fitnesstrackapp.controller;

import com.fitnesstrack.fitnesstrackapp.dto.WorkoutDto;
import com.fitnesstrack.fitnesstrackapp.services.workout.WorkoutServices;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class WorkoutController {
    private final WorkoutServices workoutServices;

    @PostMapping("/workout")
    public ResponseEntity<?> postWorkout(@RequestBody WorkoutDto dto) {
        try {
            WorkoutDto createdWorkout = workoutServices.postWorkout(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdWorkout);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong.");
        }
    }

    @GetMapping("/workouts")
    public ResponseEntity<?> getWorkouts() {
        try {
            List<WorkoutDto> workouts = workoutServices.getWorkouts();
            return ResponseEntity.ok(workouts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong.");
        }
    }
}
