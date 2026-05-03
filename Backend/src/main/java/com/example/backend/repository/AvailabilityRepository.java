package com.example.backend.repository;

import com.example.backend.model.Availability;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.DayOfWeek;
import java.util.List;
import java.util.Optional;

@Repository
public interface AvailabilityRepository extends JpaRepository<Availability, Long> {
    @Query("select a from Availability a where a.business.id = :businessId order by a.id")
    List<Availability> findByBusinessIdList(Long businessId);
    Availability findByBusinessId(Long businessId);
    Optional<Availability> findByBusinessIdAndDayOfWeek(Long businessId, DayOfWeek dayOfWeek);
}
