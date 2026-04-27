package com.example.backend.dto.service;

import com.example.backend.model.Service;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ServiceResponseDTO {
    private Long id;
    private String name;
    private String description;
    private int duration;
    private BigDecimal price;
    private boolean isActive;
    private Long businessId;


    public static ServiceResponseDTO fromEntity(Service service) {
        ServiceResponseDTO dto = new ServiceResponseDTO();
        dto.setId(service.getId());
        dto.setName(service.getName());
        dto.setDescription(service.getDescription());
        dto.setDuration(service.getDuration());
        dto.setPrice(service.getPrice());
        dto.setActive(service.isActive());
        dto.setBusinessId(service.getBusiness().getId());
        return dto;
    }
}
