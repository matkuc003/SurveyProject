package com.project.survey.repositories;

import com.project.survey.model.Option;
import com.project.survey.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Set;

public interface QuestionRepository extends JpaRepository<Question,Long> {
    @Modifying(clearAutomatically = true)
    @Query("UPDATE Question q SET " +
            "q.text = :text, q.type = :type, q.required=:required,q.remarks=:remarks,q.hasRemarks=:hasRemarks, q.options=:options" +
            " WHERE q.question_id=:question_id")
    int updateQuestion(
                      @Param("question_id") Long question_id,
                      @Param("type") String type,
                      @Param("text") String text,
                      @Param("options") Set<Option> options,
                      @Param("required") Boolean required,
                      @Param("remarks") String remarks,
                      @Param("hasRemarks") Boolean hasRemarks);
}
