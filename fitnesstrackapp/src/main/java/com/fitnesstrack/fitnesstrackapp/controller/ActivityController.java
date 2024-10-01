package com.fitnesstrack.fitnesstrackapp.controller;

import com.fitnesstrack.fitnesstrackapp.dto.ActivityDto;
import com.fitnesstrack.fitnesstrackapp.services.activity.ActivityService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class ActivityController {

    private final ActivityService activityService;

    @PostMapping("/activity")
    public ResponseEntity<?> postActivity(@RequestBody ActivityDto dto) {
        try {
            ActivityDto createActivity = activityService.postActivity(dto);
            return ResponseEntity.status(HttpStatus.CREATED).body(createActivity);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong.");
        }
    }


    @GetMapping("/activities")
    public ResponseEntity<?> getActivities() {
        try {
            return ResponseEntity.ok(activityService.getActivities());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Something went wrong.");
        }
    }

}