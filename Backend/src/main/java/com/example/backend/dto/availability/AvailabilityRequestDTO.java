package com.example.backend.dto.availability;

import com.example.backend.model.Availability;
import com.example.backend.model.Business;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalTime;

@Data
public class AvailabilityRequestDTO {
    private DayOfWeek dayOfWeek;
    private LocalTime openTime;
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
