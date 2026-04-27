package com.example.backend.dto.business;

import com.example.backend.model.Business;
import lombok.Data;

import java.sql.Timestamp;

@Data
public class BusinessResponseDTO {
    private Long id;
    private String name;
    private String description;
    private String location;
    private String city;
    private String phone;
    private Timestamp created_at;


    public static BusinessResponseDTO fromEntity(Business business) {
        BusinessResponseDTO dto = new BusinessResponseDTO();
        dto.setId(business.getId());
        dto.setName(business.getName());
        dto.setDescription(business.getDescription());
        dto.setLocation(business.getLocation());
        dto.setCity(business.getCity());
        dto.setPhone(business.getPhone());
        dto.setCreated_at(business.getCreated_at());
        return dto;
    }
}
