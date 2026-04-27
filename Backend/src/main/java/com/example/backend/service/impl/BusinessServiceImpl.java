package com.example.backend.service.impl;

import com.example.backend.dto.business.BusinessRequestDTO;
import com.example.backend.dto.business.BusinessResponseDTO;
import com.example.backend.model.Availability;
import com.example.backend.model.Business;
import com.example.backend.model.User;
import com.example.backend.repository.AvailabilityRepository;
import com.example.backend.repository.BusinessRepository;
import com.example.backend.service.BusinessService;
import jakarta.transaction.Transactional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Service
@AllArgsConstructor
public class BusinessServiceImpl implements BusinessService{
    private final BusinessRepository businessRepository;
    private final AvailabilityRepository availabilityRepository;

    @Transactional
    public BusinessResponseDTO createBusiness(BusinessRequestDTO request, User owner) {
        Business saved = businessRepository.save(request.toEntity(owner));
        seedDefaultAvailability(saved);
        return BusinessResponseDTO.fromEntity(saved);
    }

    private void seedDefaultAvailability(Business saved) {
        List<Availability> defaults = new ArrayList<>();

        for(DayOfWeek day : DayOfWeek.values()) {
            Availability availability = new Availability();
            availability.setBusiness(saved);
            availability.setDay_of_week(day);
            availability.setOpenTime(LocalTime.of(9,0));
            availability.setCloseTime(LocalTime.of(18,0));

            boolean isWeekend = day != DayOfWeek.SATURDAY && day != DayOfWeek.SUNDAY;

            availability.setActive(isWeekend);

            defaults.add(availability);
        }
        availabilityRepository.saveAll(defaults);
    }

}
