package com.example.backend.dto.auth;

import com.example.backend.model.Role;
import com.example.backend.model.User;
import lombok.Data;

@Data
public class AuthResponseDTO {
    private Long id;
    private String username;
    private String email;
    private Role role;
    private String token;

    public static AuthResponseDTO fromEntity(User user, String token){
        AuthResponseDTO dto = new AuthResponseDTO();
        dto.setId(user.getId());
        dto.setUsername(user.getName());
        dto.setEmail(user.getEmail());
        dto.setRole(user.getRole());
        dto.setToken(token);
        return dto;
    }
}
