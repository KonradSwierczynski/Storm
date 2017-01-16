USE storm_database;

DROP PROCEDURE IF EXISTS StatisticsOfFootballer;
DROP PROCEDURE IF EXISTS StatisticsOfClub;

delimiter //

CREATE PROCEDURE StatisticsOfFootballer(in selectedId int)
BEGIN
	SELECT Footballer.name, Footballer.surname, SUM(Statistics.goals) AS Goals, COUNT(Statistics.footballerId) AS 'Matches played',
	SUM(Statistics.redCards) AS 'Red Cards', SUM(Statistics.yellowCards) AS 'Yellow Cards', SUM(Statistics.assists) AS Assists,
    SUM(Statistics.passes) AS Passes, SUM(Statistics.ownGoals) AS 'Own Goals'
    FROM Footballer
    LEFT JOIN Statistics ON Footballer.id = Statistics.footballerId
    WHERE Footballer.id = selectedId
    GROUP BY Footballer.id;
END;//

CREATE PROCEDURE StatisticsOfClub(in selectedId int)
BEGIN
	SELECT Club.name, Club.city, League.name, Club.budget, COUNT(FootballGame.club1Id) AS 'Matches', (Statistics.goals) AS Goals, 
	SUM(Statistics.redCards) AS 'Red Cards', SUM(Statistics.yellowCards) AS 'Yellow Cards'
    FROM Club
    INNER JOIN League ON Club.leagueId = League.id
    LEFT JOIN FootballGame ON Club.id = FootballGame.club1Id OR Club.id = FootballGame.club2Id
    LEFT JOIN FootballerInClub ON Club.id = FootballerInClub.clubId
    LEFT JOIN Statistics ON FootballerInClub.footballerId = Statistics.footballerId
    WHERE Club.id = selectedId
    GROUP BY Club.id;
END;//

delimiter ;