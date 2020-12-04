package com.project.survey.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "Question", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long question_id;
    public String type;
    public String text;
    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "question_id")
    public List<Option> options;
    public Boolean required;
    public String remarks;
    public Boolean hasRemarks;
}
