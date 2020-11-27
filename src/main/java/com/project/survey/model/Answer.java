package com.project.survey.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Table(name = "Answers",schema = "dbo")
@Data
@Entity
public class Answer {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long answer_id;
    @ManyToOne
    private User user_id;
    @ManyToMany
    private List<Question> question_id;
    @ManyToMany
    private List<Option> option_id;
    private String textAreaValue;
}
