package com.fitnesstrack.fitnesstrackapp.dto;

import lombok.Data;
import java.util.Date;

@Data
public class WorkoutDto {

    private long id;

    private String type;

    private Date date;

    private int duration;

    private int caloriesBurned;

    private double distanceCovered;

    private int stepsTaken;
}

