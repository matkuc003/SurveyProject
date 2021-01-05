package com.project.survey;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonMappingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.survey.model.Option;
import com.project.survey.model.Question;
import com.project.survey.model.Survey;
import com.project.survey.model.User;
import com.project.survey.service.UserService;
import org.junit.jupiter.api.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.MvcResult;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.web.context.WebApplicationContext;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;


@SpringBootTest
@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
class SurveyApplicationTests {
	@Autowired
	WebApplicationContext webApplicationContext;
	@Autowired
	UserService userService;
	Survey survey;
	MockMvc mvc;
	UUID uuid  = UUID.fromString("c25e55c2-e3ac-4cce-9bdc-95b3eba33a11");
	@BeforeEach
	public void setUp() {
		 mvc = MockMvcBuilders.webAppContextSetup(webApplicationContext).build();
		//user
		User user = userService.getUserByLogin("anowak").get();
		//options
		Option option = new Option(0l,"Test opcji");
		Option optionTwo = new Option(0l,"Test opcjidwa");
		List<Option> options = new ArrayList<>();
		options.add(option);
		options.add(optionTwo);
		//questions
		List<Question> questions = new ArrayList<>();
		Question question = new Question(0l,"Single choice","Test pytania",options,true,"test uwag",true);
		questions.add(question);
		//survey
		 survey= new Survey(uuid,"TestTytulTest","opisTest",questions,true,user);
	}
	protected String mapToJson(Object obj) throws JsonProcessingException {
		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.writeValueAsString(obj);
	}
	protected <T> T mapFromJson(String json, Class<T> clazz)
			throws JsonParseException, JsonMappingException, IOException {

		ObjectMapper objectMapper = new ObjectMapper();
		return objectMapper.readValue(json, clazz);
	}
	@Test
	@Order(4)
	public void getSurveysList() throws Exception {
		String uri = "/api/survey/getAllSurveys/anowak";
		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
				.accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
		String content = mvcResult.getResponse().getContentAsString();
		Survey[] surveyList = mapFromJson(content, Survey[].class);
		assertTrue(surveyList.length > 0);
	}
	@Test
	@Order(3)
	public void getOneSurvey() throws Exception {
		String uri = "/api/survey/getSurvey/"+uuid;
		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.get(uri)
				.accept(MediaType.APPLICATION_JSON_VALUE)).andReturn();

		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
		String content = mvcResult.getResponse().getContentAsString();
		Survey surveyFromGet = mapFromJson(content, Survey.class);
		assertTrue(surveyFromGet.getSurvey_id().equals(uuid));
	}
	@Test
	@Order(1)
	public void createSurvey() throws Exception {
		//test
		String uri = "/api/survey/createSurvey/anowak";
		String inputJson = mapToJson(survey);
		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.post(uri)
				.contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
		String content = mvcResult.getResponse().getContentAsString();
		assertEquals(mapFromJson(content,Survey.class).getSurvey_id(), survey.getSurvey_id());
	}
	@Test
	@Order(2)
	public void updateSurvey() throws Exception {
		String uri = "/api/survey/updateSurvey/"+uuid;
		survey.setTitle("TytulZaktualizowany");
		//test
		String inputJson = mapToJson(survey);
		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.put(uri)
				.contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
		String content = mvcResult.getResponse().getContentAsString();
		assertTrue(Boolean.parseBoolean(content));
	}
	@Test
	@Order(5)
	public void deleteSurvey() throws Exception {
		String uri = "/api/survey/deleteSurvey";
		survey.setTitle("TytulZaktualizowany");
		//test
		String inputJson = mapToJson(survey);
		MvcResult mvcResult = mvc.perform(MockMvcRequestBuilders.delete(uri)
				.contentType(MediaType.APPLICATION_JSON_VALUE).content(inputJson)).andReturn();

		int status = mvcResult.getResponse().getStatus();
		assertEquals(200, status);
		String content = mvcResult.getResponse().getContentAsString();
		assertTrue(Boolean.parseBoolean(content));
	}
}
