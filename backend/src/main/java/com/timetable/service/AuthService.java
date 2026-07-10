package com.timetable.service;

import com.timetable.dto.AuthDtos.*;
import com.timetable.entity.User;
import com.timetable.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public AuthResponse register(RegisterRequest request) {
        if (request.username == null || request.username.isBlank()
                || request.password == null || request.password.isBlank()) {
            return new AuthResponse(false, "Username and password are required", null, null);
        }
        if (userRepository.existsByUsername(request.username)) {
            return new AuthResponse(false, "Username already exists", null, null);
        }
        User user = new User();
        user.setUsername(request.username);
        user.setPassword(passwordEncoder.encode(request.password));
        user.setRole("ADMIN");
        userRepository.save(user);
        return new AuthResponse(true, "Registration successful", user.getUsername(), user.getRole());
    }

    public AuthResponse login(LoginRequest request) {
        return userRepository.findByUsername(request.username)
                .filter(u -> passwordEncoder.matches(request.password, u.getPassword()))
                .map(u -> new AuthResponse(true, "Login successful", u.getUsername(), u.getRole()))
                .orElse(new AuthResponse(false, "Invalid username or password", null, null));
    }
}
