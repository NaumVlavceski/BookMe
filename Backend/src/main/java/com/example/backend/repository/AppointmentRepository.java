package com.example.backend.repository;

import com.example.backend.model.Appointment;
import com.example.backend.model.Status;
import com.example.backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;

@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Long> {
    //    @Query("""
//                SELECT a FROM Appointment a
//                WHERE a.service.id = :serviceId
//                AND a.status != 'CANCELLED'
//                AND a.startTime < :endTime
//                AND a.endTime > :startTime
//            """)
    List<Appointment> findAppointmentsByServiceIdAndStartTimeStartingWithAndStatusNot(
            Long serviceId,
            LocalDateTime startTime,
            Status status
    );

    List<Appointment> findByServiceIdAndStartTimeBetweenAndStatusNot(Long serviceId, LocalDateTime startTime, LocalDateTime endTime, Status status);

    List<Appointment> findAllByCustomer_Id(Long customerId);

    boolean existsAppointmentsByStartTimeAndServiceId(LocalDateTime startTime, Long serviceId);

    List<Appointment> findAppointmentsByBusinessIdAndStartTimeBetweenAndStatusNot(Long business_id, LocalDateTime startTime,LocalDateTime endTime, Status status);
}
