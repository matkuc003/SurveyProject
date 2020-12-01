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
    private User user;
    @ManyToOne
    @JoinColumn(name = "question_id")
    private Question question;
    @ManyToMany
    @JoinTable(name = "answer_option", joinColumns = @JoinColumn(name = "answer_id"), inverseJoinColumns = @JoinColumn(name = "option_id"),schema = "dbo")
    private List<Option> options;
    private String textAreaValue;
    private Integer ratingValue;
}
