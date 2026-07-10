package com.timetable.dto;

public class AuthDtos {

    public static class RegisterRequest {
        public String username;
        public String password;
    }

    public static class LoginRequest {
        public String username;
        public String password;
    }

    public static class AuthResponse {
        public boolean success;
        public String message;
        public String username;
        public String role;

        public AuthResponse(boolean success, String message, String username, String role) {
            this.success = success;
            this.message = message;
            this.username = username;
            this.role = role;
        }
    }
}
