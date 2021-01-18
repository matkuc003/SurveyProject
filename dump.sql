--
-- PostgreSQL database dump
--

-- Dumped from database version 13.0
-- Dumped by pg_dump version 13.0

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: dbo; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA dbo;


ALTER SCHEMA dbo OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: answer_option; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE dbo.answer_option (
    answer_id bigint NOT NULL,
    option_id bigint NOT NULL
);


ALTER TABLE dbo.answer_option OWNER TO postgres;

--
-- Name: answers; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE dbo.answers (
    answer_id bigint NOT NULL,
    rating_value integer,
    text_area_value character varying(255),
    question_id bigint,
    user_id bigint
);


ALTER TABLE dbo.answers OWNER TO postgres;

--
-- Name: answers_answer_id_seq; Type: SEQUENCE; Schema: dbo; Owner: postgres
--

ALTER TABLE dbo.answers ALTER COLUMN answer_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME dbo.answers_answer_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: option; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE dbo.option (
    option_id bigint NOT NULL,
    option_text character varying(255),
    question_id bigint
);


ALTER TABLE dbo.option OWNER TO postgres;

--
-- Name: option_option_id_seq; Type: SEQUENCE; Schema: dbo; Owner: postgres
--

ALTER TABLE dbo.option ALTER COLUMN option_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME dbo.option_option_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: question; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE dbo.question (
    question_id bigint NOT NULL,
    has_remarks boolean,
    remarks character varying(255),
    required boolean,
    text character varying(255),
    type character varying(255),
    survey_id uuid
);


ALTER TABLE dbo.question OWNER TO postgres;

--
-- Name: question_question_id_seq; Type: SEQUENCE; Schema: dbo; Owner: postgres
--

ALTER TABLE dbo.question ALTER COLUMN question_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME dbo.question_question_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: roles; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE dbo.roles (
    role_id bigint NOT NULL,
    p_admin_panel boolean,
    p_create_surveys boolean,
    p_delete_surveys boolean,
    p_edit_surveys boolean,
    p_results_surveys boolean,
    role character varying(255)
);


ALTER TABLE dbo.roles OWNER TO postgres;

--
-- Name: roles_role_id_seq; Type: SEQUENCE; Schema: dbo; Owner: postgres
--

ALTER TABLE dbo.roles ALTER COLUMN role_id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME dbo.roles_role_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: survey; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE dbo.survey (
    survey_id uuid NOT NULL,
    description character varying(255),
    is_anonymous boolean,
    title character varying(255),
    user_id bigint
);


ALTER TABLE dbo.survey OWNER TO postgres;

--
-- Name: user; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE dbo."user" (
    id bigint NOT NULL,
    active boolean,
    email character varying(255),
    password character varying(255),
    phone_number character varying(255),
    username character varying(255),
    year integer NOT NULL,
    roles_role_id bigint
);


ALTER TABLE dbo."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: dbo; Owner: postgres
--

ALTER TABLE dbo."user" ALTER COLUMN id ADD GENERATED BY DEFAULT AS IDENTITY (
    SEQUENCE NAME dbo.user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1
);


--
-- Name: user_role; Type: TABLE; Schema: dbo; Owner: postgres
--

CREATE TABLE dbo.user_role (
    id bigint NOT NULL,
    role_id bigint NOT NULL
);


ALTER TABLE dbo.user_role OWNER TO postgres;

--
-- Name: question_options; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.question_options (
    question_question_id bigint NOT NULL,
    options_option_id bigint NOT NULL
);


ALTER TABLE public.question_options OWNER TO postgres;

--
-- Name: survey_questions; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.survey_questions (
    survey_survey_id bigint NOT NULL,
    questions_question_id bigint NOT NULL
);


ALTER TABLE public.survey_questions OWNER TO postgres;

--
-- Data for Name: answer_option; Type: TABLE DATA; Schema: dbo; Owner: postgres
--

COPY dbo.answer_option (answer_id, option_id) FROM stdin;
2	6
4	8
4	9
6	7
8	10
9	6
11	8
12	18
13	18
\.


--
-- Data for Name: answers; Type: TABLE DATA; Schema: dbo; Owner: postgres
--

COPY dbo.answers (answer_id, rating_value, text_area_value, question_id, user_id) FROM stdin;
1	\N	tsss	6	\N
3	4	\N	7	\N
2	\N	\N	4	\N
4	\N	\N	5	\N
6	\N	\N	4	\N
5	2	\N	7	\N
7	\N	s	6	\N
8	\N	\N	5	\N
9	\N	\N	4	\N
10	2	\N	7	\N
11	\N	\N	5	\N
12	\N	\N	12	\N
13	\N	\N	12	\N
\.


--
-- Data for Name: option; Type: TABLE DATA; Schema: dbo; Owner: postgres
--

COPY dbo.option (option_id, option_text, question_id) FROM stdin;
48	Test opcji	27
49	Test opcjidwa	27
50	Test opcji	28
51	Test opcjidwa	28
5	tp1	4
6	tp2	4
7	tp3	4
8	tw1	5
9	tw2	5
10	tw3	5
11	tw4	5
54	Test opcji	30
55	Test opcjidwa	30
56	Test opcji	31
57	Test opcjidwa	31
60	Test opcji	33
61	Test opcjidwa	33
62	Test opcji	34
63	Test opcjidwa	34
18	s1	12
19	s2	12
20	Test opcji	13
21	Test opcjidwa	13
22	Test opcji	14
23	Test opcjidwa	14
24	Test opcji	15
25	Test opcjidwa	15
26	Test opcji	16
27	Test opcjidwa	16
28	Test opcji	17
29	Test opcjidwa	17
30	Test opcji	18
31	Test opcjidwa	18
32	Test opcji	19
33	Test opcjidwa	19
34	Test opcji	20
35	Test opcjidwa	20
36	Test opcji	21
37	Test opcjidwa	21
38	Test opcji	22
39	Test opcjidwa	22
42	Test opcji	24
43	Test opcjidwa	24
44	Test opcji	25
45	Test opcjidwa	25
66	Test opcji	36
67	Test opcjidwa	36
68	Test opcji	37
69	Test opcjidwa	37
72	Test opcji	39
73	Test opcjidwa	39
74	Test opcji	40
75	Test opcjidwa	40
78	Test opcji	42
79	Test opcjidwa	42
80	Test opcji	43
81	Test opcjidwa	43
84	Test opcji	45
85	Test opcjidwa	45
86	Test opcji	46
87	Test opcjidwa	46
90	Test opcji	48
91	Test opcjidwa	48
92	Test opcji	49
93	Test opcjidwa	49
96	Test opcji	51
97	Test opcjidwa	51
98	Test opcji	52
99	Test opcjidwa	52
102	Test opcji	54
103	Test opcjidwa	54
104	Test opcji	55
105	Test opcjidwa	55
\.


--
-- Data for Name: question; Type: TABLE DATA; Schema: dbo; Owner: postgres
--

COPY dbo.question (question_id, has_remarks, remarks, required, text, type, survey_id) FROM stdin;
3	f		f	t2	Text	30542622-2996-4ca5-9535-9ce651e4922b
30	t	test uwag	t	Test pytania	Single choice	\N
31	t	test uwag	t	Test pytania	Single choice	\N
33	t	test uwag	t	Test pytania	Single choice	\N
34	t	test uwag	t	Test pytania	Single choice	\N
36	t	test uwag	t	Test pytania	Single choice	\N
37	t	test uwag	t	Test pytania	Single choice	\N
4	t	uwagi testowe wpisane zostały	f	Test1PojedynczeZUwagamiz	Single choice	d8dd5519-c92a-4c8d-8269-a10a617d6760
5	f	Wpisz	f	TestWielu	Multi choice	d8dd5519-c92a-4c8d-8269-a10a617d6760
6	f		f	Test3Tekstowe	Text	d8dd5519-c92a-4c8d-8269-a10a617d6760
7	f		f	Test4Ocena	Rating	d8dd5519-c92a-4c8d-8269-a10a617d6760
39	t	test uwag	t	Test pytania	Single choice	\N
40	t	test uwag	t	Test pytania	Single choice	\N
42	t	test uwag	t	Test pytania	Single choice	\N
12	t		f	tresc	Single choice	158fbf13-8e74-40a5-993a-cfa5adc0965b
43	t	test uwag	t	Test pytania	Single choice	\N
13	t	test uwag	t	Test pytania	Single choice	a35deab9-69ee-4742-aa65-64ec4c854d82
14	t	test uwag	t	Test pytania	Single choice	45d0e56a-a7f7-4033-b845-29c3321dbed3
15	t	test uwag	t	Test pytania	Single choice	7eb6a139-a9eb-4585-bbe6-5db36e27bb6c
17	t	test uwag	t	Test pytania	Single choice	39fd1a1d-ea41-4521-9fba-a727c7ed1cad
16	t	test uwag	t	Test pytania	Single choice	\N
18	t	test uwag	t	Test pytania	Single choice	\N
19	t	test uwag	t	Test pytania	Single choice	\N
45	t	test uwag	t	Test pytania	Single choice	\N
20	t	test uwag	t	Test pytania	Single choice	\N
21	t	test uwag	t	Test pytania	Single choice	\N
22	t	test uwag	t	Test pytania	Single choice	\N
46	t	test uwag	t	Test pytania	Single choice	\N
24	t	test uwag	t	Test pytania	Single choice	\N
25	t	test uwag	t	Test pytania	Single choice	\N
27	t	test uwag	t	Test pytania	Single choice	\N
28	t	test uwag	t	Test pytania	Single choice	\N
48	t	test uwag	t	Test pytania	Single choice	\N
49	t	test uwag	t	Test pytania	Single choice	\N
51	t	test uwag	t	Test pytania	Single choice	\N
52	t	test uwag	t	Test pytania	Single choice	\N
54	t	test uwag	t	Test pytania	Single choice	\N
55	t	test uwag	t	Test pytania	Single choice	\N
\.


--
-- Data for Name: roles; Type: TABLE DATA; Schema: dbo; Owner: postgres
--

COPY dbo.roles (role_id, p_admin_panel, p_create_surveys, p_delete_surveys, p_edit_surveys, p_results_surveys, role) FROM stdin;
1	t	t	t	t	t	ROLE_ADMIN
2	f	t	t	t	t	ROLE_USER
13	f	f	f	t	f	ROLE_CUSTOM
\.


--
-- Data for Name: survey; Type: TABLE DATA; Schema: dbo; Owner: postgres
--

COPY dbo.survey (survey_id, description, is_anonymous, title, user_id) FROM stdin;
30542622-2996-4ca5-9535-9ce651e4922b	ttt	f	t1	2
d8dd5519-c92a-4c8d-8269-a10a617d6760	Testowa ankieta z pytaniami testowymi, zapraszam do wypełniania.	t	TestowaAnkietaAnonimowa	1
158fbf13-8e74-40a5-993a-cfa5adc0965b	opis anon	t	Testowa	1
a35deab9-69ee-4742-aa65-64ec4c854d82	opisTest	t	TestTytul	2
45d0e56a-a7f7-4033-b845-29c3321dbed3	opisTest	t	TestTytul	2
7eb6a139-a9eb-4585-bbe6-5db36e27bb6c	opisTest	t	TestTytul	2
39fd1a1d-ea41-4521-9fba-a727c7ed1cad	opisTest	t	TestTytul	2
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: dbo; Owner: postgres
--

COPY dbo."user" (id, active, email, password, phone_number, username, year, roles_role_id) FROM stdin;
1	t	jkowalski@survey.pl	$2a$10$8fBjIHgGqaKMEyQ90GhyMObs1QT31lUKtDdym0QaVFZQ.AX22oTru	999888777	jkowalski	18	1
2	t	anowak@survey.pl	$2a$10$x3SR68DCAgEpRX.Oss5/3.Cq9wb0rSVcpSr1sojoYT2DNdLZp/5NG	999888777	anowak	17	2
6	t	example@ex.pl	$2a$10$AzyvT/./nSVdcDsh8ESXi.mND/9.czKQPTkWzoD9gLMMCuTznXYFe	\N	mkucaj	0	1
3	t	abodzio@survey.pl	$2a$10$OzpID7edP7Y4Pz8lxZ5xJuStAsIoHVIfBvNZNihxlYFAmQ2tub1H6	999888777	abodzio	20	13
\.


--
-- Data for Name: user_role; Type: TABLE DATA; Schema: dbo; Owner: postgres
--

COPY dbo.user_role (id, role_id) FROM stdin;
3	1
1	1
2	2
\.


--
-- Data for Name: question_options; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.question_options (question_question_id, options_option_id) FROM stdin;
1	1
1	2
\.


--
-- Data for Name: survey_questions; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.survey_questions (survey_survey_id, questions_question_id) FROM stdin;
1	1
\.


--
-- Name: answers_answer_id_seq; Type: SEQUENCE SET; Schema: dbo; Owner: postgres
--

SELECT pg_catalog.setval('dbo.answers_answer_id_seq', 13, true);


--
-- Name: option_option_id_seq; Type: SEQUENCE SET; Schema: dbo; Owner: postgres
--

SELECT pg_catalog.setval('dbo.option_option_id_seq', 107, true);


--
-- Name: question_question_id_seq; Type: SEQUENCE SET; Schema: dbo; Owner: postgres
--

SELECT pg_catalog.setval('dbo.question_question_id_seq', 56, true);


--
-- Name: roles_role_id_seq; Type: SEQUENCE SET; Schema: dbo; Owner: postgres
--

SELECT pg_catalog.setval('dbo.roles_role_id_seq', 14, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: dbo; Owner: postgres
--

SELECT pg_catalog.setval('dbo.user_id_seq', 8, true);


--
-- Name: answers answers_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.answers
    ADD CONSTRAINT answers_pkey PRIMARY KEY (answer_id);


--
-- Name: option option_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.option
    ADD CONSTRAINT option_pkey PRIMARY KEY (option_id);


--
-- Name: question question_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.question
    ADD CONSTRAINT question_pkey PRIMARY KEY (question_id);


--
-- Name: roles roles_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.roles
    ADD CONSTRAINT roles_pkey PRIMARY KEY (role_id);


--
-- Name: survey survey_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.survey
    ADD CONSTRAINT survey_pkey PRIMARY KEY (survey_id);


--
-- Name: roles uk_g50w4r0ru3g9uf6i6fr4kpro8; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.roles
    ADD CONSTRAINT uk_g50w4r0ru3g9uf6i6fr4kpro8 UNIQUE (role);


--
-- Name: user uk_sb8bbouer5wak8vyiiy4pf2bx; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo."user"
    ADD CONSTRAINT uk_sb8bbouer5wak8vyiiy4pf2bx UNIQUE (username);


--
-- Name: user user_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo."user"
    ADD CONSTRAINT user_pkey PRIMARY KEY (id);


--
-- Name: user_role user_role_pkey; Type: CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.user_role
    ADD CONSTRAINT user_role_pkey PRIMARY KEY (id, role_id);


--
-- Name: question_options question_options_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_options
    ADD CONSTRAINT question_options_pkey PRIMARY KEY (question_question_id, options_option_id);


--
-- Name: question_options uk_mwl9b3008uud0s6mejq7thpgt; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.question_options
    ADD CONSTRAINT uk_mwl9b3008uud0s6mejq7thpgt UNIQUE (options_option_id);


--
-- Name: survey_questions uk_sfgev5av62lk3ov6e5qbx2qof; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.survey_questions
    ADD CONSTRAINT uk_sfgev5av62lk3ov6e5qbx2qof UNIQUE (questions_question_id);


--
-- Name: user fk1tyileu08i7c746bh0qn0tecl; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo."user"
    ADD CONSTRAINT fk1tyileu08i7c746bh0qn0tecl FOREIGN KEY (roles_role_id) REFERENCES dbo.roles(role_id);


--
-- Name: answer_option fk3d2wxrac90ww2l54ydvpc16k9; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.answer_option
    ADD CONSTRAINT fk3d2wxrac90ww2l54ydvpc16k9 FOREIGN KEY (option_id) REFERENCES dbo.option(option_id);


--
-- Name: answers fk4l9tdx1qt5esehos4ygj0sa81; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.answers
    ADD CONSTRAINT fk4l9tdx1qt5esehos4ygj0sa81 FOREIGN KEY (user_id) REFERENCES dbo."user"(id);


--
-- Name: survey fk51x6iogwvw5n6pa7sl339ltju; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.survey
    ADD CONSTRAINT fk51x6iogwvw5n6pa7sl339ltju FOREIGN KEY (user_id) REFERENCES dbo."user"(id);


--
-- Name: question fk65ro96jafjvulbqu8ia0pb254; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.question
    ADD CONSTRAINT fk65ro96jafjvulbqu8ia0pb254 FOREIGN KEY (survey_id) REFERENCES dbo.survey(survey_id);


--
-- Name: answer_option fke9s45xmwndlm9hhtuqx67gfda; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.answer_option
    ADD CONSTRAINT fke9s45xmwndlm9hhtuqx67gfda FOREIGN KEY (answer_id) REFERENCES dbo.answers(answer_id);


--
-- Name: option fkgtlhwmagte7l2ssfsgw47x9ka; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.option
    ADD CONSTRAINT fkgtlhwmagte7l2ssfsgw47x9ka FOREIGN KEY (question_id) REFERENCES dbo.question(question_id);


--
-- Name: answers fks4j12sfj254yawphx0k1xrl3f; Type: FK CONSTRAINT; Schema: dbo; Owner: postgres
--

ALTER TABLE ONLY dbo.answers
    ADD CONSTRAINT fks4j12sfj254yawphx0k1xrl3f FOREIGN KEY (question_id) REFERENCES dbo.question(question_id);


--
-- PostgreSQL database dump complete
--
