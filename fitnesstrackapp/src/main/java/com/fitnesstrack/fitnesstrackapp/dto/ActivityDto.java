package com.fitnesstrack.fitnesstrackapp.dto;

import lombok.Data;

import java.util.Date;

@Data
public class ActivityDto {

    private long id;

    private Date date;

    private int steps;

    private double distance;

    private int caloriesBurned;
}
