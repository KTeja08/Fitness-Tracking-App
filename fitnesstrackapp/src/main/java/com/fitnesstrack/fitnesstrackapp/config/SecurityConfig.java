package com.fitnesstrack.fitnesstrackapp.config;

import com.fitnesstrack.fitnesstrackapp.services.user.CustomUserDetailsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
    @Autowired
    private CustomUserDetailsService customUserDetailsService;


    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception {
        return httpSecurity
                .csrf(AbstractHttpConfigurer::disable)
                .cors(Customizer.withDefaults())
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/save-user","/api/get-users", "/api/login", "/api/reset-password", "/api/sendsignupmail", "/api/sendmail","/api/forgot-password","/api/delete-user","/api/get-user-by-id","/api/workouts", "/api/activities", "/api/goals","/api/dashboard/calories-burned","/api/dashboard/distance-covered","/api/dashboard/steps-taken","/api/dashboard/time-spent","/api/dashboard/achieved-goals","/api/dashboard/not-achieved-goals","/api/dashboard/recent-workouts","/api/dashboard/recent-activities","/api/activity","/api/workout","/api/goal","/api/goal/**").permitAll()
                        .anyRequest().authenticated()
                )
                .userDetailsService(customUserDetailsService)
                .build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }
}
