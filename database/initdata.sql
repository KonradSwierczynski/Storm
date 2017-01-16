USE storm_database;

INSERT INTO Referee (dateOfBirth, nationality, name, surname, category) VALUES
('1975-03-13', 'British', 'Mark', 'Clattenburg', 'international'), ('1971-01-01', 'German', 'Andre', 'Marriner', 'national');

INSERT INTO Coach (dateOfBirth, nationality, name, surname) VALUES
('1975-03-13', 'British', 'Mark', 'Clemens'), ('1971-01-01', 'German', 'Andre', 'Week');

INSERT INTO Footballer (dateOfBirth, nationality, name, surname, playingPosition) VALUES
('1985-03-13', 'Spanish', 'Fernando', 'Alonso', 'attacker'), ('1987-05-01', 'French', 'Karim', 'Benzema', 'attacker'), ('1982-02-06', 'Portugal', 'Cristiano', 'Ronaldo', 'defender'),
('1989-03-13', 'Argentine', 'Lionel', 'Messi', 'attacker'), ('1987-05-01', 'Swedish', 'Zlatan', 'Ibrahimovic', 'attacker'), ('1992-02-06', 'Brazilian', 'Junior', 'Neymar', 'defender'),
('1985-03-13', 'Spanish', 'Andres', 'Iniesta', 'attacker'), ('1987-05-01', 'French', 'Zinedine', 'Zidane', 'attacker'), ('1982-02-06', 'Brasil', 'Pele', 'Pele', 'defender'),
('1989-03-13', 'British', 'Gareth', 'Bale', 'attacker'), ('1987-05-01', 'Italian', 'Gianluigi', 'Buffon', 'defender'), ('1992-02-06', 'German', 'Mesut', 'Ozil', 'defender');

INSERT INTO Sezon (year, round) VALUES
('2017', 'spring');

INSERT INTO League (country, name) VALUES
('Spain', 'Primera Division'), ('Poland', 'Ekstraklasa');

INSERT INTO Club (leagueId, fundationYear, name, city, budget) VALUES
(1, 1945, 'Real Madrid', 'Mardid', 90000000), (1, 1975, 'FC Barcelona', 'Barcelona', 80000000), (2, 1956, 'Podbeskidzie', 'Dunno', 90);

INSERT INTO Stadium (name, city) VALUES
('Santiago Bernabeu', 'Madrid');

INSERT INTO FootballerInClub (footballerId, clubId, sezonId, contractTo, salary) VALUES
(1, 1, 1, '2018-01-10', 10000), (2, 1, 1, '2018-01-10', 10000), (3, 1, 1, '2018-01-10', 10000), (4, 1, 1, '2018-01-10', 10000), 
(5, 1, 1, '2018-01-10', 10000), (6, 1, 1, '2018-01-10', 10000), (7, 2, 1, '2018-01-10', 10000), (8, 2, 1, '2018-01-10', 10000), 
(12, 2, 1, '2018-01-10', 10000), (11, 2, 1, '2018-01-10', 10000), (10, 2, 1, '2018-01-10', 10000), (9, 2, 1, '2018-01-10', 10000);

INSERT INTO CoachInClub (coachId, clubId, sezonId, contractTo, salary) VALUES
(1, 1, 1, '2018-01-10', 10000), (2, 2, 1, '2018-01-10', 10000);

INSERT INTO FootballGame (club1Id, club2Id, sezonId, refereeId, stadiumId, date) VALUES
(1, 2, 1, 1, 1, '2017-01-17');

UPDATE Statistics
SET goals=0, redCards=0, yellowCards=0, passes=0, assists=0, ownGoals=0
WHERE footballerId > 0;

UPDATE Statistics
SET goals=2, passes=54, assists=2
WHERE footballerId > 4;

UPDATE Statistics
SET goals=1, passes=22, assists=1
WHERE footballerId > 9;

UPDATE Statistics
SET ownGoals=2
WHERE footballerId = 2;





