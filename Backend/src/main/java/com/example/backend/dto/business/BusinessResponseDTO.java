package com.example.backend.dto.business;

import com.example.backend.model.Business;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class BusinessResponseDTO {
    private Long id;
    private Long owner_id;
    private String name;
    private String description;
    private String location;
    private String city;
    private String phone;


    public static BusinessResponseDTO fromEntity(Business business) {
        BusinessResponseDTO dto = new BusinessResponseDTO();
        dto.setId(business.getId());
        dto.setOwner_id(business.getOwner().getId());
        dto.setName(business.getName());
        dto.setDescription(business.getDescription());
        dto.setLocation(business.getLocation());
        dto.setCity(business.getCity());
        dto.setPhone(business.getPhone());
        return dto;
    }
    public static List<BusinessResponseDTO> fromList(List<Business> businesses) {
        return businesses.stream()
                .map(BusinessResponseDTO::fromEntity)
                .toList();
    }
}
