USE storm_database;

DROP PROCEDURE IF EXISTS StatisticsOfFootballer;
DROP PROCEDURE IF EXISTS StatisticsOfClub;
DROP PROCEDURE IF EXISTS StatisticsOfReferee;

delimiter //

CREATE PROCEDURE StatisticsOfFootballer(in selectedName varchar(225), in selectedSurname varchar(225))
BEGIN
	SELECT Footballer.name, Footballer.surname, SUM(Statistics.goals) AS Goals, COUNT(Statistics.footballerId) AS 'Matches played',
	SUM(Statistics.redCards) AS 'Red Cards', SUM(Statistics.yellowCards) AS 'Yellow Cards', SUM(Statistics.assists) AS Assists,
    SUM(Statistics.passes) AS Passes, SUM(Statistics.ownGoals) AS 'Own Goals'
    FROM Footballer
    LEFT JOIN Statistics ON Footballer.id = Statistics.footballerId
    WHERE Footballer.name = selectedName AND Footballer.surname = selectedSurname
    GROUP BY Footballer.id;
    
    SELECT Club.name, Sezon.year, Sezon.round, FootballerInClub.salary
    FROM Footballer
    INNER JOIN FootballerInClub ON Footballer.id = FootballerInClub.footballerId
    INNER JOIN Club ON FootballerInClub.clubId = Club.id
    INNER JOIN Sezon ON FootballerInClub.sezonId = Sezon.id
    WHERE Footballer.name = selectedName AND Footballer.surname = selectedSurname;
    
END;//

CREATE PROCEDURE StatisticsOfClub(in selectedName varchar(225))
BEGIN
SELECT Club.name, Club.city, Club.budget,League.name, SUM(Statistics.goals) AS Goals, 
	SUM(Statistics.redCards) AS 'Red Cards', SUM(Statistics.yellowCards) AS 'Yellow Cards'
    FROM Club
    LEFT JOIN FootballerInClub ON Club.id = FootballerInClub.clubId
    LEFT JOIN Statistics ON FootballerInClub.footballerId = Statistics.footballerId
    INNER JOIN League ON Club.leagueId = League.id
    GROUP BY Club.id HAVING Club.name = selectedName
    ORDER BY Goals DESC;
END;//

CREATE PROCEDURE StatisticsOfReferee(in selectedName varchar(225), in selectedSurname varchar(225))
BEGIN
SELECT Referee.name, Referee.surname, Referee.category, Referee.dateOfBirth AS 'date of birth', Referee.nationality, COUNT(FootballGame.id) AS Matches
    FROM Referee
    LEFT JOIN FootballGame ON Referee.id = FootballGame.refereeId
    WHERE Referee.name = selectedName AND Referee.surname = selectedSurname
    GROUP BY Referee.id
    ORDER BY Matches DESC;
END;//


delimiter ;