package com.project.survey.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Table(name = "Survey", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Survey {
    @Id
    public UUID survey_id = UUID.randomUUID();
    @Column(nullable = false)
    public String title;
    public String description;
    @OneToMany(cascade = {CascadeType.ALL})
    @JoinColumn(name = "survey_id")
    public List<Question> questions = new ArrayList<>();
    @Column(nullable = false)
    public Boolean isAnonymous;
    @Column(nullable = false)
    public Date lastModificationDate;
    @ManyToOne
    public User user;
}
