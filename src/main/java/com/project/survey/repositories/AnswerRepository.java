package com.project.survey.repositories;

import com.project.survey.model.Answer;
import com.project.survey.model.IAnswerCountRaport;
import com.project.survey.model.IAnswerRaportByQuestion;
import com.project.survey.model.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    Optional<List<Answer>> findAllByQuestion(Question question);
    @Query(value = "SELECT a.rating_value, o.option_text, a.question_id, count(a.answer_id) as answer_count FROM dbo.answers as a" +
            " LEFT JOIN dbo.answer_option as ao ON ao.answer_id = a.answer_id" +
            " LEFT JOIN dbo.option as o ON ao.option_id = o.option_id WHERE a.question_id = :question_id" +
            " GROUP BY a.rating_value, o.option_text, a.question_id", nativeQuery = true)
    List<IAnswerCountRaport> getCountOptionAnswerByQuestion_id(@Param("question_id") Long question_id);

    @Query(value="SELECT u.username,a.answer_id,q.text,q.type,a.rating_value,a.text_area_value,opt.option_text,q.remarks FROM dbo.answers a " +
            "LEFT JOIN dbo.answer_option ao ON ao.answer_id=a.answer_id " +
            "LEFT JOIN dbo.user u ON a.user_id=u.id "+
            "LEFT JOIN dbo.option opt ON ao.option_id = opt.option_id " +
            "LEFT JOIN dbo.question q ON a.question_id = q.question_id " +
            "WHERE a.question_id = :question_id", nativeQuery = true)
    List<IAnswerRaportByQuestion> getAnswerRaportByQuestion_id(@Param("question_id") Long question_id);

}
