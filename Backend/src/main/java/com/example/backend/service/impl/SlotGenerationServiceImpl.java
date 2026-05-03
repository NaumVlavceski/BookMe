package com.example.backend.service.impl;

import com.example.backend.model.Appointment;
import com.example.backend.model.Availability;
import com.example.backend.model.Status;
import com.example.backend.repository.AppointmentRepository;
import com.example.backend.repository.AvailabilityRepository;
import com.example.backend.repository.ServiceRepository;
import com.example.backend.service.SlotGenerationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@AllArgsConstructor
public class SlotGenerationServiceImpl implements SlotGenerationService {
    private final AvailabilityRepository availabilityRepository;
    private final ServiceRepository serviceRepository;
    private final AppointmentRepository appointmentRepository;

    @Override
    public List<LocalDateTime> generateSlots(Long businessId, Long serviceId, LocalDate date) {

        // 1 — get the day of week for the requested date
        DayOfWeek dayOfWeek = date.getDayOfWeek();

        // 2 — find availability for this business on this day
        Optional<Availability> availabilityOpt = availabilityRepository
                .findByBusinessIdAndDayOfWeek(businessId, dayOfWeek);

        // 3 — if no availability configured OR day is disabled → return empty
        if (availabilityOpt.isEmpty()) {
            return List.of();
        }

        Availability availability = availabilityOpt.get();

        // 4 — if day is disabled → return empty
        if (!availability.isActive()) {
            return List.of();
        }

        // 5 — get service duration
        com.example.backend.model.Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResponseStatusException(
                        HttpStatus.NOT_FOUND, "Service not found"));

        int durationMinutes = service.getDuration();

        // 6 — generate all possible slots from open to close
        List<LocalDateTime> allSlots = new ArrayList<>();
        LocalTime current = availability.getOpenTime();
        LocalTime close   = availability.getCloseTime();

        while (!current.plusMinutes(durationMinutes).isAfter(close)) {
            allSlots.add(LocalDateTime.of(date, current));
            current = current.plusMinutes(durationMinutes);
        }

        // 7 — find already booked slots for this day
        LocalDateTime startOfDay = date.atStartOfDay();
        LocalDateTime endOfDay   = date.atTime(23, 59, 59);

        List<Appointment> booked = appointmentRepository
                .findByServiceIdAndStartTimeBetweenAndStatusNot(
                        serviceId, startOfDay, endOfDay, Status.CANCELLED);

        // 8 — remove booked slots
        List<LocalDateTime> bookedTimes = booked.stream()
                .map(Appointment::getStartTime)
                .toList();

        return allSlots.stream()
                .filter(slot -> !bookedTimes.contains(slot))
                .toList();
    }

}
