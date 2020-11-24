package com.project.survey.repositories;

import com.project.survey.model.Question;
import com.project.survey.model.Survey;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
public interface QuestionRepository extends JpaRepository<Question,Long> {
}
