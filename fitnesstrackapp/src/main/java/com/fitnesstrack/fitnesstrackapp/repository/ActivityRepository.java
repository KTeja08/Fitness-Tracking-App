package com.fitnesstrack.fitnesstrackapp.repository;

import com.fitnesstrack.fitnesstrackapp.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
}

