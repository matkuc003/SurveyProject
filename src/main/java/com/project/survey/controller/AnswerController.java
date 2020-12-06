package com.project.survey.controller;

import com.project.survey.model.*;
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
    @GetMapping("/getAnswersByQuestion/{question}")
    public ResponseEntity<List<Answer>> getAnswersByQuestion(@PathVariable Long question)
    {
        return answerService.getAllAnswersByQuestion(question);
    }
    @GetMapping("/getRaport/{question}")
    public ResponseEntity<List<IAnswerCountRaport>> getCountAnswersByQuestion(@PathVariable Long question)
    {
        return answerService.getCountAnswersByQuestion(question);
    }
    @GetMapping("/getRaportByQuestion/{question}")
    public ResponseEntity<List<IAnswerRaportByQuestion>> getAnswerRaportByQuestion(@PathVariable Long question)
    {
        return answerService.getAnswerRaportByQuestion(question);
    }
}
