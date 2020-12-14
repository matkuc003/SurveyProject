package com.project.survey.controller;

import com.project.survey.model.Role;
import com.project.survey.service.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/role")
public class RoleController {
    @Autowired
    RoleService roleService;

    @PutMapping("/updateRole")
    public ResponseEntity<Boolean> updateRole(@RequestBody Role role){
        return roleService.updateRole(role);
    }
    @GetMapping("/getRole/{role_name}")
    public ResponseEntity<Role> getRole(@PathVariable String role_name){
        Role roleTmp = roleService.findRoleByRole(role_name).get();
        return new ResponseEntity<>(roleTmp, HttpStatus.OK);
    }
    @GetMapping("/getRoles")
    public ResponseEntity<List<Role>> getRoles(){
        return roleService.getRoles();
    }
    @PostMapping("/createRole")
    public ResponseEntity<Role> createRole(@RequestBody Role role){
        return roleService.createRole(role);
    }
    @DeleteMapping("/deleteRole/{role_name}")
    public ResponseEntity<Boolean> deleteRole(@PathVariable String role_name){
        return roleService.deleteRole(role_name);
    }
}
