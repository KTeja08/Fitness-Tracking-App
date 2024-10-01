package com.fitnesstrack.fitnesstrackapp.repository;

import com.fitnesstrack.fitnesstrackapp.entity.Goal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GoalRepository extends JpaRepository<Goal, Long> {
}
