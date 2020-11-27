package com.project.survey.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "Survey", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Survey {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public long survey_id;
    public String title;
    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "survey_id")
    public List<Question> questions = new ArrayList<>();
    public Boolean isAnonymous;
    @ManyToOne
    public User user;
}
