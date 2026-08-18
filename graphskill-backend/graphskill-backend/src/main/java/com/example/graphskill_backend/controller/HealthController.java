package com.example.graphskill_backend.controller;

import org.neo4j.driver.Driver;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api")
public class HealthController {

    private final Driver driver;

    public HealthController(Driver driver) {
        this.driver = driver;
    }

    @GetMapping("/health")
    public Map<String, String> health() {

        try (var session = driver.session()) {

            session.run("RETURN 1").consume();

            return Map.of(
                    "status", "UP",
                    "database", "CognoDB"
            );

        } catch (Exception e) {

            return Map.of(
                    "status", "DOWN",
                    "database", "CognoDB"
            );
        }
    }
}