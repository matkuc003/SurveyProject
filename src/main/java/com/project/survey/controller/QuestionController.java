package com.project.survey.controller;

import com.project.survey.model.Option;
import com.project.survey.model.Question;
import com.project.survey.service.QuestionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/questions")
public class QuestionController {
    QuestionService questionService;

    @Autowired
    QuestionController(QuestionService questionService) {
        this.questionService = questionService;
    }

    @PostMapping("/createQuestion")
    public ResponseEntity<Question> createSurvey(@RequestBody Question question) {
        System.out.println(question.toString());
        return questionService.createQuestion(question);
    }

    /*    @GetMapping("/getQuestions")
        public ResponseEntity<List<Question>> getQuestions(@RequestBody Long surveyID){
            return questionService.getQuestionsBySurvey(surveyID);
        }*/
    @GetMapping("/getQuestion/{questionID}")
    public ResponseEntity<Question> getQuestions(@PathVariable Long questionID) {
        return questionService.getQuestionByID(questionID);
    }
}
