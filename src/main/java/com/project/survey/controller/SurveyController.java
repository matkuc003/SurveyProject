package com.project.survey.controller;

import com.project.survey.model.Option;
import com.project.survey.model.Question;
import com.project.survey.model.Survey;
import com.project.survey.service.OptionService;
import com.project.survey.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Set;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/survey")
public class SurveyController {
    SurveyService surveyService;
    OptionService optionService;
    @Autowired
    SurveyController(SurveyService surveyService) {
        this.surveyService = surveyService;
    }
    @GetMapping("/getAllSurveys")
    public ResponseEntity<List<Survey>> getAllSurveysByUsername(@RequestBody String username){
        return surveyService.getAllSurveys(username);
    }
    @PostMapping("/createSurvey/{username}")
    public ResponseEntity<Survey> createSurvey(@PathVariable String username,@RequestBody Survey survey){
        System.out.println(survey.toString());
        return surveyService.createSurvey(username,survey);
       // return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    @PutMapping("/updateSurvey")
    public ResponseEntity<Boolean> updateSurvey(@RequestBody Survey survey){
        return surveyService.updateSurvey(survey);
    }
    @DeleteMapping("/deleteSurvey")
    public ResponseEntity<Boolean> deleteSurvey(@RequestBody Survey survey){
        return surveyService.deleteSurvey(survey);
    }
}
