package com.example.graphskill_backend.controller;

import org.neo4j.driver.Driver;
import org.neo4j.driver.Record;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/recommendations")
public class RecommendationController {

    private final Driver driver;

    public RecommendationController(Driver driver) {
        this.driver = driver;
    }

    // ==========================================
    // Find projects suitable for a developer
    // ==========================================
    @GetMapping("/{developerId}")
    public List<Map<String, Object>> getRecommendations(
            @PathVariable String developerId) {

        String query = """
                MATCH (d:Developer {id: $developerId})
                      -[:HAS_SKILL]->
                      (s:Skill)
                      -[:REQUIRED_FOR]->
                      (p:Project)
                RETURN p.id AS projectId,
                       p.name AS project,
                       count(DISTINCT s) AS matchingSkills,
                       collect(DISTINCT s.name) AS skills
                ORDER BY matchingSkills DESC
                """;

        try (var session = driver.session()) {

            List<Record> records = session.run(
                    query,
                    Map.of("developerId", developerId)
            ).list();

            List<Map<String, Object>> recommendations =
                    new ArrayList<>();

            for (Record record : records) {

                recommendations.add(Map.of(
                        "projectId",
                        record.get("projectId").asString(),

                        "project",
                        record.get("project").asString(),

                        "matchingSkills",
                        record.get("matchingSkills").asInt(),

                        "skills",
                        record.get("skills")
                                .asList(value -> value.asString())
                ));
            }

            return recommendations;
        }
    }

    // ==========================================
    // Find developers suitable for a project
    // ==========================================
    @GetMapping("/project/{projectId}/developers")
    public List<Map<String, Object>> getProjectDevelopers(
            @PathVariable String projectId) {

        String query = """
                MATCH (d:Developer)
                      -[:HAS_SKILL]->
                      (s:Skill)
                      -[:REQUIRED_FOR]->
                      (p:Project {id: $projectId})
                RETURN d.id AS developerId,
                       d.name AS developer,
                       count(DISTINCT s) AS matchingSkills,
                       collect(DISTINCT s.name) AS skills
                ORDER BY matchingSkills DESC
                """;

        try (var session = driver.session()) {

            List<Record> records = session.run(
                    query,
                    Map.of("projectId", projectId)
            ).list();

            List<Map<String, Object>> developers =
                    new ArrayList<>();

            for (Record record : records) {

                developers.add(Map.of(
                        "developerId",
                        record.get("developerId").asString(),

                        "developer",
                        record.get("developer").asString(),

                        "matchingSkills",
                        record.get("matchingSkills").asInt(),

                        "skills",
                        record.get("skills")
                                .asList(value -> value.asString())
                ));
            }

            return developers;
        }
    }
}