package com.fitnesstrack.fitnesstrackapp.controller;

import com.fitnesstrack.fitnesstrackapp.entity.Activity;
import com.fitnesstrack.fitnesstrackapp.entity.Workout;
import com.fitnesstrack.fitnesstrackapp.services.dashboard.DashboardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "http://localhost:3000")
public class DashboardController {

    @Autowired
    private DashboardService dashboardService;

    @GetMapping("/calories-burned")
    public int getTotalCaloriesBurned() {
        return dashboardService.calculateTotalCaloriesBurned();
    }

    @GetMapping("/distance-covered")
    public double getTotalDistanceCovered() {
        return dashboardService.calculateTotalDistanceCovered();
    }

    @GetMapping("/steps-taken")
    public int getTotalStepsTaken() {
        return dashboardService.calculateTotalStepsTaken();
    }

    @GetMapping("/time-spent")
    public int getTotalTimeSpent() {
        return dashboardService.calculateTimeSpent();
    }

    @GetMapping("/achieved-goals")
    public long getAchievedGoalsCount() {
        return dashboardService.countAchievedGoals();
    }

    @GetMapping("/not-achieved-goals")
    public long getNotAchievedGoalsCount() {
        return dashboardService.countNotAchievedGoals();
    }

    @GetMapping("/recent-workouts")
    public List<Workout> getRecentWorkouts() {
        return dashboardService.getRecentWorkouts();
    }

    @GetMapping("/recent-activities")
    public List<Activity> getRecentActivities() {
        return dashboardService.getRecentActivities();
    }
}
