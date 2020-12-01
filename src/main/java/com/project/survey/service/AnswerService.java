package com.project.survey.service;

import com.project.survey.model.*;
import com.project.survey.repositories.AnswerRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class AnswerService {
    AnswerRepository answerRepository;
    OptionService optionService;
    QuestionService questionService;
    UserService userService;
    @Autowired
    AnswerService(AnswerRepository answerRepository, OptionService optionService, QuestionService questionService, UserService userService){
        this.answerRepository = answerRepository;
        this.optionService = optionService;
        this.questionService = questionService;
        this.userService = userService;
    }

    public ResponseEntity<Boolean> createAnswer(AnswerDTO answer){
        try{
            List<Option> optionsToSurvey = null;
            if(answer.getOptionsID()!=null)
                 optionsToSurvey = answer.getOptionsID().stream().map(optionID-> optionService.getOptionByID(optionID).getBody()).collect(Collectors.toList());
            Question question = questionService.getQuestionByID(answer.getQuestionID()).getBody();
            User user = userService.getUserByLogin(answer.getUsername()).get();
            Answer answerToSave = new Answer(0l,user,question,optionsToSurvey,answer.getTextAreaValue(),answer.getRatingValue());
            answerRepository.save(answerToSave);
            return new ResponseEntity<>(true,HttpStatus.OK);
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
    public ResponseEntity<List<Answer>> getAllAnswersByQuestion(Question question){
        try{
            List<Answer> answers = answerRepository.findAllByQuestion(question).get();
            return new ResponseEntity<>(answers,HttpStatus.OK);
        }
        catch(Exception ex)
        {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
}