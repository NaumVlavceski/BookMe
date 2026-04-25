package com.example.backend.model;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Digits;
import lombok.Data;

import java.math.BigDecimal;

@Entity
@Data
public class Service {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;
    private int duration;
    @Digits(integer = 10, fraction = 2)
    private BigDecimal price;
    private boolean isActive;
    @ManyToOne
    @JoinColumn(name = "business_id")
    private BusinessUser business;

}
