package com.example.backend.repository;

import com.example.backend.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    List<Availability> findByBusinessId(Long businessId);
}
