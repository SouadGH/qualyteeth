DROP SEQUENCE IF EXISTS 
account_id_seq,
dentist_id_seq,
patient_id_seq,
diagnostic_definition_id_seq,
diagnostic_id_seq,
treatment_definition_id_seq,
treatment_id_seq,
surgery_id_seq,
document_id_seq,
service_definition_id_seq,
calendar_event_id_seq,
feedback_id_seq CASCADE;

DROP TABLE IF EXISTS 
user_connection,
qt_user,
service_definition_name,
service_definition,
dentist_patient_lnk,
calendar_event_history,
calendar_event,
feedback,
dentist_service_lnk,
-- patient_surgery_lnk,
dentist_surgery_lnk,
surgery,
diagnostic_definition_name,
diagnostic_definition,
diagnostic,
diagnostic_tooth_lnk,
treatment_definition_act_lnk,
treatment_definition_name,
treatment_definition,
act_name,
act_point,
act,
treatment,
treatment_tooth_lnk,
-- treatment_tooth,
patient,
dentist_timetable,
dentist,
tooth_name,
tooth,
document,
account CASCADE;

CREATE OR REPLACE FUNCTION pseudo_encrypt(value int) returns int AS $$
    DECLARE
l1 int;
l2 int;
r1 int;
r2 int;
i int:=0;
BEGIN
 l1:= (value >> 16) & 65535;
 r1:= value & 65535;
 WHILE i < 3 LOOP
   l2 := r1;
   r2 := l1 # ((((1366 * r1 + 150889) % 714025) / 714025.0) * 32767)::int;
   l1 := l2;
   r1 := r2;
   i := i + 1;
 END LOOP;
 return ((r1 << 16) + l1);
END;
$$ LANGUAGE plpgsql strict immutable;

CREATE SEQUENCE IF NOT EXISTS account_id_seq;
CREATE SEQUENCE IF NOT EXISTS dentist_id_seq;
CREATE SEQUENCE IF NOT EXISTS patient_id_seq;
CREATE SEQUENCE IF NOT EXISTS diagnostic_definition_id_seq;
CREATE SEQUENCE IF NOT EXISTS diagnostic_id_seq;
CREATE SEQUENCE IF NOT EXISTS treatment_definition_id_seq;
CREATE SEQUENCE IF NOT EXISTS treatment_id_seq;
CREATE SEQUENCE IF NOT EXISTS surgery_id_seq;
CREATE SEQUENCE IF NOT EXISTS document_id_seq;
CREATE SEQUENCE IF NOT EXISTS service_definition_id_seq;
CREATE SEQUENCE IF NOT EXISTS calendar_event_id_seq;
CREATE SEQUENCE IF NOT EXISTS feedback_id_seq;

CREATE TABLE IF NOT EXISTS account (
    id INTEGER PRIMARY KEY,
    username varchar(100) NOT NULL,
    password varchar(60) NOT NULL,
    created_on TIMESTAMPTZ NOT NULL
);

CREATE TABLE IF NOT EXISTS qt_user (
    account_id integer,
    firstname varchar(100) NOT NULL,
    lastname varchar(100) NOT NULL,
    email varchar(100),
    street varchar(100),
    street_nb varchar(10),
    postal_code integer,
    city varchar(100),
    country varchar(100),
    phone_number varchar(100),
    image text,
    created_on TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account (id)
);

CREATE TABLE IF NOT EXISTS dentist (
    id INTEGER PRIMARY KEY,
    color VARCHAR(20)
) INHERITS (qt_user);

CREATE TABLE IF NOT EXISTS patient (
    id INTEGER PRIMARY KEY
) INHERITS (qt_user);

CREATE TABLE IF NOT EXISTS dentist_patient_lnk (
    dentist_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    created_on TIMESTAMPTZ NOT NULL,
    deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (dentist_id) REFERENCES dentist (id),
    FOREIGN KEY (patient_id) REFERENCES patient (id)
);

CREATE TABLE IF NOT EXISTS dentist_timetable (
    dentist_id integer NOT NULL,
    day INTEGER NOT NULL,
    from_hour INTEGER NOT NULL,
    to_hour INTEGER NOT NULL,
    from_minute INTEGER NOT NULL,
    to_minute INTEGER NOT NULL,
    FOREIGN KEY (dentist_id) REFERENCES dentist (id)
);

CREATE TABLE IF NOT EXISTS user_connection (
    account_id INTEGER NOT NULL,
    connection_time TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account (id)
);

CREATE TABLE IF NOT EXISTS tooth (
    fdi_number INTEGER PRIMARY KEY,
    svg TEXT
);

CREATE TABLE IF NOT EXISTS tooth_name (
    fdi_number INTEGER NOT NULL,
    language VARCHAR(10) NOT NULL, -- https://www.w3schools.com/tags/ref_language_codes.asp
    name VARCHAR(255),
    description TEXT,
    FOREIGN KEY (fdi_number) REFERENCES tooth (fdi_number)
);

CREATE TABLE IF NOT EXISTS surgery (
    id INTEGER PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    address_line_1 VARCHAR(100),
    address_line_2 VARCHAR(100),
    address_line_3 VARCHAR(100),
    address_line_4 VARCHAR(100),
    city VARCHAR(100),
    region VARCHAR(100),
    postal_code INTEGER,
    country VARCHAR(100),
    image text,
    deleted BOOLEAN,
    created_by INTEGER NOT NULL,
    created_on TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (created_by) REFERENCES dentist (id)
);

CREATE TABLE IF NOT EXISTS dentist_surgery_lnk (
    dentist_id integer NOT NULL,
    surgery_id integer NOT NULL,
    created_on TIMESTAMPTZ NOT NULL,
    active BOOLEAN NOT NULL DEFAULT FALSE,
    deleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (dentist_id) REFERENCES dentist (id),
    FOREIGN KEY (surgery_id) REFERENCES surgery (id)
);

-- CREATE TABLE IF NOT EXISTS patient_surgery_lnk (
--     patient_id integer NOT NULL,
--     surgery_id integer NOT NULL,
--     start_date date NOT NULL,
--     end_date date,
--     created_on TIMESTAMPTZ NOT NULL,
--     FOREIGN KEY (patient_id) REFERENCES patient (id),
--     FOREIGN KEY (surgery_id) REFERENCES surgery (id)
-- );

CREATE TABLE IF NOT EXISTS service_definition (
    id INTEGER PRIMARY KEY,
    deleted BOOLEAN DEFAULT FALSE NOT NULL,
    created_by INTEGER NOT NULL,
    created_on TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (created_by) REFERENCES dentist (id)
);

CREATE TABLE IF NOT EXISTS service_definition_name (
    definition_id INTEGER NOT NULL,
    language VARCHAR(10) NOT NULL, -- https://www.w3schools.com/tags/ref_language_codes.asp
    category VARCHAR(255),
    name VARCHAR(255),
    FOREIGN KEY (definition_id) REFERENCES service_definition (id)
);

CREATE TABLE IF NOT EXISTS dentist_service_lnk (
    dentist_id INTEGER NOT NULL,
    definition_id INTEGER NOT NULL,
    timing INTEGER NOT NULL,
    FOREIGN KEY (dentist_id) REFERENCES dentist (id),
    FOREIGN KEY (definition_id) REFERENCES service_definition (id)
);

CREATE TABLE IF NOT EXISTS calendar_event (
    id INTEGER PRIMARY KEY,
    service_definition_id INTEGER,
    dentist_id INTEGER,
    patient_id INTEGER,
    status VARCHAR(20) NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    all_day BOOLEAN,
    location TEXT,
    url TEXT,
    notes TEXT,
    reminders TEXT,
    rrule TEXT,
    created_on TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (service_definition_id) REFERENCES service_definition (id),
    FOREIGN KEY (patient_id) REFERENCES patient (id),
    FOREIGN KEY (dentist_id) REFERENCES dentist (id)
);

CREATE TABLE IF NOT EXISTS calendar_event_history (
    calendar_event_id INTEGER NOT NULL,
    service_definition_id INTEGER,
    dentist_id INTEGER,
    patient_id INTEGER,
    status VARCHAR(20) NOT NULL,
    start_date TIMESTAMPTZ NOT NULL,
    end_date TIMESTAMPTZ,
    all_day BOOLEAN,
    location TEXT,
    url TEXT,
    notes TEXT,
    reminders TEXT,
    rrule TEXT,
    created_on TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (calendar_event_id) REFERENCES calendar_event (id),
    FOREIGN KEY (service_definition_id) REFERENCES service_definition (id),
    FOREIGN KEY (patient_id) REFERENCES patient (id),
    FOREIGN KEY (dentist_id) REFERENCES dentist (id)
);

CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY,
    account_id INTEGER NOT NULL,
    stars INTEGER,
    comment TEXT,
    created_on TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (account_id) REFERENCES account (id)
);

CREATE TABLE IF NOT EXISTS diagnostic_definition (
    id INTEGER PRIMARY KEY,
    deleted BOOLEAN DEFAULT FALSE,
    created_by INTEGER NOT NULL,
    created_on TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (created_by) REFERENCES dentist (id)
);

CREATE TABLE IF NOT EXISTS diagnostic_definition_name (
    definition_id INTEGER NOT NULL,
    language VARCHAR(10) NOT NULL, -- https://www.w3schools.com/tags/ref_language_codes.asp
    name VARCHAR(255),
    FOREIGN KEY (definition_id) REFERENCES diagnostic_definition (id)
);

CREATE TABLE IF NOT EXISTS diagnostic (
    id INTEGER PRIMARY KEY,
    definition_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    dentist_id INTEGER NOT NULL,
    comment TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    created_on TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient (id),
    FOREIGN KEY (dentist_id) REFERENCES dentist (id),
    FOREIGN KEY (definition_id) REFERENCES diagnostic_definition (id)
);

CREATE TABLE IF NOT EXISTS diagnostic_tooth_lnk (
    diagnostic_id INTEGER NOT NULL,
    tooth_fdi_number INTEGER NOT NULL,
    tooth_parts VARCHAR(20) [],
    FOREIGN KEY (diagnostic_id) REFERENCES diagnostic (id),
    FOREIGN KEY (tooth_fdi_number) REFERENCES tooth (fdi_number)
);

CREATE TABLE IF NOT EXISTS act (
    id VARCHAR(10) PRIMARY KEY,
    start_date DATE NOT NULL,
    end_date DATE,
    vat FLOAT
);

CREATE TABLE IF NOT EXISTS act_name (
    act_id VARCHAR(10) NOT NULL,
    language VARCHAR(10) NOT NULL, -- https://www.w3schools.com/tags/ref_language_codes.asp
    name VARCHAR(255),
    FOREIGN KEY (act_id) REFERENCES act (id)
);

CREATE TABLE IF NOT EXISTS act_point (
    act_id VARCHAR(10) NOT NULL,
    point_type VARCHAR(10) NOT NULL,
    point FLOAT,
    FOREIGN KEY (act_id) REFERENCES act (id)
);

CREATE TABLE IF NOT EXISTS treatment_definition (
    id INTEGER PRIMARY KEY,
    deleted BOOLEAN DEFAULT FALSE,
    created_by INTEGER NOT NULL,
    created_on TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (created_by) REFERENCES dentist (id)
);

CREATE TABLE IF NOT EXISTS treatment_definition_name (
    definition_id INTEGER NOT NULL,
    language VARCHAR(10) NOT NULL, -- https://www.w3schools.com/tags/ref_language_codes.asp
    name VARCHAR(255),
    FOREIGN KEY (definition_id) REFERENCES treatment_definition (id)
);

CREATE TABLE IF NOT EXISTS treatment_definition_act_lnk (
    definition_id INTEGER NOT NULL,
    act_id VARCHAR(10) NOT NULL,
    position INTEGER NOT NULL,
    FOREIGN KEY (definition_id) REFERENCES treatment_definition (id),
    FOREIGN KEY (act_id) REFERENCES act (id)
);

CREATE TABLE IF NOT EXISTS treatment (
    id INTEGER PRIMARY KEY,
    definition_id INTEGER NOT NULL,
    dentist_id INTEGER NOT NULL,
    patient_id INTEGER NOT NULL,
    comment TEXT,
    start_date DATE NOT NULL,
    end_date DATE,
    created_on TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (definition_id) REFERENCES treatment_definition (id),
    FOREIGN KEY (dentist_id) REFERENCES dentist (id),
    FOREIGN KEY (patient_id) REFERENCES patient (id)
);

CREATE TABLE IF NOT EXISTS treatment_tooth_lnk (
    treatment_id INTEGER NOT NULL,
    tooth_fdi_number INTEGER NOT NULL,
    tooth_parts VARCHAR(20) [],
    FOREIGN KEY (treatment_id) REFERENCES treatment (id),
    FOREIGN KEY (tooth_fdi_number) REFERENCES tooth (fdi_number)
);

CREATE TABLE IF NOT EXISTS document (
    id INTEGER PRIMARY KEY,
    patient_id INTEGER NOT NULL,
    dentist_id INTEGER,
    treatment_id INTEGER,
    filename VARCHAR(100),
    file_data BYTEA NOT NULL,
    created_on TIMESTAMPTZ NOT NULL,
    FOREIGN KEY (patient_id) REFERENCES patient (id),
    FOREIGN KEY (dentist_id) REFERENCES dentist (id),
    FOREIGN KEY (treatment_id) REFERENCES treatment (id)
);


ALTER TABLE account alter column id SET default pseudo_encrypt(nextval('account_id_seq')::int);
ALTER TABLE dentist alter column id SET default pseudo_encrypt(nextval('dentist_id_seq')::int);
ALTER TABLE patient alter column id SET default pseudo_encrypt(nextval('patient_id_seq')::int);
ALTER TABLE diagnostic_definition alter column id SET default pseudo_encrypt(nextval('diagnostic_definition_id_seq')::int);
ALTER TABLE diagnostic alter column id SET default pseudo_encrypt(nextval('diagnostic_id_seq')::int);
ALTER TABLE treatment_definition alter column id SET default pseudo_encrypt(nextval('treatment_definition_id_seq')::int);
ALTER TABLE treatment alter column id SET default pseudo_encrypt(nextval('treatment_id_seq')::int);
ALTER TABLE surgery alter column id SET default pseudo_encrypt(nextval('surgery_id_seq')::int);
ALTER TABLE document alter column id SET default pseudo_encrypt(nextval('document_id_seq')::int);
ALTER TABLE service_definition alter column id SET default pseudo_encrypt(nextval('service_definition_id_seq')::int);
ALTER TABLE calendar_event alter column id SET default pseudo_encrypt(nextval('calendar_event_id_seq')::int);
ALTER TABLE feedback alter column id SET default pseudo_encrypt(nextval('feedback_id_seq')::int);