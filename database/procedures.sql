USE storm_database;

DROP PROCEDURE IF EXISTS StatisticsOfFootballer;
DROP PROCEDURE IF EXISTS StatisticsOfClub;
DROP PROCEDURE IF EXISTS StatisticsOfReferee;
DROP PROCEDURE IF EXISTS StatisticsOfLeague;
DROP PROCEDURE IF EXISTS StatisticsOfLeagueInSezon;
DROP PROCEDURE IF EXISTS CreateGame;

delimiter //

CREATE PROCEDURE CreateGame(in firstTeam varchar(225), in secoundTeam varchar(225),
	in sezonYear YEAR, in sezonRound varchar(225), in refereeName varchar(225), in refereeSurname varchar(225), in stadiumName varchar(225), in gameDate DATE)
BEGIN
	DECLARE club1 int;
    DECLARE club2 int;
    DECLARE sezon int;
    DECLARE referee int;
    DECLARE stadium int;
    SET club1 = (SELECT Club.id FROM Club WHERE Club.name = firstTeam);
    SET club2 = (SELECT Club.id FROM Club WHERE Club.name = secoundTeam);
    SET sezon = (SELECT Sezon.id FROM Sezon WHERE Sezon.round = sezonRound AND Sezon.year = sezonYear);
    SET referee = (SELECT Referee.id FROM Referee WHERE Referee.name = refereeName AND Referee.surname = refereeSurname);
    SET stadium = (SELECT Stadium.id FROM Stadium WHERE Stadium.name = stadiumName);
    INSERT INTO FootballGame (club1Id, club2Id, sezonId, refereeId, stadiumId, date) VALUES
    (club1, club2, sezon, referee, stadium, gameDate);
END;//

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

CREATE PROCEDURE StatisticsOfLeague(in selectedName varchar(225))
BEGIN
SELECT Club.name, Club.city, Club.budget,League.name, SUM(Statistics.goals) AS Goals, 
	SUM(Statistics.redCards) AS 'Red Cards', SUM(Statistics.yellowCards) AS 'Yellow Cards'
    FROM Club
    LEFT JOIN FootballerInClub ON Club.id = FootballerInClub.clubId
    LEFT JOIN Statistics ON FootballerInClub.footballerId = Statistics.footballerId
    INNER JOIN League ON Club.leagueId = League.id
    WHERE League.name = selectedName
    GROUP BY Club.id
    ORDER BY Goals DESC;
END;//

CREATE PROCEDURE StatisticsOfLeagueInSezon(in selectedName varchar(225), in selectedYear YEAR, in selectedRound nvarchar(225))
BEGIN
SELECT Club.name, Club.city, Club.budget,League.name, SUM(Statistics.goals) AS Goals, 
	SUM(Statistics.redCards) AS 'Red Cards', SUM(Statistics.yellowCards) AS 'Yellow Cards'
    FROM Club
    INNER JOIN Sezon
    LEFT JOIN FootballerInClub ON Club.id = FootballerInClub.clubId AND FootballerInClub.sezonId = Sezon.id
    LEFT JOIN Statistics ON FootballerInClub.footballerId = Statistics.footballerId
    INNER JOIN League ON Club.leagueId = League.id
    WHERE League.name = selectedName AND Sezon.round = selectedRound AND Sezon.year = selectedYear
    GROUP BY Club.id
    ORDER BY Goals DESC;
END;//


delimiter ;