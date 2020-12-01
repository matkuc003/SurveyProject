package com.project.survey.repositories;

import com.project.survey.model.Answer;
import com.project.survey.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    Optional<List<Answer>> findAllByQuestion(Question question);
}
