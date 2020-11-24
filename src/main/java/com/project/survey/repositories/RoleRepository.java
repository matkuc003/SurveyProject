package com.project.survey.repositories;

import com.project.survey.model.Role;
import com.project.survey.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoleRepository extends JpaRepository<Role,Long> {
    Optional<Role> findRoleByRole(String role);
}
