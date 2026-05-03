package com.example.backend.web.controller;

import com.example.backend.service.SlotGenerationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/SlotGeneration")
@AllArgsConstructor
public class SlotGenerationController {

    private final SlotGenerationService slotGenerationService;

    @GetMapping("/{businessId}/slots")
    public ResponseEntity<List<String>> getAvailableSlots(@PathVariable Long businessId, @RequestParam Long serviceId, @RequestParam String Date) {


        LocalDate localDate =  LocalDate.parse(Date);

        if (localDate.isBefore(LocalDate.now())) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST,"Cannot Book slots in the past");
        }

        List<LocalDateTime> slots = slotGenerationService.generateSlots(businessId, serviceId, localDate);

        List<String> timeStrings = slots.stream()
                .map(slot->slot.toLocalTime().toString())
                .toList();

        return ResponseEntity.ok(timeStrings);
    }
}
