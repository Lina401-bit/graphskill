package com.example.graphskill_backend.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public Map<String, String> handleException(Exception e) {

        e.printStackTrace();

        return Map.of(
                "error", "Internal server error",
                "message", e.getMessage() != null
                        ? e.getMessage()
                        : e.getClass().getSimpleName()
        );
    }
}
