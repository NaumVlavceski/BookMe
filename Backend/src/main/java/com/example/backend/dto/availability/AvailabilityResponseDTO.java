package com.example.backend.dto.availability;

import com.example.backend.dto.business.BusinessResponseDTO;
import com.example.backend.model.Availability;
import com.example.backend.model.Business;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
public class AvailabilityResponseDTO {
    private Long id;
    private Long businessId;
    private DayOfWeek dayOfWeek;
    private LocalTime openTime;
    private LocalTime closeTime;
    private boolean isActive;

    public static AvailabilityResponseDTO fromEntity(Availability availability) {
        AvailabilityResponseDTO dto = new AvailabilityResponseDTO();
        dto.setId(availability.getId());
        dto.setBusinessId(availability.getBusiness().getId());
        dto.setDayOfWeek(availability.getDayOfWeek());
        dto.setOpenTime(availability.getOpenTime());
        dto.setCloseTime(availability.getCloseTime());
        dto.setActive(availability.isActive());
        return dto;
    }
}
