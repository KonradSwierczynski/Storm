USE storm_database;

CREATE TABLE HelloWorld (
    hello VARCHAR(225) NOT NULL
);

CREATE TABLE FromDatabase (
    world VARCHAR(225) NOT NULL
);

INSERT INTO HelloWorld VALUES
("H3ll0!");

CREATE TABLE Coach
(
	id int NOT NULL AUTO_INCREMENT,
	dateOfBirth DATE,
	nationality nvarchar(225),
	name nvarcar(225) NOT NULL,
	surname nvarchar(225) NOT NULL,
	PRIMARY KEY (id)
);

CREATE TABLE Footballer
(
	id int NOT NULL AUTO_INCREMENT,
	dateOfBirth DATE,
	nationality nvarchar(225),
	name nvarcar(225) NOT NULL,
	surname nvarchar(225) NOT NULL,
	playingPosition nvarchar(225) NOT NULL
	PRIMARY KEY (id)
);

CREATE TABLE Referee
(
	id int NOT NULL AUTO_INCREMENT,
	dateOfBirth DATE,
	nationality nvarchar(225),
	name nvarcar(225) NOT NULL,
	surname nvarchar(225) NOT NULL,
	category nvarchar(225) NOT NULL
	PRIMARY KEY (id)
);

CREATE TABLE CoachInClub
(
	coachId int NOT NULL,
	clubId int NOT NULL,
	contractTo DATE,
	salary int NOT NULL,
	FOREIGN KEY (coachId) REFERENCES Coach(id),
	FOREIGN KEY (clubId) REFERENCES Club(id)
);

CREATE TABLE CoachInClub
(
	foorballerId int NOT NULL,
	clubId int NOT NULL,
	contractTo DATE,
	salary int NOT NULL,
	FOREIGN KEY (foorballerId) REFERENCES Footballer(id),
	FOREIGN KEY (clubId) REFERENCES Club(id)
);

CREATE TABLE League
(
	id int NOT NULL AUTO_INCREMENT,
	country nvarchar(225),
	name nvarchar(225),
	PRIMARY KEY (id)
);

CREATE TABLE Club
(
	id int NOT NULL AUTO_INCREMENT,
	leagueId int NOT NULL AUTO_INCREMENT,
	fundationYear int,
	name nvarchar(225) NOT NULL,
	city nvarcar(225) NOT NULL,
	budget int NOT NULL,
	PRIMARY KEY (id),
	FOREGIN KEY (leagueId)
);

