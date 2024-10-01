package com.fitnesstrack.fitnesstrackapp.services.activity;

import com.fitnesstrack.fitnesstrackapp.dto.ActivityDto;
import com.fitnesstrack.fitnesstrackapp.entity.Activity;
import com.fitnesstrack.fitnesstrackapp.repository.ActivityRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityServiceImpl implements ActivityService{

    private final ActivityRepository activityRepository;

    public ActivityDto postActivity(ActivityDto dto)
    {
        Activity activity=new Activity();

        activity.setDate(dto.getDate());
        activity.setSteps(dto.getSteps());
        activity.setDistance(dto.getDistance());
        activity.setCaloriesBurned(dto.getCaloriesBurned());

        return activityRepository.save(activity).getActivityDTO();
    }

    public List<ActivityDto> getActivities(){
        List<Activity> activities=activityRepository.findAll();
        return activities.stream().map(Activity::getActivityDTO).collect(Collectors.toList());
    }
}