USE storm_database;

DROP TABLE IF EXISTS HelloWorld;
CREATE TABLE HelloWorld (
    hello VARCHAR(225) NOT NULL
);

DROP TABLE IF EXISTS FromDatabase;
CREATE TABLE FromDatabase (
    world VARCHAR(225) NOT NULL
);

INSERT INTO HelloWorld VALUES
("H3ll0!");

DROP TABLE IF EXISTS Coach;
CREATE TABLE Coach
(
	id int NOT NULL AUTO_INCREMENT,
	dateOfBirth DATE,
	nationality nvarchar(225),
	name nvarchar(225) NOT NULL,
	surname nvarchar(225) NOT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Footballer;
CREATE TABLE Footballer
(
	id int NOT NULL AUTO_INCREMENT,
	dateOfBirth DATE,
	nationality nvarchar(225),
	name nvarchar(225) NOT NULL,
	surname nvarchar(225) NOT NULL,
	playingPosition nvarchar(225) NOT NULL,
	PRIMARY KEY (id) 
);

DROP TABLE IF EXISTS Sezon;
CREATE TABLE Sezon
(
	id int NOT NULL AUTO_INCREMENT,
	year YEAR NOT NULL,
	round nvarchar(225) NOT NULL,
  	PRIMARY KEY (id),
	CHECK (round IN('spring', 'winter'))
);

DROP TABLE IF EXISTS Referee;
CREATE TABLE Referee
(
	id int NOT NULL AUTO_INCREMENT,
	dateOfBirth DATE,
	nationality nvarchar(225),
	name nvarchar(225) NOT NULL,
	surname nvarchar(225) NOT NULL,
	category nvarchar(225) NOT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS League;
CREATE TABLE League
(
	id int NOT NULL AUTO_INCREMENT,
	country nvarchar(225),
	name nvarchar(225),
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS Club;
CREATE TABLE Club
(
	id int NOT NULL AUTO_INCREMENT,
	leagueId int NOT NULL,
	fundationYear int,
	name nvarchar(225) NOT NULL,
	city nvarchar(225) NOT NULL,
	budget int NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (leagueId) REFERENCES League(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Stadium;
CREATE TABLE Stadium
(
	id int NOT NULL AUTO_INCREMENT,
	name nvarchar(225) NOT NULL,
	city nvarchar(225) NOT NULL,
	PRIMARY KEY (id)
);

DROP TABLE IF EXISTS FootballGame;
CREATE TABLE FootballGame
(
	id int NOT NULL AUTO_INCREMENT,
	club1Id int NOT NULL,
	club2Id int NOT NULL,
	sezonId int NOT NULL,
	refereeId int NOT NULL,
	stadiumId int NOT NULL,
	date DATE NOT NULL,
	PRIMARY KEY (id),
	FOREIGN KEY (club1Id) REFERENCES Club(id) ON DELETE CASCADE,
	FOREIGN KEY (club2Id) REFERENCES Club(id) ON DELETE CASCADE,
	FOREIGN KEY (sezonId) REFERENCES Sezon(id) ON DELETE CASCADE,
	FOREIGN KEY (refereeId) REFERENCES Referee(id) ON DELETE CASCADE,
	FOREIGN KEY (stadiumId) REFERENCES Stadium(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS Statistics;
CREATE TABLE Statistics
(
	footballerId int NOT NULL,
	gameId int NOT NULL,
	goals int,
	redCards int,
	yellowCards int,
	passes int,
	assists int,
	ownGoals int,
	FOREIGN KEY (footballerId) REFERENCES Footballer(id) ON DELETE CASCADE,
	FOREIGN KEY (gameId) REFERENCES FootballGame(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS CoachInClub;
CREATE TABLE CoachInClub
(
	coachId int NOT NULL,
	clubId int NOT NULL,
	sezonId int NOT NULL,
	contractTo DATE,
	salary int NOT NULL,
	FOREIGN KEY (coachId) REFERENCES Coach(id) ON DELETE CASCADE,
	FOREIGN KEY (clubId) REFERENCES Club(id) ON DELETE CASCADE,
	FOREIGN KEY (sezonId) REFERENCES Sezon(id) ON DELETE CASCADE
);

DROP TABLE IF EXISTS FootballerInClub;
CREATE TABLE FootballerInClub
(
	footballerId int NOT NULL,
	clubId int NOT NULL,
	sezonId int NOT NULL,
	contractTo DATE,
	salary int NOT NULL,
	FOREIGN KEY (footballerId) REFERENCES Footballer(id) ON DELETE CASCADE,
	FOREIGN KEY (clubId) REFERENCES Club(id) ON DELETE CASCADE,
	FOREIGN KEY (sezonId) REFERENCES Sezon(id) ON DELETE CASCADE
);


	



