package com.fitnesstrack.fitnesstrackapp.dto;

import lombok.Data;

import java.util.Date;

@Data
public class GoalDto {

    private long id;
    private String description;
    private Date startDate;
    private Date endDate;
    private boolean achieved;
}
