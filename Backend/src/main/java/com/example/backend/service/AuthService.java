package com.example.backend.service;

import com.example.backend.dto.auth.AuthResponseDTO;
import com.example.backend.dto.auth.LoginRequestDTO;
import com.example.backend.dto.auth.RegisterRequestDTO;

public interface AuthService {
    AuthResponseDTO register(RegisterRequestDTO request);
    AuthResponseDTO login(LoginRequestDTO request);

}
