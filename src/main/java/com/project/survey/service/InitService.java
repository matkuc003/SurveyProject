package com.project.survey.service;

import com.project.survey.model.Role;
import com.project.survey.model.User;
import com.project.survey.repositories.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import java.util.Arrays;
import java.util.HashSet;

@Service
public class InitService {
    private UserService userService;
    private RoleRepository roleRepository;
    @Autowired
    public InitService(UserService userService, RoleRepository roleRepository) {
        this.userService = userService;
        this.roleRepository = roleRepository;
    }
    @PostConstruct
    public void init() {
/*      Role r1 = new Role(0l,"ROLE_ADMIN");
        Role r2 = new Role(0l,"ROLE_USER");

        r1 = roleRepository.save(r1);
        r2 = roleRepository.save(r2);
        User u1 = new User(0L, "jkowalski", "admin", "jkowalski@survey.pl","999888777",18, (r1),true);
        User u2 = new User(0L, "anowak", "admin", "anowak@survey.pl","999888777",17,(r2),true);
        User u3 = new User(0L, "abodzio", "admin", "abodzio@survey.pl","999888777",20, (r1),true);

        u1 = userService.createUser(u1);
        u2 = userService.createUser(u2);
        u3 = userService.createUser(u3);*/
    }
}
