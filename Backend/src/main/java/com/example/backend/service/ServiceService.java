package com.example.backend.service;

import com.example.backend.dto.service.ServiceRequestDTO;
import com.example.backend.dto.service.ServiceResponseDTO;

import java.util.List;

public interface ServiceService {
    List<ServiceResponseDTO> getAllServicesByBusiness(Long businessId);

    ServiceResponseDTO createService(Long userId, ServiceRequestDTO serviceRequestDTO);

    ServiceResponseDTO updateService(Long userId, Long serviceId, ServiceRequestDTO serviceRequestDTO);

    ServiceResponseDTO detailsService(Long businessId, Long serviceId);

    void deleteService(Long userId, Long serviceId);
}
