package com.example.backend.dto.appointment;

import com.example.backend.model.Appointment;
import com.example.backend.model.Service;
import com.example.backend.model.Status;
import com.example.backend.model.User;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
public class AppointmentRequestDTO {
//    private Long serviceId;
    private LocalDateTime startTime;
//    private LocalDateTime endTime; //
    private String notes;

    public Appointment toEntity(User customer, Service service) {
        Appointment appointment = new Appointment();
        appointment.setCustomer(customer);
        appointment.setService(service);
        appointment.setBusiness(service.getBusiness());
        appointment.setStartTime(this.startTime);
        appointment.setEndTime(this.startTime.plusMinutes(service.getDuration()));
        appointment.setNotes(this.notes);
        appointment.setStatus(Status.PENDING);
        appointment.setCreatedAt(LocalDateTime.now());
        return appointment;
    }
}
