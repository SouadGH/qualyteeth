insert into account (id, username, password, created_on) values (561465857, 'd1@q', '11111111', '2021-07-23 14:05:00');
insert into account (id, username, password, created_on) values (436885871, 'p1@q', '11111111', '2021-07-23 14:05:00');

insert into dentist (account_id, firstname, lastname, email, street, street_nb, postal_code, city, created_on, id) values (561465857, 'Jean', 'Molaire', 'd1@q', 'Rue de Lausanne', '1', 1220, 'Genève', '2021-07-23 14:05:00', 561465857);
insert into patient (account_id, firstname, lastname, email, created_on, id) values (436885871, 'Carine', 'Cariée', 'p1@q', '2021-07-23 14:05:00', 561465857);

insert into surgery (id, name, address_line_1, city, postal_code, created_on) values (561465857, 'Cabinet de Jean Molaire', 'Rue de Lausanne 1', 'Genève', 1220, '2021-07-23 14:05:00');
insert into dentist_surgery_lnk (dentist_id, surgery_id, start_date, created_on, active) values (561465857, 561465857, '2021-08-18', '2021-07-23 14:05:00', true);
insert into patient_surgery_lnk (patient_id, surgery_id, start_date, created_on) values (561465857, 561465857, '2021-08-18', '2021-07-23 14:05:00');