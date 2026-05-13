package com.example.backend.dto.appointment;

import com.example.backend.dto.availability.AvailabilityResponseDTO;
import com.example.backend.model.*;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class AppointmentResponseDTO {
    private Long id;
    private String customerName;
    private String serviceName;
    private Long serviceId;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Status status;
    private String notes;
    private LocalDateTime createdAt;
    private boolean upcoming;


    public static AppointmentResponseDTO fromEntity(Appointment appointment) {
        AppointmentResponseDTO dto = new AppointmentResponseDTO();
        dto.setId(appointment.getId());
        dto.setCustomerName(appointment.getCustomer().getName());
        dto.setServiceName(appointment.getService().getName());
        dto.setServiceId(appointment.getService().getId());
        dto.setStartTime(appointment.getStartTime());
        dto.setEndTime(appointment.getEndTime());
        dto.setStatus(appointment.getStatus());
        dto.setNotes(appointment.getNotes());
        dto.setCreatedAt(appointment.getCreatedAt());
        dto.setUpcoming(appointment.getStartTime().isAfter(LocalDateTime.now()));
        return dto;
    }
    public static List<AppointmentResponseDTO> fromEntities(List<Appointment> appointments) {
        return appointments.stream().map(AppointmentResponseDTO::fromEntity).toList();
    }
}
