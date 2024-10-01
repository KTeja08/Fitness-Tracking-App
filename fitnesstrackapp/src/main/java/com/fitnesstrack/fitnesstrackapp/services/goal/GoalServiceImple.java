package com.fitnesstrack.fitnesstrackapp.services.goal;

import com.fitnesstrack.fitnesstrackapp.dto.GoalDto;
import com.fitnesstrack.fitnesstrackapp.entity.Goal;
import com.fitnesstrack.fitnesstrackapp.repository.GoalRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GoalServiceImple implements GoalService {

    private final GoalRepository goalRepository;

    @Override
    public GoalDto createGoal(GoalDto goalDto) {
        Goal goal = new Goal();
        goal.setDescription(goalDto.getDescription());
        goal.setStartDate(goalDto.getStartDate());
        goal.setEndDate(goalDto.getEndDate());
        goal.setAchieved(goalDto.isAchieved());

        Goal savedGoal = goalRepository.save(goal);
        return convertToDto(savedGoal);
    }

    @Override
    public List<GoalDto> getAllGoals() {
        return goalRepository.findAll().stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public GoalDto getGoalById(Long id) {
        Optional<Goal> goal = goalRepository.findById(id);
        return goal.map(this::convertToDto).orElse(null);
    }

    @Override
    public GoalDto updateGoal(Long id, GoalDto goalDto) {
        Optional<Goal> existingGoal = goalRepository.findById(id);
        if (!existingGoal.isPresent()) {
            return null;
        }

        Goal goal = existingGoal.get();
        goal.setDescription(goalDto.getDescription());
        goal.setStartDate(goalDto.getStartDate());
        goal.setEndDate(goalDto.getEndDate());
        goal.setAchieved(goalDto.isAchieved());

        Goal updatedGoal = goalRepository.save(goal);
        return convertToDto(updatedGoal);
    }

    private GoalDto convertToDto(Goal goal) {
        GoalDto goalDto = new GoalDto();
        goalDto.setId(goal.getId());
        goalDto.setDescription(goal.getDescription());
        goalDto.setStartDate(goal.getStartDate());
        goalDto.setEndDate(goal.getEndDate());
        goalDto.setAchieved(goal.isAchieved());
        return goalDto;
    }
}