package com.example.backend.dto.service;

import com.example.backend.model.Business;
import com.example.backend.model.Service;
import com.example.backend.model.User;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.validation.constraints.Digits;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ServiceRequestDTO {
    private String name;
    private String description;
    private int duration;
    private BigDecimal price;

    public Service toEntity(Business business){
        Service service = new Service();
        service.setName(this.getName());
        service.setDescription(this.getDescription());
        service.setDuration(this.getDuration());
        service.setPrice(this.getPrice());
        service.setActive(true);
        service.setBusiness(business);
        return service;
    }
}
