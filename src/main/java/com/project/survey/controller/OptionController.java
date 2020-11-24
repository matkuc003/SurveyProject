package com.project.survey.controller;

import com.project.survey.model.Option;
import com.project.survey.model.Question;
import com.project.survey.model.Survey;
import com.project.survey.repositories.OptionRepository;
import com.project.survey.service.OptionService;
import net.bytebuddy.asm.Advice;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/options")
public class OptionController {
    OptionService optionService;

    @Autowired
    OptionController(OptionService optionService) {
        this.optionService = optionService;
    }

    @PostMapping("/createOption")
    public ResponseEntity<Option> createSurvey(@RequestBody Option option) {
        System.out.println(option.toString());
        return optionService.createOption(option);
    }

    /*    @GetMapping("/getOptions")
        public ResponseEntity<List<Option>> getOptions(@RequestBody Long questionID){
            return optionService.getOptionByQuestionID(questionID);
        }*/
    @GetMapping("/getOption/{optionID}")
    public ResponseEntity<Option> getOptionByID(@PathVariable Long optionID) {
        return optionService.getOptionByID(optionID);
    }
}
