DROP DATABASE IF EXISTS employee_db;

CREATE DATABASE employee_db;


USE employee_db;


CREATE TABLE Department (

id int auto_increment not null,

Name VARCHAR(30) NOT NULL,
  
  primary key (id)
);

CREATE TABLE Roles (

id int auto_increment not null,

title VARCHAR(30) NOT NULL,

salary decimal(20,2) not null,

department_id int not null,
  
  primary key (id)
);


CREATE TABLE Employee (

id int auto_increment not null,

first_name VARCHAR(30) NOT NULL,

last_name varchar(30) not null,

role_id int not null,

manager_id int,
  
  primary key (id)
);

