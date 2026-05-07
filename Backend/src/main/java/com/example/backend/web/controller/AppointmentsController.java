package com.example.backend.web.controller;

import com.example.backend.dto.appointment.AppointmentRequestDTO;
import com.example.backend.dto.appointment.AppointmentResponseDTO;
import com.example.backend.service.AppointmentsService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@AllArgsConstructor
public class AppointmentsController {

    private final AppointmentsService appointmentsService;

    @PostMapping
    public ResponseEntity<AppointmentResponseDTO> createAppointment(Principal principal, Long serviceId, @RequestBody AppointmentRequestDTO requestDTO) {
        return ResponseEntity.ok(appointmentsService.createAppointment(Long.valueOf(principal.getName()), serviceId, requestDTO));
    }

    @GetMapping("/me")
    public ResponseEntity<List<AppointmentResponseDTO>> getAppointment(Principal principal) {
        return ResponseEntity.ok(appointmentsService.getAppointments(Long.valueOf(principal.getName())));
    }

    @DeleteMapping("/{appointmentId}")
    public ResponseEntity<AppointmentResponseDTO> deleteAppointment(Principal principal,@PathVariable Long appointmentId) {
        return ResponseEntity.ok(appointmentsService.
                cancelAppointment(Long.valueOf(principal.getName()),appointmentId));
    }
}
