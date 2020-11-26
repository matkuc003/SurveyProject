package com.project.survey.service;

import com.project.survey.model.Option;
import com.project.survey.model.Question;
import com.project.survey.model.Survey;
import com.project.survey.repositories.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuestionService {
    @Autowired
    OptionService optionService;
    @Autowired
    SurveyService surveyService;
    @Autowired
    QuestionRepository questionRepository;

    public ResponseEntity<Question> createQuestion(Question question){
        try{
            Question q1 = questionRepository.save(question);
            return new ResponseEntity<>(q1,HttpStatus.OK);
        }
        catch(Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }

/*    public ResponseEntity<List<Question>> getQuestionsBySurvey(Long surveyID){
        try{
            Survey survey = surveyService.getOneSurvey(surveyID).getBody();
            List<Question> listQuestion= questionRepository.findAllBySurvey(survey).get();
            return new ResponseEntity<>(listQuestion, HttpStatus.OK);
        }
        catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);

        }
    }*/
public ResponseEntity<Question> getQuestionByID(Long questionID){
    try{
        Question question = questionRepository.getOne(questionID);
        return new ResponseEntity<>(question,HttpStatus.OK);
    }
    catch(Exception ex)
    {
        return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
    }
}
    public ResponseEntity<Boolean> deleteQuestionByQuestion(Question question) {
        try {
            questionRepository.delete(question);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }
}
