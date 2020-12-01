package com.project.survey.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
public class AnswerDTO {
    private String username;
    private Long questionID;
    private List<Long> optionsID;
    private String textAreaValue;
    private Integer ratingValue;
    private Boolean multiAnswer;
}
