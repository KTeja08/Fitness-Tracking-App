package com.fitnesstrack.fitnesstrackapp.controller;

import com.fitnesstrack.fitnesstrackapp.dto.GoalDto;
import com.fitnesstrack.fitnesstrackapp.services.goal.GoalService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class GoalController {

    private final GoalService goalService;

    @PostMapping("/goal")
    public ResponseEntity<GoalDto> createGoal(@RequestBody GoalDto goalDto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(goalService.createGoal(goalDto));
    }

    @GetMapping("/goals")
    public ResponseEntity<List<GoalDto>> getAllGoals() {
        return ResponseEntity.ok(goalService.getAllGoals());
    }

    @GetMapping("/goal/{id}")
    public ResponseEntity<GoalDto> getGoalById(@PathVariable Long id) {
        GoalDto goalDto = goalService.getGoalById(id);
        if (goalDto == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(goalDto);
    }

    @PutMapping("/goal/{id}")
    public ResponseEntity<GoalDto> updateGoal(@PathVariable Long id, @RequestBody GoalDto goalDto) {
        GoalDto updatedGoal = goalService.updateGoal(id, goalDto);
        if (updatedGoal == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }
        return ResponseEntity.ok(updatedGoal);
    }
}
