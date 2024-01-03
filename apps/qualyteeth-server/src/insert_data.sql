insert into account (username, password, created_on) values ('dentiste@qualyteeth.ch', '11111111', '2021-01-01 00:00:00');
insert into account (username, password, created_on) values ('d2@q', '11111111', '2021-01-01 00:00:00');
insert into account (username, password, created_on) values ('patient@qualyteeth.ch', '11111111', '2021-01-01 00:00:00');

insert into dentist (account_id, firstname, lastname, email, phone_number, street, street_nb, postal_code, city, created_on) values (561465857, 'Jean', 'Molaire', 'dentiste@qualyteeth.ch', '+41778889900', 'Rue de Lausanne', '1', 1220, 'Genève', '2021-01-01 00:00:00');
insert into dentist (account_id, firstname, lastname, email, street, street_nb, postal_code, city, created_on) values (436885871, 'Corine', 'Canine', 'd2@q', 'Rue de Berne', '1', 1220, 'Genève', '2021-01-01 00:00:00');
insert into patient (account_id, firstname, lastname, email, created_on) values (576481439, 'Carine', 'Cariée', 'patient@qualyteeth.ch', '2021-01-01 00:00:00');

insert into dentist_patient_lnk (dentist_id, patient_id, created_on) values (561465857, 561465857, '2021-01-01 00:00:00');

insert into surgery (name, address_line_1, city, postal_code, created_by, created_on) values ('Cabinet de Jean Molaire', 'Rue de Lausanne 1', 'Genève', 1220, 561465857, '2021-01-01 00:00:00');
insert into dentist_surgery_lnk (dentist_id, surgery_id, created_on) values (561465857, 561465857, '2021-01-01 00:00:00');
--insert into patient_surgery_lnk (patient_id, surgery_id, start_date, created_on) values (561465857, 561465857, '2021-08-18', '2021-01-01 00:00:00');

INSERT INTO act (id, start_date) VALUES ('4.0000', '2018-01-01');
INSERT INTO act_name (act_id, language, name) VALUES ('4.0000', 'fr', 'Examen; premier avis');
INSERT INTO act_point (act_id, point_type, point) VALUES ('4.0000', 'aa', 73.20);
INSERT INTO act_point (act_id, point_type, point) VALUES ('4.0000', 'am', 73.20);
INSERT INTO act_point (act_id, point_type, point) VALUES ('4.0000', 'ai', 73.20);
INSERT INTO act_point (act_id, point_type, point) VALUES ('4.0000', 'pp_min', 62.20);
INSERT INTO act_point (act_id, point_type, point) VALUES ('4.0000', 'pp_max', 84.20);

INSERT INTO act (id, start_date) VALUES ('5.0000', '2018-01-01');
INSERT INTO act_name (act_id, language, name) VALUES ('5.0000', 'fr', 'Examen; deuxième avis');
INSERT INTO act_point (act_id, point_type, point) VALUES ('5.0000', 'aa', 74.20);
INSERT INTO act_point (act_id, point_type, point) VALUES ('5.0000', 'am', 74.20);
INSERT INTO act_point (act_id, point_type, point) VALUES ('5.0000', 'ai', 74.20);
INSERT INTO act_point (act_id, point_type, point) VALUES ('5.0000', 'pp_min', 65.20);
INSERT INTO act_point (act_id, point_type, point) VALUES ('5.0000', 'pp_max', 88.20);

INSERT INTO act (id, start_date) VALUES ('6.0000', '2018-01-01');
INSERT INTO act_name (act_id, language, name) VALUES ('6.0000', 'fr', 'Discussion intense avec le patient, juste pour passer le temps');
INSERT INTO act_point (act_id, point_type, point) VALUES ('6.0000', 'aa', 99.99);
INSERT INTO act_point (act_id, point_type, point) VALUES ('6.0000', 'am', 99.99);
INSERT INTO act_point (act_id, point_type, point) VALUES ('6.0000', 'ai', 99.99);
INSERT INTO act_point (act_id, point_type, point) VALUES ('6.0000', 'pp_min', 99.99);
INSERT INTO act_point (act_id, point_type, point) VALUES ('6.0000', 'pp_max', 99.99);

INSERT INTO tooth (fdi_number) VALUES (11);
INSERT INTO tooth (fdi_number) VALUES (12);
INSERT INTO tooth (fdi_number) VALUES (13);
INSERT INTO tooth (fdi_number) VALUES (14);
INSERT INTO tooth (fdi_number) VALUES (15);
INSERT INTO tooth (fdi_number) VALUES (16);
INSERT INTO tooth (fdi_number) VALUES (17);
INSERT INTO tooth (fdi_number) VALUES (18);

INSERT INTO tooth (fdi_number) VALUES (21);
INSERT INTO tooth (fdi_number) VALUES (22);
INSERT INTO tooth (fdi_number) VALUES (23);
INSERT INTO tooth (fdi_number) VALUES (24);
INSERT INTO tooth (fdi_number) VALUES (25);
INSERT INTO tooth (fdi_number) VALUES (26);
INSERT INTO tooth (fdi_number) VALUES (27);
INSERT INTO tooth (fdi_number) VALUES (28);

INSERT INTO tooth (fdi_number) VALUES (31);
INSERT INTO tooth (fdi_number) VALUES (32);
INSERT INTO tooth (fdi_number) VALUES (33);
INSERT INTO tooth (fdi_number) VALUES (34);
INSERT INTO tooth (fdi_number) VALUES (35);
INSERT INTO tooth (fdi_number) VALUES (36);
INSERT INTO tooth (fdi_number) VALUES (37);
INSERT INTO tooth (fdi_number) VALUES (38);

INSERT INTO tooth (fdi_number) VALUES (41);
INSERT INTO tooth (fdi_number) VALUES (42);
INSERT INTO tooth (fdi_number) VALUES (43);
INSERT INTO tooth (fdi_number) VALUES (44);
INSERT INTO tooth (fdi_number) VALUES (45);
INSERT INTO tooth (fdi_number) VALUES (46);
INSERT INTO tooth (fdi_number) VALUES (47);
INSERT INTO tooth (fdi_number) VALUES (48);

INSERT INTO diagnostic_definition (created_by, created_on) VALUES (561465857, '2021-01-01 00:00:00');
INSERT INTO diagnostic_definition (created_by, created_on) VALUES (561465857, '2021-01-01 00:00:00');
INSERT INTO diagnostic_definition (created_by, created_on) VALUES (561465857, '2021-01-01 00:00:00');
INSERT INTO diagnostic_definition_name VALUES (561465857, 'fr', 'Carie');
INSERT INTO diagnostic_definition_name VALUES (436885871, 'fr', 'Carie initiale');
INSERT INTO diagnostic_definition_name VALUES (576481439, 'fr', 'Implant');

INSERT INTO treatment_definition (created_by, created_on) VALUES (561465857, '2021-01-01 00:00:00');
INSERT INTO treatment_definition_name VALUES (561465857, 'fr', 'Traitement de base 1');
INSERT INTO treatment_definition_act_lnk VALUES (561465857, '4.0000', 1);
INSERT INTO treatment_definition_act_lnk VALUES (561465857, '5.0000', 2);

INSERT INTO service_definition (deleted, created_by, created_on) VALUES (false, 561465857, '2021-01-01 00:00:00');
INSERT INTO service_definition_name (definition_id, language, category, name) VALUES (561465857, 'fr', 'Hygiène', 'Laver les molaires');
INSERT INTO dentist_service_lnk (dentist_id, definition_id, timing) VALUES (561465857, 561465857, 30);