USE storm_database;

DROP VIEW IF EXISTS StatisticsOfFootballers;
CREATE VIEW StatisticsOfFootballers AS
SELECT Footballer.name, Footballer.surname, SUM(Statistics.goals) AS Goals, 
	SUM(Statistics.redCards) AS RedCards, SUM(Statistics.yellowCards) AS YellowCards, SUM(Statistics.assists) AS Assists
    FROM Footballer
    INNER JOIN Statistics ON Footballer.id = Statistics.footballerId
    GROUP BY Footballer.id
    ORDER BY Goals;
    
DROP VIEW IF EXISTS StatisticsOfClubs;
CREATE VIEW StatisticsOfClubs AS
SELECT Club.name, SUM(Statistics.goals) AS Goals, 
	SUM(Statistics.redCards) AS RedCards, SUM(Statistics.yellowCards) AS YellowCards
    FROM Club
    INNER JOIN FootballerInClub ON Club.id = FootballerInClub.clubId
    INNER JOIN Statistics ON FootballerInClub.footballerId = Statistics.footballerId
    GROUP BY Club.id
    ORDER BY Goals;
    
