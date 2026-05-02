package com.example.backend.service.impl;

import com.example.backend.dto.business.BusinessResponseDTO;
import com.example.backend.dto.service.ServiceRequestDTO;
import com.example.backend.dto.service.ServiceResponseDTO;
import com.example.backend.model.Business;
import com.example.backend.model.Role;
import com.example.backend.model.User;
import com.example.backend.repository.BusinessRepository;
import com.example.backend.repository.ServiceRepository;
import com.example.backend.repository.UserRepository;
import com.example.backend.service.ServiceService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@Service
@AllArgsConstructor
public class ServiceServiceImpl implements ServiceService {
    private final ServiceRepository serviceRepository;
    private final BusinessRepository businessRepository;
    private final UserRepository userRepository;

    @Override
    public List<ServiceResponseDTO> getAllServicesByBusiness(Long businessId) {
        return ServiceResponseDTO.fromEntities(serviceRepository.findByBusinessIdAndIsActive(businessId, true));
    }

    @Override
    public ServiceResponseDTO createService(Long userId, ServiceRequestDTO serviceRequestDTO) {
        Business business = businessRepository.findByOwner_Id(userId);
        int price = Integer.parseInt(String.valueOf(serviceRequestDTO.getPrice()));
        if (price < 0 )
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Price must be greater than zero");
        if (serviceRequestDTO.getName()==null || serviceRequestDTO.getName().isBlank())
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Service name is required");
        if (serviceRequestDTO.getDuration()<0)
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Duration must be greater than zero");
        com.example.backend.model.Service service = serviceRequestDTO.toEntity(business);
        return ServiceResponseDTO.fromEntity(serviceRepository.save(service));
    }

    @Override
    public ServiceResponseDTO updateService(Long userId, Long serviceId, ServiceRequestDTO serviceRequestDTO) {
        Business business = businessRepository.findByOwner_Id(userId);
        com.example.backend.model.Service service = serviceRepository.findByBusinessIdAndId(business.getId(), serviceId);
        service.setName(serviceRequestDTO.getName());
        service.setDescription(serviceRequestDTO.getDescription());
        service.setPrice(serviceRequestDTO.getPrice());
        service.setDuration(serviceRequestDTO.getDuration());
        return ServiceResponseDTO.fromEntity(serviceRepository.save(service));
    }

    @Override
    public ServiceResponseDTO detailsService(Long businessId, Long serviceId) {
        return ServiceResponseDTO.fromEntity(serviceRepository.findByBusinessIdAndId(businessId, serviceId));
    }

    @Override
    public void deleteService(Long userId, Long serviceId) {
        Business business = businessRepository.findByOwner_Id(userId);
        com.example.backend.model.Service service = serviceRepository.findByBusinessIdAndId(business.getId(), serviceId);
        service.setActive(false);
        serviceRepository.save(service);
    }


}
