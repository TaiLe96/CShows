DROP DATABASE IF EXISTS cshows_db;
CREATE DATABASE cshows_db;
USE cshows_db;

CREATE TABLE users (
  id INT NOT NULL AUTO_INCREMENT,
  user_name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL,
  password VARCHAR(100) NOT NULL,
  location VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE artists
(
	id INT NOT NULL AUTO_INCREMENT,
	email VARCHAR(100) NOT NULL,
	password VARCHAR(100) NOT NULL,
	artist_name varchar(255) NOT NULL,
	genre varchar(225) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE shows
(
	id int NOT NULL AUTO_INCREMENT,
	show_venue varchar(255) NOT NULL,
    artist_name INT,
    user_id INT,
	show_Date DATE NOT NULL,
    FOREIGN KEY (artist_name) REFERENCES artists(id),
    FOREIGN KEY (user_id) REFERENCES users(id),
	PRIMARY KEY (id)
);

CREATE TABLE tickets
(
	id INT NOT NULL AUTO_INCREMENT,
    artist_name INT,
    show_id INT NOT NULL,
	  PRIMARY KEY (id),
    FOREIGN KEY (artist_name) REFERENCES artists(id),
	  FOREIGN KEY (show_id) REFERENCES shows(id)
);



