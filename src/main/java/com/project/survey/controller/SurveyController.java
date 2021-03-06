package com.project.survey.controller;

import com.project.survey.model.Option;
import com.project.survey.model.Question;
import com.project.survey.model.Survey;
import com.project.survey.service.OptionService;
import com.project.survey.service.SurveyService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @GetMapping("/getAllSurveys/{username}")
    public ResponseEntity<List<Survey>> getAllSurveysByUsername(@PathVariable String username){
        return surveyService.getAllSurveys(username);
    }

    @GetMapping("/getSurvey/{id}")
    public ResponseEntity<Survey> getSurveyByID(@PathVariable String id){
        return surveyService.getOneSurvey(id);
    }

    @PostMapping("/createSurvey/{username}")
    public ResponseEntity<Survey> createSurvey(@PathVariable String username,@RequestBody Survey survey){
        System.out.println(survey.toString());
        return surveyService.createSurvey(username,survey);
       // return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }
    @GetMapping("/getSurveysByPart/{part}")
    public ResponseEntity<List<Survey>> getSurveyByPart(@PathVariable String part)
    {
        return surveyService.getSurveyByPart(part);
    }
    @PutMapping("/updateSurvey/{previousSurveyID}")
    public ResponseEntity<Boolean> updateSurvey(@PathVariable String previousSurveyID,@RequestBody Survey survey){
        return surveyService.updateSurvey(previousSurveyID,survey);
    }

    @DeleteMapping("/deleteSurvey")
    public ResponseEntity<Boolean> deleteSurvey(@RequestBody Survey survey){
        return surveyService.deleteSurvey(survey);
    }
}
