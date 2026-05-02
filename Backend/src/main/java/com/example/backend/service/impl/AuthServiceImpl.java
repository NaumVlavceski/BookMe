package com.example.backend.service.impl;

import com.example.backend.dto.auth.AuthResponseDTO;
import com.example.backend.dto.auth.LoginRequestDTO;
import com.example.backend.dto.auth.RegisterRequestDTO;
import com.example.backend.model.Availability;
import com.example.backend.model.Business;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.AvailabilityRepository;
import com.example.backend.repository.BusinessRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AuthService;
import com.example.backend.service.BusinessService;
import com.example.backend.service.JwtService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AvailabilityRepository availabilityRepository;
    private final BusinessRepository businessRepository;

    @Override
    @Transactional
    public AuthResponseDTO register(RegisterRequestDTO request) {
        if (userRepository.existsByEmail(request.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email already exists");
        }
        String hashedPassword = passwordEncoder.encode(request.getPassword());
        User user = request.toEntity(hashedPassword);
        User saved = userRepository.save(user);
        if (saved.getRole().equals(Role.BUSINESS_OWNER)) {
            Business business = new Business();
            business.setOwner(saved);
            business.setCreatedAt(LocalDateTime.now());
            Business savedBusiness = businessRepository.save(business);
            seedDefaultAvailability(savedBusiness);
        }
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

    private void seedDefaultAvailability(Business saved) {
        List<Availability> defaults = new ArrayList<>();

        for (DayOfWeek day : DayOfWeek.values()) {
            Availability availability = new Availability();
            availability.setBusiness(saved);
            availability.setDayOfWeek(day);
            availability.setOpenTime(LocalTime.of(9, 0));
            availability.setCloseTime(LocalTime.of(18, 0));

            boolean isWeekend = day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY;

            availability.setActive(isWeekend);

            defaults.add(availability);
        }
        availabilityRepository.saveAll(defaults);
    }
}
