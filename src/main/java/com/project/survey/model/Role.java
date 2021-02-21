package com.project.survey.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
@Table(name = "roles", schema = "dbo")
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "role_id")
    private Long id;
    @Column(name = "role",unique = true)
    private String role;
    @Column(nullable = false)
    private Boolean p_admin_panel = false;
    @Column(nullable = false)
    private Boolean p_create_surveys = true;
    @Column(nullable = false)
    private Boolean p_delete_surveys = true;
    @Column(nullable = false)
    private Boolean p_edit_surveys = true;
    @Column(nullable = false)
    private Boolean p_results_surveys = true;
}