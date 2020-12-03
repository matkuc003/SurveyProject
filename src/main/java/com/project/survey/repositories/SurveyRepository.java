package com.project.survey.repositories;

import com.project.survey.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SurveyRepository extends JpaRepository<Survey,UUID> {
Optional<List<Survey>> findAllByUser_Username(String username);
}
