package com.example.backend.repository;

import com.example.backend.model.Appointment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
    @Query("""
                SELECT a FROM Appointment a
                WHERE a.service.id = :serviceId
                AND a.status != 'CANCELLED'
                AND a.start_time < :endTime
                AND a.end_time > :startTime
            """)
    List<Appointment> findOverlappingAppointments(
            @Param("serviceId") Long serviceId,
            @Param("startTime") Timestamp startTime,
            @Param("endTime") Timestamp endTime
    );
}
