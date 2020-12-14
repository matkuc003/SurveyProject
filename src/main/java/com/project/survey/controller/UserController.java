package com.project.survey.controller;

import com.project.survey.model.Role;
import com.project.survey.model.User;
import com.project.survey.service.RoleService;
import com.project.survey.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/user")
public class UserController {

    private UserService userService;
    private RoleService roleService;

    @Autowired
    public UserController(UserService userService, RoleService roleService) {
        this.userService = userService;
        this.roleService = roleService;
    }

    @GetMapping(value = "/{login}")
    public ResponseEntity<User> getUser(@PathVariable("login") String login) {
        Optional<User> user = userService.getUserByLogin(login);

        if (!user.isPresent()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        } else {
            return new ResponseEntity<>(user.get(), HttpStatus.OK);
        }
    }

    @GetMapping("/getUsers")
    @PreAuthorize("hasAuthority('ROLE_ADMIN')")
    public List<User> getUsers() {
        return userService.getUsers();
    }

    @PutMapping("/change/{username}")
    public ResponseEntity<Boolean> changeUser(@PathVariable String username, @RequestBody User user) {
    return userService.updateUser(username,user);
    }
    @PostMapping("/create")
    public ResponseEntity<User> createUser(@RequestBody User user) {

        User userTmp = new User();
        userTmp.setActive(true);
        userTmp.setPassword(user.getPassword());
        userTmp.setUsername(user.getUsername());
        userTmp.setEmail(user.getEmail());
        Role role = roleService.findRoleByRole("ROLE_USER").get();
        userTmp.setRoles(role);

        if (user.getUsername().equals("")
                || userService.getUsers().stream().map(User::getUsername).anyMatch(s -> s.equals(user.getUsername()))) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        if (user.getEmail().equals("") || user.getPassword().equals("")) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }

        userService.createUser(userTmp);
        return new ResponseEntity<>(userTmp, HttpStatus.CREATED);
    }

    @PostMapping("/check")
    public ResponseEntity<Boolean> checkUser(@RequestBody User user) {
        String passwordToCheck = user.getPassword();
        String loginToCheck = user.getUsername();
        Optional<User> userInDB = userService.getUserByLogin(loginToCheck);
        if (!userInDB.isPresent())
            return new ResponseEntity<>(false, HttpStatus.NOT_FOUND);

        if (userInDB.get().getUsername().equals(loginToCheck) && userInDB.get().getPassword().equals(passwordToCheck))
            return new ResponseEntity<>(true, HttpStatus.OK);
        else
            return new ResponseEntity<>(false, HttpStatus.EXPECTATION_FAILED);
    }
    @PutMapping("/changePassword")
    public ResponseEntity<Boolean> changeUserPassword(@RequestBody Map<String,String> body){
        return userService.changeUserPassword(body.get("username"),body.get("oldPassword"),body.get("newPassword"));
    }
    @DeleteMapping("/delete/{username}")
    public ResponseEntity<Boolean> deleteUser(@PathVariable("username") String username) {
        try {
            long userId = userService.getUserByLogin(username).get().getId();
            userService.deleteUser(userId);
            return new ResponseEntity<>(true, HttpStatus.OK);
        } catch (RuntimeException e) {
            e.printStackTrace();
            return new ResponseEntity<>(false, HttpStatus.EXPECTATION_FAILED);
        }
    }
}
