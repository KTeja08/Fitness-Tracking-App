package com.fitnesstrack.fitnesstrackapp.services.goal;

import com.fitnesstrack.fitnesstrackapp.dto.GoalDto;
import java.util.List;

public interface GoalService {
    GoalDto createGoal(GoalDto goalDto);
    List<GoalDto> getAllGoals();
    GoalDto getGoalById(Long id);
    GoalDto updateGoal(Long id, GoalDto goalDto);

}
