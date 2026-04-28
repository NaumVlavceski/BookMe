package com.example.backend.repository;

import com.example.backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    @Query("""
                SELECT a FROM Appointment a
                WHERE a.service.id = :serviceId
                AND a.status != 'CANCELLED'
                AND a.startTime < :endTime
                AND a.endTime > :startTime
            """)
    List<Appointment> findOverlappingAppointments(
            @Param("serviceId") Long serviceId,
            @Param("startTime") Timestamp startTime,
            @Param("endTime") Timestamp endTime
    );
}
