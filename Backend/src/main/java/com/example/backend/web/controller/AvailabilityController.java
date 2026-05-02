package com.example.backend.web.controller;

import com.example.backend.dto.availability.AvailabilityRequestDTO;
import com.example.backend.dto.availability.AvailabilityResponseDTO;
import com.example.backend.service.AvailabilityService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/availability")
@AllArgsConstructor
public class AvailabilityController {

    private final AvailabilityService availabilityService;

    @GetMapping
    public ResponseEntity<List<AvailabilityResponseDTO>> findAllAvailabilityByBusinessId(Long businessId) {
        return ResponseEntity.ok(availabilityService.findAllAvailability(businessId));
    }

    @PutMapping("/edit")
    public AvailabilityResponseDTO updateAvailability(@RequestBody AvailabilityRequestDTO requestDTO, Principal principal) {
        return ResponseEntity.ok(availabilityService.updateAvailability(requestDTO, Long.valueOf(principal.getName()))).getBody();
    }
}
