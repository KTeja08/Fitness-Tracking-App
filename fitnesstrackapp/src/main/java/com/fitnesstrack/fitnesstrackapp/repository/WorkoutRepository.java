package com.fitnesstrack.fitnesstrackapp.repository;

import com.fitnesstrack.fitnesstrackapp.entity.Workout;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkoutRepository extends JpaRepository<Workout, Long> {
}
