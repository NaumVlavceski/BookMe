package com.example.backend.service.impl;

import com.example.backend.dto.availability.AvailabilityRequestDTO;
import com.example.backend.dto.availability.AvailabilityResponseDTO;
import com.example.backend.model.Availability;
import com.example.backend.model.Business;
import com.example.backend.repository.AvailabilityRepository;
import com.example.backend.repository.BusinessRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AvailabilityService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class AvailabilityServiceImpl implements AvailabilityService {
    private final AvailabilityRepository availabilityRepository;
    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;

    @Override
    public List<AvailabilityResponseDTO> findAllAvailability(Long businessId) {
        return AvailabilityResponseDTO.fromEntities(availabilityRepository.findByBusinessIdList(businessId));
    }

    @Override
    public AvailabilityResponseDTO updateAvailability(AvailabilityRequestDTO availabilityRequestDTO, Long userId) {
        Business business = businessRepository.findByOwner_Id(userId);
        if (business == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Business not found for this user");
        }
        Availability availability = availabilityRepository.findByBusinessIdAndDayOfWeek(business.getId(), availabilityRequestDTO.getDayOfWeek());
        if (availability == null) {
            throw new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Availability not found for this day");
        }
        if (availabilityRequestDTO.getOpenTime().isAfter(availabilityRequestDTO.getCloseTime())) {
            throw new ResponseStatusException(
                    HttpStatus.BAD_REQUEST, "Open time cannot be after close time"
            );
        }
        availability.setOpenTime(availabilityRequestDTO.getOpenTime());
        availability.setCloseTime(availabilityRequestDTO.getCloseTime());
        availability.setActive(availabilityRequestDTO.isActive());
        return AvailabilityResponseDTO.fromEntity(availabilityRepository.save(availability));
    }

}
