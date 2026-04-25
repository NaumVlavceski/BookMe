package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.sql.Timestamp;

@Entity
@Data
public class Appointment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    private User customer;
    @ManyToOne
    private Service service;

    private Timestamp start_time;
    private Timestamp end_time;
    private Status status;
    private String notes;
    private Timestamp created_at;

}
