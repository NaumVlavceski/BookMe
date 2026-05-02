package com.example.backend.repository;

import com.example.backend.model.Service;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
@Repository
public interface ServiceRepository extends JpaRepository<Service,Long> {
    List<Service> findByBusinessIdAndIsActive(Long businessId,Boolean active);
    List<Service> findByIsActive(Boolean isActive);
    Service findByBusinessIdAndId(Long businessId,Long id);
}
