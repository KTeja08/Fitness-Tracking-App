package com.fitnesstrack.fitnesstrackapp.services.dashboard;

import com.fitnesstrack.fitnesstrackapp.entity.Activity;
import com.fitnesstrack.fitnesstrackapp.entity.Goal;
import com.fitnesstrack.fitnesstrackapp.entity.Workout;
import com.fitnesstrack.fitnesstrackapp.repository.ActivityRepository;
import com.fitnesstrack.fitnesstrackapp.repository.GoalRepository;
import com.fitnesstrack.fitnesstrackapp.repository.WorkoutRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DashboardService {

    @Autowired
    private WorkoutRepository workoutRepository;

    @Autowired
    private ActivityRepository activityRepository;

    @Autowired
    private GoalRepository goalRepository;

    public int calculateTotalCaloriesBurned() {
        return workoutRepository.findAll().stream().mapToInt(w -> w.getCaloriesBurned()).sum();
    }

    public double calculateTotalDistanceCovered() {
        return workoutRepository.findAll().stream().mapToDouble(w -> w.getDistanceCovered()).sum();
    }

    public int calculateTotalStepsTaken() {
        return workoutRepository.findAll().stream().mapToInt(w -> w.getStepsTaken()).sum();
    }

    public int calculateTimeSpent() {
        return workoutRepository.findAll().stream().mapToInt(w -> w.getDuration()).sum();
    }

    public long countAchievedGoals() {
        return goalRepository.findAll().stream().filter(Goal::isAchieved).count();
    }

    public long countNotAchievedGoals() {
        return goalRepository.findAll().stream().filter(g -> !g.isAchieved()).count();
    }

    public List<Workout> getRecentWorkouts() {
        return workoutRepository.findAll();
    }

    public List<Activity> getRecentActivities() {
        return activityRepository.findAll();
    }
}
