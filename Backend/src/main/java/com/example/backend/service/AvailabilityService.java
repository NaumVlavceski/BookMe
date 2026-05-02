package com.example.backend.service;

import com.example.backend.dto.availability.AvailabilityRequestDTO;
import com.example.backend.dto.availability.AvailabilityResponseDTO;

import java.util.List;

public interface AvailabilityService {
    List<AvailabilityResponseDTO> findAllAvailability(Long businessId);

    AvailabilityResponseDTO updateAvailability(AvailabilityRequestDTO availabilityRequestDTO, Long userId);
}
