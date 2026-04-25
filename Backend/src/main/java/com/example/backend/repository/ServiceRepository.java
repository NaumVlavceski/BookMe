package com.example.backend.repository;

import com.example.backend.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ServiceRepository extends JpaRepository<Service,Long> {
    List<Service> findByBusinessId(Long businessId);
    List<Service> findByIsActive(Boolean isActive);
}
