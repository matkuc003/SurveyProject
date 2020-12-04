package com.project.survey.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;

import java.math.BigInteger;

public interface IAnswerCountRaport {
 Integer getRating_value();
 BigInteger getOption_id();
 BigInteger getQuestion_id();
 BigInteger getAnswer_count();
}
