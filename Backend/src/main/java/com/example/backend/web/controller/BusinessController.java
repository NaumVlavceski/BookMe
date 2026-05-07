package com.example.backend.web.controller;

import com.example.backend.dto.appointment.AppointmentResponseDTO;
import com.example.backend.dto.business.BusinessRequestDTO;
import com.example.backend.dto.business.BusinessResponseDTO;
import com.example.backend.model.Business;
import com.example.backend.model.User;
import com.example.backend.service.AppointmentsService;
import com.example.backend.service.BusinessService;
import lombok.AllArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

import java.security.Principal;
import java.time.LocalDate;
import java.util.List;

@RestController
@RequestMapping("/api/businesses")
@AllArgsConstructor
public class BusinessController {
    private final BusinessService businessService;
    private final AppointmentsService appointmentsService;

    @GetMapping
    public ResponseEntity<Page<BusinessResponseDTO>> findAllBusinesses(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) String city,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "30") int size,
            @RequestParam(defaultValue = "id") String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return ResponseEntity.ok(businessService.findAllBusinesses(search, city, pageable));
    }
    @GetMapping("/details/{id}")
    public ResponseEntity<BusinessResponseDTO> detailsBusiness(@PathVariable Long id) {
        return ResponseEntity.ok(businessService.detailsBusiness(id));
    }
    @PutMapping("/edit")
    public ResponseEntity<BusinessResponseDTO> editBusiness(Principal principal, @RequestBody BusinessRequestDTO dto) {
        return ResponseEntity.ok(businessService.editBusiness(Long.valueOf(principal.getName()),dto));
    }
    @DeleteMapping("/delete/{id}")
    public void deleteBusiness(@PathVariable Long id,Principal principal) {
        System.out.println("CHECKK:"+principal.getName());
        businessService.deleteBusiness(Long.valueOf(principal.getName()),id);
    }

    @GetMapping("/bookedAppointments")
    public ResponseEntity<List<AppointmentResponseDTO>> findBookedAppointments(Principal principal, @RequestParam LocalDate date) {
        return ResponseEntity.ok(appointmentsService.findBookedAppointments(Long.valueOf(principal.getName()),date));
    }
}
