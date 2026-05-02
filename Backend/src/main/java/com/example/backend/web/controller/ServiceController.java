package com.example.backend.web.controller;

import com.example.backend.dto.service.ServiceRequestDTO;
import com.example.backend.dto.service.ServiceResponseDTO;
import com.example.backend.service.ServiceService;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/api/businesses")
@AllArgsConstructor
public class ServiceController {
    private final ServiceService serviceService;

    @GetMapping("/{businessId}/services")
    public ResponseEntity<List<ServiceResponseDTO>> getAllServices(@PathVariable Long businessId){
        return ResponseEntity.ok(serviceService.getAllServicesByBusiness(businessId));
    }
    @GetMapping("/{businessId}/services/{serviceId}")
    public ResponseEntity<ServiceResponseDTO> getService(@PathVariable Long businessId,@PathVariable Long serviceId){
        return ResponseEntity.ok(serviceService.detailsService(businessId,serviceId));
    }
    @PostMapping("/services/create")
    public ResponseEntity<ServiceResponseDTO> createService(Principal principal, @RequestBody ServiceRequestDTO serviceRequestDTO) {
        return ResponseEntity.ok(serviceService.createService(Long.valueOf(principal.getName()), serviceRequestDTO));
    }
    @PutMapping("/update/services/{serviceId}")
    public ResponseEntity<ServiceResponseDTO> updateService(Principal principal,@PathVariable Long serviceId, @RequestBody ServiceRequestDTO serviceRequestDTO) {
        return ResponseEntity.ok(serviceService.updateService(Long.valueOf(principal.getName()), serviceId, serviceRequestDTO));
    }
    @DeleteMapping("/delete/services/{serviceId}")
    public void deleteService(Principal principal, @PathVariable Long serviceId) {
        serviceService.deleteService(Long.valueOf(principal.getName()), serviceId);
    }
}
