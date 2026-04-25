package com.example.backend.repository;

import com.example.backend.model.Business;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BusinessUserRepository extends JpaRepository<Business, Integer> {
}
