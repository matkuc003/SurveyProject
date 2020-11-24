package com.project.survey.service;

import com.project.survey.model.Option;
import com.project.survey.model.Question;
import com.project.survey.model.Survey;
import com.project.survey.model.User;
import com.project.survey.repositories.SurveyRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class SurveyService {
    @Autowired
    SurveyRepository surveyRepository;
    @Autowired
    QuestionService questionService;
    @Autowired
    OptionService optionService;
    @Autowired
    UserService userService;

    public ResponseEntity<Survey> createSurvey(String username, Survey survey) {
        try {
            System.out.println("jeste "+username);
            User user = userService.getUserByLogin(username).get();
            survey.user = user;
            Survey s1 = surveyRepository.save(survey);
            return new ResponseEntity<>(s1, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Boolean> updateSurvey(Survey survey) {
        try {
            surveyRepository.save(survey);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Survey>> getAllSurveys(String username) {
        try {
            List<Survey> tmpListOfSurveys = surveyRepository.findAllByUser_Username(username).get();
            return new ResponseEntity<>(tmpListOfSurveys, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }
    public ResponseEntity<Survey> getOneSurvey(Long id) {
        try {
            Survey survey = surveyRepository.getOne(id);
            return new ResponseEntity<>(survey, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Boolean> deleteSurvey(Survey survey) {
        try {
            surveyRepository.delete(survey);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
}
