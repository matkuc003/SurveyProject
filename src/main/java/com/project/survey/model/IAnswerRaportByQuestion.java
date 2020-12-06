package com.project.survey.model;

import java.math.BigInteger;

public interface IAnswerRaportByQuestion {
 String getUsername();
 BigInteger getAnswer_id();
 String getText();
 String getType();
 Integer getRating_value();
 String getText_area_value();
 String getOption_text();
 String getRemarks();
}
