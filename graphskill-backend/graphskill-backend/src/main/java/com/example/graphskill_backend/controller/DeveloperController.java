package com.example.graphskill_backend.controller;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/developers")
public class DeveloperController {

    private final Driver driver;

    public DeveloperController(Driver driver) {
        this.driver = driver;
    }

    @GetMapping
    public List<Map<String, Object>> getDevelopers() {

        String query = """
                MATCH (d:Developer)
                RETURN d.id AS id,
                       d.name AS name,
                       d.email AS email
                ORDER BY d.name
                """;

        try (var session = driver.session()) {

            List<Record> records = session.run(query).list();

            List<Map<String, Object>> developers = new ArrayList<>();

            for (Record record : records) {
                developers.add(Map.of(
                        "id", record.get("id").asString(),
                        "name", record.get("name").asString(),
                        "email", record.get("email").asString()
                ));
            }

            return developers;
        }
    }
}