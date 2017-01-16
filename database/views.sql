USE storm_database;

DROP VIEW IF EXISTS StatisticsOfFootballers;
CREATE VIEW StatisticsOfFootballers AS
SELECT Footballer.name, Footballer.surname, SUM(Statistics.goals) AS Goals, 
	SUM(Statistics.redCards) AS 'Red Cards', SUM(Statistics.yellowCards) AS 'Yellow Cards', SUM(Statistics.assists) AS Assists
    FROM Footballer
    LEFT JOIN Statistics ON Footballer.id = Statistics.footballerId
    GROUP BY Footballer.id
    ORDER BY Goals DESC;
    
DROP VIEW IF EXISTS StatisticsOfClubs;
CREATE VIEW StatisticsOfClubs AS
SELECT Club.name, SUM(Statistics.goals) AS Goals, 
	SUM(Statistics.redCards) AS 'Red Cards', SUM(Statistics.yellowCards) AS 'Yellow Cards'
    FROM Club
    LEFT JOIN FootballerInClub ON Club.id = FootballerInClub.clubId
    LEFT JOIN Statistics ON FootballerInClub.footballerId = Statistics.footballerId
    GROUP BY Club.id
    ORDER BY Goals DESC;
    
DROP VIEW IF EXISTS StatisticsOfReferees;
CREATE VIEW StatisticsOfReferees AS
SELECT Referee.name, Referee.surname, COUNT(FootballGame.id) AS Matches
    FROM Referee
    LEFT JOIN FootballGame ON Referee.id = FootballGame.refereeId
    GROUP BY Referee.id
    ORDER BY Matches DESC;
    
