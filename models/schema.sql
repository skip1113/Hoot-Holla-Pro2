DROP DATABASE IF EXISTS hoot_holla;
DROP table IF EXISTS users;
CREATE DATABASE hoot_holla;
USE hoot_holla;
CREATE TABLE users (
  id int(11) NOT NULL PRIMARY KEY AUTO_INCREMENT,
   name varchar(255) ,
   email varchar(255) NOT NULL,
  password varchar(255) NOT NULL,
  created timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
SELECT * FROM users;
SELECT * FROM users WHERE email = '" + email + "';
SELECT * from users where id =  + id;
INSERT INTO users ( email, password ) values ('" + email + "','" + password +"');

create table Hoots (
	id int auto_increment not null,
	hoot text not null,
    image BLOB,
    createdAt TIMESTAMP NOT NULL default current_timestamp,
    primary key (id)
);
SELECT * FROM Hoots;