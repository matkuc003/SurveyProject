package com.project.survey.controller;

import com.project.survey.model.Answer;
import com.project.survey.model.AnswerDTO;
import com.project.survey.model.Question;
import com.project.survey.service.AnswerService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/answers")
public class AnswerController {
    @Autowired
    AnswerService answerService;

    @PostMapping("/createAnswer")
    public ResponseEntity<Boolean> createAnswer(@RequestBody AnswerDTO answer)
    {
        return answerService.createAnswer(answer);
    }
    @GetMapping("/getAnswersByQuestion")
    public ResponseEntity<List<Answer>> getAnswersByQuestion(@RequestBody Question question)
    {
        return answerService.getAllAnswersByQuestion(question);
    }
}
