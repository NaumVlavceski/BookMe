package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Business {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "owner_id")
    private User owner;
    private String name;
    private String description;
    private String location;
    private String city;
    private String phone;
    private LocalDateTime createdAt;

}
