package com.example.backend.model;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "Users",
    indexes ={
        @Index(name="idx_email",columnList = "email")
    }
)
@Data
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String name;
    @Column(unique = true)
    String email;
    String password;
    @Enumerated(EnumType.STRING)
    Role role;
    LocalDateTime created_at;
    LocalDateTime updated_at;
}
