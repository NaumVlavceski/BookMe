package com.example.backend.service.impl;

import com.example.backend.dto.appointment.AppointmentRequestDTO;
import com.example.backend.dto.appointment.AppointmentResponseDTO;
import com.example.backend.model.Appointment;
import com.example.backend.model.Business;
import com.example.backend.model.Status;
import com.example.backend.model.User;
import com.example.backend.repository.AppointmentRepository;
import com.example.backend.repository.BusinessRepository;
import com.example.backend.repository.ServiceRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.AppointmentsService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Service
@AllArgsConstructor
public class AppointmentsServiceImpl implements AppointmentsService {
    private final AppointmentRepository appointmentRepository;
    private final ServiceRepository serviceRepository;
    private final UserRepository userRepository;
    private final BusinessRepository businessRepository;
    @Override
    public AppointmentResponseDTO createAppointment(Long customerId, Long serviceId, AppointmentRequestDTO requestDTO) {
        User customer = userRepository.findById(customerId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Customer Not Found"));
        com.example.backend.model.Service service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Service not found"));
        LocalDateTime dateTime = requestDTO.getStartTime();
        if (appointmentRepository.existsAppointmentsByStartTimeAndServiceId(dateTime, serviceId)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Appointment already exists");
        }
        Appointment appointment = requestDTO.toEntity(customer, service);

        return AppointmentResponseDTO.fromEntity(appointmentRepository.save(appointment));
    }

    @Override
    public List<AppointmentResponseDTO> getAppointments(Long customerId) {
        return AppointmentResponseDTO.fromEntities(appointmentRepository.findAllByCustomer_Id(customerId));
    }

    @Override
    public AppointmentResponseDTO cancelAppointment(Long customerId,Long appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(()->new ResponseStatusException(HttpStatus.NOT_FOUND, "Appointment Not Found"));
        if (!appointment.getCustomer().getId().equals(customerId)) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Customer Not Found");
        }
        if (appointment.getStartTime().isBefore(LocalDateTime.now())) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "You cant cancel appointment in past");
        }
        appointment.setStatus(Status.CANCELLED);
        return AppointmentResponseDTO.fromEntity(appointmentRepository.save(appointment));
    }

    @Override
    public List<AppointmentResponseDTO> findBookedAppointments(Long userId, LocalDate date) {
        Business business = businessRepository.findByOwner_Id(userId);
        if (date == null) {
            return AppointmentResponseDTO.fromEntities(appointmentRepository.findByBusinessId(business.getId()));
        }
        LocalDateTime startTime = date.atStartOfDay();
        LocalDateTime endTime = date.atTime(23,59,59);
        List<Appointment> appointments = appointmentRepository.findAppointmentsByBusinessIdAndStartTimeBetweenAndStatusNot(business.getId(),startTime,endTime, Status.CANCELLED);
        return AppointmentResponseDTO.fromEntities(appointments);
    }
}
