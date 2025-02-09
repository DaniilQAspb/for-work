--
-- PostgreSQL database dump
--

-- Dumped from database version 17.2
-- Dumped by pg_dump version 17.2

-- Started on 2025-02-09 15:33:36

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- TOC entry 218 (class 1259 OID 16393)
-- Name: cars; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.cars (
    car_id integer NOT NULL,
    brand character varying(50) NOT NULL,
    model character varying(50) NOT NULL,
    year integer,
    price numeric(12,2) NOT NULL,
    mileage integer,
    fueltype character varying(20),
    transmission character varying(20),
    description text,
    sold_by_employee_id integer,
    CONSTRAINT cars_year_check CHECK ((year >= 1886))
);


ALTER TABLE public.cars OWNER TO postgres;

--
-- TOC entry 217 (class 1259 OID 16392)
-- Name: cars_carid_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.cars_carid_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.cars_carid_seq OWNER TO postgres;

--
-- TOC entry 4911 (class 0 OID 0)
-- Dependencies: 217
-- Name: cars_carid_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.cars_carid_seq OWNED BY public.cars.car_id;


--
-- TOC entry 220 (class 1259 OID 16581)
-- Name: users; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    username character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(255) NOT NULL,
    role_name character varying(50) DEFAULT 'seller'::character varying
);


ALTER TABLE public.users OWNER TO postgres;

--
-- TOC entry 219 (class 1259 OID 16580)
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.users_user_id_seq OWNER TO postgres;

--
-- TOC entry 4912 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- TOC entry 4747 (class 2604 OID 16396)
-- Name: cars car_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars ALTER COLUMN car_id SET DEFAULT nextval('public.cars_carid_seq'::regclass);


--
-- TOC entry 4748 (class 2604 OID 16584)
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- TOC entry 4903 (class 0 OID 16393)
-- Dependencies: 218
-- Data for Name: cars; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.cars (car_id, brand, model, year, price, mileage, fueltype, transmission, description, sold_by_employee_id) FROM stdin;
1	Toyota	Corolla	2020	20000.00	15000	Gasoline	Automatic	Compact car with great fuel efficiency	\N
2	Honda	Civic	2019	18500.00	20000	Gasoline	Automatic	Reliable sedan with a comfortable interior	\N
3	Ford	Focus	2018	17000.00	25000	Gasoline	Manual	Compact car with sporty handling	\N
5	BMW	3 Series	2020	35000.00	15000	Gasoline	Automatic	Luxury sedan with excellent performance	\N
7	Audi	A4	2018	33000.00	30000	Gasoline	Automatic	Luxury compact car with a refined interior	\N
8	Volkswagen	Passat	2020	25000.00	15000	Gasoline	Automatic	Spacious sedan with modern features	\N
9	Hyundai	Elantra	2019	19000.00	20000	Gasoline	Automatic	Affordable compact car with a smooth ride	\N
10	Kia	Optima	2020	21000.00	18000	Gasoline	Automatic	Mid-size sedan with a stylish design	\N
11	Nissan	Altima	2018	20000.00	22000	Gasoline	Automatic	Reliable sedan with good fuel economy	\N
12	Subaru	Impreza	2021	23000.00	12000	Gasoline	Manual	Compact car with all-wheel drive capability	\N
13	Mazda	Mazda3	2020	21000.00	15000	Gasoline	Automatic	Sporty compact car with excellent handling	\N
14	Lexus	IS	2019	38000.00	25000	Gasoline	Automatic	Luxury sedan with a comfortable interior	\N
15	Infiniti	Q50	2020	40000.00	18000	Gasoline	Automatic	Premium sedan with high-tech features	\N
16	Acura	TLX	2018	32000.00	30000	Gasoline	Automatic	Luxury sedan with excellent value	\N
17	Volvo	S60	2021	36000.00	15000	Gasoline	Automatic	Safety-focused premium sedan	\N
18	Jeep	Cherokee	2020	28000.00	20000	Gasoline	Automatic	Compact SUV with off-road capabilities	\N
19	Ford	Escape	2019	26000.00	22000	Gasoline	Automatic	Versatile compact SUV	\N
20	Toyota	RAV4	2021	30000.00	10000	Gasoline	Automatic	Popular compact SUV with great features	\N
21	Honda	CR-V	2020	31000.00	12000	Gasoline	Automatic	Reliable SUV with spacious interior	\N
22	Chevrolet	Tahoe	2019	50000.00	30000	Gasoline	Automatic	Full-size SUV with powerful performance	\N
23	GMC	Yukon	2020	55000.00	25000	Gasoline	Automatic	Premium full-size SUV	\N
24	BMW	X5	2019	60000.00	20000	Gasoline	Automatic	Luxury SUV with excellent handling	\N
25	Mercedes-Benz	GLE	2020	65000.00	15000	Gasoline	Automatic	Premium SUV with advanced technology	\N
26	Audi	Q7	2021	70000.00	10000	Gasoline	Automatic	Luxury full-size SUV	\N
27	Volkswagen	Tiguan	2018	25000.00	30000	Gasoline	Automatic	Compact SUV with good fuel efficiency	\N
28	Hyundai	Tucson	2019	27000.00	20000	Gasoline	Automatic	Affordable SUV with modern features	\N
29	Kia	Sportage	2020	29000.00	15000	Gasoline	Automatic	Compact SUV with a stylish design	\N
30	Nissan	Rogue	2021	31000.00	10000	Gasoline	Automatic	Popular compact SUV with advanced features	\N
31	Subaru	Forester	2019	30000.00	20000	Gasoline	Automatic	SUV with all-wheel drive and reliability	\N
32	Mazda	CX-5	2020	32000.00	12000	Gasoline	Automatic	Sporty SUV with excellent handling	\N
33	Lexus	RX	2021	55000.00	10000	Gasoline	Automatic	Luxury mid-size SUV	\N
34	Infiniti	QX50	2019	45000.00	25000	Gasoline	Automatic	Premium SUV with modern features	\N
35	Acura	RDX	2020	48000.00	15000	Gasoline	Automatic	Luxury SUV with excellent value	\N
36	Volvo	XC60	2021	58000.00	10000	Gasoline	Automatic	Safety-focused luxury SUV	\N
37	Jeep	Wrangler	2018	40000.00	30000	Gasoline	Manual	Iconic off-road SUV	\N
38	Toyota	Highlander	2019	42000.00	25000	Gasoline	Automatic	Spacious mid-size SUV	\N
39	Honda	Pilot	2020	45000.00	20000	Gasoline	Automatic	Reliable SUV for families	\N
40	Chevrolet	Traverse	2021	47000.00	15000	Gasoline	Automatic	Mid-size SUV with advanced features	\N
41	GMC	Acadia	2019	49000.00	18000	Gasoline	Automatic	Premium mid-size SUV	\N
42	BMW	X3	2020	53000.00	15000	Gasoline	Automatic	Luxury compact SUV with great performance	\N
43	Mercedes-Benz	GLC	2018	55000.00	30000	Gasoline	Automatic	Premium compact SUV	\N
44	Audi	Q5	2019	57000.00	20000	Gasoline	Automatic	Luxury compact SUV with refined interior	\N
45	Volkswagen	Arteon	2021	58000.00	12000	Gasoline	Automatic	Premium sedan with sleek design	\N
46	Tesla	Model S	2022	90000.00	5000	Electric	Automatic	High-performance electric sedan	\N
47	Porsche	Cayenne	2021	85000.00	15000	Gasoline	Automatic	Luxury SUV with sporty features	\N
48	Jaguar	F-Pace	2020	75000.00	18000	Gasoline	Automatic	Stylish luxury SUV	\N
49	Bentley	Continental GT	2021	250000.00	5000	Gasoline	Automatic	Premium luxury coupe with unparalleled craftsmanship	\N
50	Rolls-Royce	Ghost	2020	300000.00	1000	Gasoline	Automatic	Top-tier luxury sedan with supreme comfort	\N
51	Lamborghini	Urus	2021	220000.00	8000	Gasoline	Automatic	Luxury super SUV with unmatched performance	\N
52	Ferrari	Portofino	2020	215000.00	7000	Gasoline	Automatic	Elegant convertible sports car	\N
53	Aston Martin	DBX	2021	190000.00	10000	Gasoline	Automatic	Luxury SUV with iconic British style	\N
54	Maserati	Levante	2020	78000.00	12000	Gasoline	Automatic	Premium Italian SUV with dynamic performance	\N
55	McLaren	GT	2021	210000.00	4000	Gasoline	Automatic	Luxury sports car with grand touring features	\N
56	Cadillac	Escalade	2021	102000.00	9000	Gasoline	Automatic	Premium full-size SUV with advanced technology	\N
57	Genesis	G90	2020	72000.00	15000	Gasoline	Automatic	Luxury sedan with refined features	\N
58	Lincoln	Navigator	2021	98000.00	12000	Gasoline	Automatic	Premium full-size SUV for families	\N
59	Range Rover	Sport	2020	110000.00	8000	Gasoline	Automatic	Iconic luxury SUV with advanced features	\N
61	Тестовая2	Тестовая2	2003	12345.00	1234	Тестовая2	Тестовая2	Тестовая2	\N
\.


--
-- TOC entry 4905 (class 0 OID 16581)
-- Dependencies: 220
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.users (user_id, username, email, password, role_name) FROM stdin;
5	1	1@mail.ru	$2a$10$.V5y74xPdLMbnsTzyzbBSesCHntpmavTrnT./qPRTzULbaAuUf/ma	seller
6	Artyom	12345@mail.ru	$2a$10$ZE3Z29k103nRMFEoL.8uIuSwgQ/cFVrlL92LA0LVEhpYcfQUJqsrq	seller
\.


--
-- TOC entry 4913 (class 0 OID 0)
-- Dependencies: 217
-- Name: cars_carid_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.cars_carid_seq', 65, true);


--
-- TOC entry 4914 (class 0 OID 0)
-- Dependencies: 219
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.users_user_id_seq', 6, true);


--
-- TOC entry 4752 (class 2606 OID 16401)
-- Name: cars cars_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.cars
    ADD CONSTRAINT cars_pkey PRIMARY KEY (car_id);


--
-- TOC entry 4754 (class 2606 OID 16588)
-- Name: users users_email_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_email_key UNIQUE (email);


--
-- TOC entry 4756 (class 2606 OID 16586)
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


-- Completed on 2025-02-09 15:33:36

--
-- PostgreSQL database dump complete
--

