package com.fitnesstrack.fitnesstrackapp.controller;

import com.fitnesstrack.fitnesstrackapp.config.SecurityConfig;
import com.fitnesstrack.fitnesstrackapp.dto.ResetPasswordRequest;
import com.fitnesstrack.fitnesstrackapp.entity.MailRequest;
import com.fitnesstrack.fitnesstrackapp.entity.User;
import com.fitnesstrack.fitnesstrackapp.services.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@CrossOrigin("http://localhost:3000")
@RequestMapping("/api")
public class UserController {

    @Autowired
    private UserService userService;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private SecurityConfig securityConfig;

    @Autowired
    private JavaMailSender mailSender;

    @GetMapping("/get-users")
    public List<User> getAllUsers(){
        return userService.getAllUsers();
    }

    @PostMapping("/save-user")
    public User saveUser(@RequestBody User user) {
        return userService.addUser(user);
    }

    @GetMapping("/get-user-by-id")
    public Optional<User> getUserById(@RequestParam Long id){
        return userService.getUserById(id);
    }

    @DeleteMapping("/delete-user")
    public String deleteUser(@RequestParam Long id){
        return userService.deleteUser(id);
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(user.getEmail(), user.getPassword())
            );
            SecurityContextHolder.getContext().setAuthentication(authentication);
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            return ResponseEntity.ok("Login successful");
        } catch (AuthenticationException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Login failed: Invalid email or password");
        }
    }

    @GetMapping("/user")
    public Optional<User> getUserByEmail(@RequestParam String email) {
        System.out.println(email.getClass().getTypeName());
        System.out.println(email);
        Optional<User> user = userService.findByEmail(email);
        System.out.println(user);
        System.out.println(user.isPresent());
        return user;
    }

    @PostMapping("/sendsignupmail")
    public String sendSignupMail(@RequestBody MailRequest mailRequest){
        System.out.println(mailRequest.getMail());
        userService.sendMail(mailRequest.getMail(), mailRequest.getSubject(), mailRequest.getBody());
        return "Mail sent successfully";
    }

    //    @PostMapping("/sendmail")
//    public String sendMail(@RequestBody MailRequest mailRequest) {
//        System.out.println(mailRequest.getMail());
//        userService.sendMail(mailRequest.getMail(), mailRequest.getSubject(), mailRequest.getBody());
//        return "Mail sent successfully!";
//    }
    @PostMapping("/sendmail")
    public ResponseEntity<String> sendMail(@RequestBody MailRequest mailRequest) {
        // Validate that all required fields are present
        if (mailRequest.getMail() == null || mailRequest.getMail().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Recipient email is missing or invalid.");
        }
        if (mailRequest.getSubject() == null || mailRequest.getSubject().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email subject is missing.");
        }
        if (mailRequest.getBody() == null || mailRequest.getBody().isEmpty()) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Email body is missing.");
        }

        // Try to send the email and catch any potential exceptions
        try {
            // Logging to help with debugging
            System.out.println("Sending email to: " + mailRequest.getMail());
            System.out.println("Subject: " + mailRequest.getSubject());
            System.out.println("Body: " + mailRequest.getBody());

            // Call the service to send the email
            userService.sendMail(mailRequest.getMail(), mailRequest.getSubject(), mailRequest.getBody());
            return ResponseEntity.ok("Mail sent successfully!");
        } catch (Exception e) {
            // Log the exception for debugging purposes
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Failed to send email: " + e.getMessage());
        }
    }

    @PostMapping("/forgot-password")
    public ResponseEntity<String> forgotPassword(@RequestBody MailRequest mailRequest) {
        Optional<User> userOpt = userService.findByEmail(mailRequest.getMail());

        if (userOpt.isPresent()) {
            // Generate a token or link and send it via email
            String resetToken = UUID.randomUUID().toString(); // Example token generation
            String resetLink = "http://localhost:3000/reset-password?token=" + resetToken;

            userService.sendMail(mailRequest.getMail(), "Password Reset Request",
                    "Click the following link to reset your password: " + resetLink);

            return ResponseEntity.ok("Password reset link sent to email.");
        } else {
            return ResponseEntity.badRequest().body("User not found with provided email.");
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody ResetPasswordRequest request) {
        System.out.println("Email received: " + request.getEmail());
        Optional<User> userOpt = userService.findByEmail(request.getEmail());

        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setPassword(userService.encodePassword(request.getNewPassword()));
            userService.updateUser(user);
            return ResponseEntity.ok().body("{\"success\": true}");
        } else {
            return ResponseEntity.badRequest().body("{\"success\": false, \"message\": \"Email not found\"}");
        }
    }

}