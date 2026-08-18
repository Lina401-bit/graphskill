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
@RequestMapping("/api/skills")
public class SkillController {

    private final Driver driver;

    public SkillController(Driver driver) {
        this.driver = driver;
    }

    @GetMapping
    public List<Map<String, Object>> getSkills() {

        String query = """
                MATCH (s:Skill)
                RETURN s.id AS id,
                       s.name AS name,
                       s.category AS category
                ORDER BY s.id
                """;

        try (var session = driver.session()) {

            List<Record> records = session.run(query).list();

            List<Map<String, Object>> skills = new ArrayList<>();

            for (Record record : records) {
                skills.add(Map.of(
                        "id", record.get("id").asString(),
                        "name", record.get("name").asString(),
                        "category", record.get("category").asString()
                ));
            }

            return skills;
        }
    }
}