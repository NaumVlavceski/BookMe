package com.example.backend.dto.availability;

import com.example.backend.model.Availability;
import com.example.backend.model.Business;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AvailabilityRequestDTO {
    private DayOfWeek dayOfWeek;
    @Schema(defaultValue = "00:00")
    private LocalTime openTime;
    @Schema(defaultValue = "00:00")
    private LocalTime closeTime;
    private boolean isActive;

    public Availability toEntity(Business business) {
        Availability availability = new Availability();
        availability.setBusiness(business);
        availability.setDayOfWeek(dayOfWeek);
        availability.setOpenTime(openTime);
        availability.setCloseTime(closeTime);
        availability.setActive(isActive);
        return availability;
    }
}
