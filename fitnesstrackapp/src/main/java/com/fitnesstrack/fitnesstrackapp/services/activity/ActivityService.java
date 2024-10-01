package com.fitnesstrack.fitnesstrackapp.services.activity;

import com.fitnesstrack.fitnesstrackapp.dto.ActivityDto;

import java.util.List;

public interface ActivityService {

    ActivityDto postActivity(ActivityDto dto);

    List<ActivityDto> getActivities();
}