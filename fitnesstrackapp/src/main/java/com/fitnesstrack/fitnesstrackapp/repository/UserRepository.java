package com.fitnesstrack.fitnesstrackapp.repository;

import com.fitnesstrack.fitnesstrackapp.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User>findByEmail(String email);
}
