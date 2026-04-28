package com.example.backend.dto.auth;

import com.example.backend.model.Role;
import com.example.backend.model.User;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class RegisterRequestDTO {
    private String name;
    private String email;
    private String password;
    private Role role;

    public User toEntity(String hashedPassword){
        User user = new User();
        user.setPassword(hashedPassword);
        user.setName(this.name);
        user.setEmail(this.email);
        user.setRole(this.role);
        return user;
    }
}
