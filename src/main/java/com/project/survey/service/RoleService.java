package com.project.survey.service;

import com.project.survey.model.Role;
import com.project.survey.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class RoleService {
    RoleRepository roleRepository;

    @Autowired
    public RoleService(RoleRepository roleRepository) {
        this.roleRepository = roleRepository;
    }

    public Optional<Role> findRoleByRole(String role) {
        return roleRepository.findRoleByRole(role);
    }

    public ResponseEntity<Role> createRole(Role role) {
        try {
            Role newRole = roleRepository.save(role);
            return new ResponseEntity<>(newRole, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Boolean> updateRole(Role role) {
        try {
            System.out.println(role);
            Role newRole = roleRepository.save(role);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<Boolean> deleteRole(String role_name) {
        try {
            Role tmpRole = roleRepository.findRoleByRole(role_name).get();
            roleRepository.delete(tmpRole);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (Exception ex) {
            ex.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    public ResponseEntity<List<Role>> getRoles(){
        try{
            List<Role> roleList = roleRepository.findAll();
            return new ResponseEntity<>(roleList,HttpStatus.OK);
        }
        catch(Exception ex){
            ex.printStackTrace();
            return new ResponseEntity<>(null,HttpStatus.BAD_REQUEST);
        }
    }

}
