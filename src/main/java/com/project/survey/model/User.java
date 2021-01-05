package com.project.survey.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;


@Table(name = "USER", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonIgnore
    private Long id;
    @Column(unique = true)
    private String username;
    private String password;
    private String email;
    private String phoneNumber;
    private int year;
    @ManyToOne(cascade = CascadeType.MERGE)
    private Role roles;
    private Boolean active;

}


