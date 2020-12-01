package com.project.survey.service;

import com.project.survey.model.User;
import com.project.survey.repositories.RoleRepository;
import com.project.survey.repositories.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    UserRepository userRepository;
    RoleRepository roleRepository;
    BCryptPasswordEncoder bCryptPasswordEncoder;

    @Autowired
    public UserService(UserRepository userRepository, RoleRepository roleRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
        this.userRepository = userRepository;
        this.roleRepository = roleRepository;
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
    }
    public List<User> getUsers() {
        return userRepository.findAll(Sort.by(Sort.Order.desc("id")));
    }

    public User getUser(long id) {
        return userRepository.findById(id).get();
    }

    public Optional<User> getUserByLogin(String username) {
        return userRepository.findByUsername(username);
    }

    public User createUser(User user) {
        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        user.setActive(true);
        return userRepository.save(user);
    }

    public ResponseEntity<Boolean> updateUser(String username, User user) {
        Optional<User> tmpUser = userRepository.findByUsername(username);
        if (tmpUser.isEmpty())
            return new ResponseEntity<>(false,HttpStatus.NOT_FOUND);
        tmpUser.get().setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        tmpUser.get().setUsername(user.getUsername());
        tmpUser.get().setEmail(user.getEmail());
        tmpUser.get().setPhoneNumber(user.getPhoneNumber());
        tmpUser.get().setYear(user.getYear());
        tmpUser.get().setActive(user.getActive());
        tmpUser.get().setRoles(user.getRoles());

        User saveUser = userRepository.save(tmpUser.get());
        return new ResponseEntity<>(true, HttpStatus.OK);
    }

    public void deleteUser(long id) {
        userRepository.deleteById(id);
    }

    public Optional<User> findByUsername(String username) {
        return userRepository.findByUsername(username);
    }
}
