package com.project.survey.repositories;

import com.project.survey.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

public interface SurveyRepository extends JpaRepository<Survey,UUID> {
Optional<List<Survey>> findAllByUser_Username(String username);
@Query(value = "SELECT * FROM dbo.survey AS s WHERE UPPER(s.title) LIKE %:part%", nativeQuery = true)
Optional<List<Survey>> findAllByPart(@Param("part") String part);
}
