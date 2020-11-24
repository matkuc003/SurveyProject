package com.project.survey.repositories;

import com.project.survey.model.Option;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface OptionRepository extends JpaRepository<Option,Long> {
/*
    Optional<List<Option>> findOptionsByQuestionID(Long id);
*/
}
