package com.project.survey.model;

import java.math.BigInteger;

public interface IAnswerCountRaport {
 Integer getRating_value();
 BigInteger getOption_id();
 BigInteger getQuestion_id();
 BigInteger getAnswer_count();
}
