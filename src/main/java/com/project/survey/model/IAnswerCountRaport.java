package com.project.survey.model;

import java.math.BigInteger;

public interface IAnswerCountRaport {
 Integer getRating_value();
 String getOption_text();
 BigInteger getQuestion_id();
 BigInteger getAnswer_count();
}
