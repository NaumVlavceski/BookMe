package com.example.backend.dto.appointment;

import com.example.backend.model.Appointment;
import com.example.backend.model.Service;
import com.example.backend.model.Status;
import com.example.backend.model.User;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
public class AppointmentResponseDTO {
    private Long id;
    private String customerName;
    private String serviceName;
    private String businessName;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private Status status;
    private String notes;
    private LocalDateTime createdAt;


    public static AppointmentResponseDTO fromEntity(Appointment appointment) {
        AppointmentResponseDTO dto = new AppointmentResponseDTO();
        dto.setId(appointment.getId());
        dto.setCustomerName(appointment.getCustomer().getName());
        dto.setServiceName(appointment.getService().getName());
        dto.setBusinessName(appointment.getService().getBusiness().getName());
        dto.setStartTime(appointment.getStartTime());
        dto.setEndTime(appointment.getEndTime());
        dto.setStatus(appointment.getStatus());
        dto.setNotes(appointment.getNotes());
        dto.setCreatedAt(appointment.getCreatedAt());
        return dto;
    }
}
