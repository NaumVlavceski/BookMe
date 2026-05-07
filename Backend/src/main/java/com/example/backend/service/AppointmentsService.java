package com.example.backend.service;

import com.example.backend.dto.appointment.AppointmentRequestDTO;
import com.example.backend.dto.appointment.AppointmentResponseDTO;
import org.springframework.web.bind.annotation.PathVariable;

import java.security.Principal;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface AppointmentsService {
    AppointmentResponseDTO createAppointment(Long customerId,Long serviceId, AppointmentRequestDTO requestDTO);
    List<AppointmentResponseDTO> getAppointments(Long customerId);
    AppointmentResponseDTO cancelAppointment(Long customerId,Long appointmentId);

    List<AppointmentResponseDTO> findBookedAppointments(Long userId, LocalDate date);
}
