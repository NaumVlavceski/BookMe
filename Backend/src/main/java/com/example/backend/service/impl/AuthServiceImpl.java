package com.example.backend.service.impl;

import com.example.backend.dto.auth.AuthResponseDTO;
import com.example.backend.dto.auth.LoginRequestDTO;
import com.example.backend.dto.auth.RegisterRequestDTO;
import com.example.backend.model.User;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AuthService;
import com.example.backend.service.JwtService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    @Override
    public AuthResponseDTO register(RegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(
                    HttpStatus.CONFLICT, "Email already exists"
            );
        }
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        User user = request.toEntity(hashedPassword);
        User saved = userRepository.save(user);

        String token = jwtService.generateToken(saved.getId(), saved.getRole().name());
        return AuthResponseDTO.fromEntity(saved, token);
    }

    @Override
    public AuthResponseDTO login(LoginRequestDTO request) {
        User user = userRepository.findByEmail(request.getEmail()).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.UNAUTHORIZED, "User not found"));
        if (!passwordEncoder.matches(request.getPassword(), user.getPassword())) {
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Wrong password");
        }

        String token = jwtService.generateToken(user.getId(), user.getRole().name());

        return AuthResponseDTO.fromEntity(user, token);
    }
}
