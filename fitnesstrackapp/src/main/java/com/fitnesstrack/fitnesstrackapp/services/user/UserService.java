package com.fitnesstrack.fitnesstrackapp.services.user;

import com.fitnesstrack.fitnesstrackapp.entity.User;
import com.fitnesstrack.fitnesstrackapp.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.scheduling.annotation.Async;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public List<User> getAllUsers(){
        return userRepository.findAll();
    }

    public User addUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<User> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public User updateUser(User user) {
        return userRepository.save(user);
    }

    @Async
    public void sendMail(String to, String subject, String body) {
        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);
        message.setSubject(subject);
        message.setText(body);
        message.setFrom("kadamtejal074@gmail.com");

        javaMailSender.send(message);
    }

    public String encodePassword(String password) {
        return passwordEncoder.encode(password);
    }

    public String deleteUser(Long id) {
        userRepository.deleteById(id);
        return "Deleted Successfully";
    }

    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
}
