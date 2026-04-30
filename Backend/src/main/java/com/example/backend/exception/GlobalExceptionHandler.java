package com.example.backend.exception;

import io.swagger.v3.oas.annotations.Hidden;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.server.ResponseStatusException;

@RestControllerAdvice
@Hidden
public class GlobalExceptionHandler {

    // Catch specific custom exceptions
    @ExceptionHandler(ResponseStatusException.class)
    public ResponseEntity<String> handleUserNotFound(ResponseStatusException ex) {
        return new ResponseEntity<>(ex.getMessage(),ex.getStatusCode());
    }

    // Catch-all for any other unhandled exceptions
    @ExceptionHandler(Exception.class)
    public ResponseEntity<String> handleGeneralException(Exception ex) {
        return new ResponseEntity<>("An unexpected error occurred", HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

