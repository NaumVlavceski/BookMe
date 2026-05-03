package com.example.backend.service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

public interface SlotGenerationService {
    List<LocalDateTime> generateSlots(Long businessId, Long serviceId, LocalDate date);
}
