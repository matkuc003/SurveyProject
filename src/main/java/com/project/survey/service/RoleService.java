package com.project.survey.service;

import com.project.survey.model.Role;
import com.project.survey.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class RoleService {
    RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository){
        this.roleRepository=roleRepository;
    }
    public Optional<Role> findRoleByRole(String role) {
        return roleRepository.findRoleByRole(role);
    }

}
