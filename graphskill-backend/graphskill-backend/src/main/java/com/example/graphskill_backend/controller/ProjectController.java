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
@RequestMapping("/api/projects")
public class ProjectController {

    private final Driver driver;

    public ProjectController(Driver driver) {
        this.driver = driver;
    }

    @GetMapping
    public List<Map<String, Object>> getProjects() {

        String query = """
                MATCH (p:Project)
                RETURN p.id AS id,
                       p.name AS name
                ORDER BY p.id
                """;

        try (var session = driver.session()) {

            List<Record> records = session.run(query).list();

            List<Map<String, Object>> projects = new ArrayList<>();

            for (Record record : records) {
                projects.add(Map.of(
                        "id", record.get("id").asString(),
                        "name", record.get("name").asString()
                ));
            }

            return projects;
        }
    }
}