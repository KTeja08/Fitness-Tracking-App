package com.fitnesstrack.fitnesstrackapp;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class FitnesstrackappApplication {

	public static void main(String[] args) {
		SpringApplication.run(FitnesstrackappApplication.class, args);
	}
}
