package com.project.survey.service;

import com.project.survey.model.Option;
import com.project.survey.repositories.OptionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;

@Service
public class OptionService {
    OptionRepository optionRepository;

    @Autowired
    OptionService(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }

    public ResponseEntity<Option> createOption(Option option) {
        try{
            Option o1 = optionRepository.save(option);
            return new ResponseEntity<>(o1, HttpStatus.OK);
        }
        catch(Exception ex){
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

/*    public ResponseEntity<List<Option>> getOptionByQuestionID(Long questionID){
        try{
            List<Option> list = optionRepository.findOptionsByQuestionID(questionID).get();
            return new ResponseEntity<>(list,HttpStatus.OK);
        }
        catch(Exception ex)
        {
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }*/
    public ResponseEntity<Option> getOptionByID(Long optionID){
        try{
            Option option = optionRepository.getOne(optionID);
            return new ResponseEntity<>(option,HttpStatus.OK);
        }
        catch(Exception ex)
        {
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }
}
