USE storm_database;

DROP PROCEDURE IF EXISTS StatisticsOfFootballer;		# StatisticsOfFootballer(in selectedName varchar(225), in selectedSurname varchar(225))
DROP PROCEDURE IF EXISTS StatisticsOfClub;				# StatisticsOfClub(in selectedName varchar(225))
DROP PROCEDURE IF EXISTS StatisticsOfReferee;			# StatisticsOfReferee(in selectedName varchar(225), in selectedSurname varchar(225))
DROP PROCEDURE IF EXISTS StatisticsOfLeague;			# StatisticsOfLeague(in selectedName varchar(225))
DROP PROCEDURE IF EXISTS StatisticsOfLeagueInSezon;		# StatisticsOfLeagueInSezon(in selectedName varchar(225), in selectedYear YEAR, in selectedRound nvarchar(225))
DROP PROCEDURE IF EXISTS CreateGame;					# CreateGame(in firstTeam varchar(225), in secoundTeam varchar(225), in sezonYear YEAR, in sezonRound varchar(225), in refereeName varchar(225), in refereeSurname varchar(225), in stadiumName varchar(225), in gameDate DATE)
DROP PROCEDURE IF EXISTS DeleteGame;					# DeleteGame(in firstTeam varchar(225), in secoundTeam varchar(225), in sezonYear YEAR, in sezonRound varchar(225), in refereeName varchar(225), in refereeSurname varchar(225), in stadiumName varchar(225), in gameDate DATE)
DROP PROCEDURE IF EXISTS PlayersInClub;					# PlayersInClub(in selectedName varchar(225))
DROP PROCEDURE IF EXISTS CreateClub;					# CreateClub(in clubName varchar(225), in leagueName varchar(225), in fundation YEAR, in city varchar(225), in budget int)
DROP PROCEDURE IF EXISTS FootballGames;					# FootballGames()
DROP PROCEDURE IF EXISTS UpdateFootballerInClub;		# UpdateFootballerInClub(in fotballerName varchar(225), in fotballerSurname varchar(225), in clubName varchar(225),  in selectedYear YEAR, in selectedRound nvarchar(225), in newContractTo DATE, in newSalary int)
DROP PROCEDURE IF EXISTS UpdateStatisticsOfFootballer;	# UpdateStatisticsOfFootballer(in club varchar(225), in gameDate DATE, in footballerName varchar(225), in footballerSurname varchar(225), in sGoals int, in fRedCards int, in fRellowCards int, in fPasses int, in fAssists int, in fOwnGoals int)


delimiter //

CREATE PROCEDURE UpdateStatisticsOfFootballer(in fClub varchar(225), in gameDate DATE, in footballerName varchar(225), 
			in footballerSurname varchar(225), in fGoals int, in fRedCards int, in fYellowCards int, in fPasses int, in fAssists int, in fOwnGoals int)
BEGIN
	DECLARE club int;
	DECLARE game int;
    DECLARE footballer int;
    
    SET club = (SELECT Club.id
				FROM Club
				WHERE Club.name = fClub
                LIMIT 1);
    SET game = (SELECT FootballGame.id 
				FROM FootballGame 
				WHERE FootballGame.date = gameDate AND (FootballGame.club1Id = club OR FootballGame.club2Id = club)
                LIMIT 1);
	SET footballer = (SELECT Footballer.id 
						FROM Footballer 
						WHERE Footballer.name = footballerName AND Footballer.surname = footballerSurname
                        LIMIT 1);
                    SELECT footballer, game, club;
	IF game IS NOT NULL AND footballer IS NOT NULL THEN
		UPDATE Statistics
        SET Statistics.goals = fGoals, Statistics.redCards = fredCards, 
			Statistics.yellowCards = fYellowCards, Statistics.passes = fPasses, 
            Statistics.assists = fAssists, Statistics.ownGoals = ownGoals
		WHERE Statistics.footballerId = footballer AND Statistics.gameId = game;
    END IF;

END;//


CREATE PROCEDURE DeleteGame(in firstTeam varchar(225), in secoundTeam varchar(225),
	in sezonYear YEAR, in sezonRound varchar(225), in refereeName varchar(225), in refereeSurname varchar(225), in stadiumName varchar(225), in gameDate DATE)
BEGIN

	DECLARE club1 int;
    DECLARE club2 int;
    DECLARE sezon int;
    DECLARE referee int;
    DECLARE stadium int;
    DECLARE game int;
    SET club1 = (SELECT Club.id FROM Club WHERE Club.name = firstTeam LIMIT 1);
    SET club2 = (SELECT Club.id FROM Club WHERE Club.name = secoundTeam LIMIT 1);
    SET sezon = (SELECT Sezon.id FROM Sezon WHERE Sezon.round = sezonRound AND Sezon.year = sezonYear LIMIT 1);
    SET referee = (SELECT Referee.id FROM Referee WHERE Referee.name = refereeName AND Referee.surname = refereeSurname LIMIT 1);
    SET stadium = (SELECT Stadium.id FROM Stadium WHERE Stadium.name = stadiumName LIMIT 1);
    SET game = (SELECT FootballGame.id FROM FootballGame WHERE FootballGame.club1Id = club1 AND FootballGame.club2Id = club2 
		AND FootballGame.date = gameDate AND FootballGame.refereeId = referee AND FootballGame.sezonId = sezon AND FootballGame.stadiumId = stadium LIMIT 1);
	
    SET autocommit = 0;
	START TRANSACTION;
    
		DELETE FROM FootballGame WHERE FootballGame.id = game;
		DELETE FROM Statistics WHERE Statistics.gameId = game;
        
	COMMIT; 
    SET autocommit = 1;
        
END;//


CREATE PROCEDURE CreateGame(in firstTeam varchar(225), in secoundTeam varchar(225),
	in sezonYear YEAR, in sezonRound varchar(225), in refereeName varchar(225), in refereeSurname varchar(225), in stadiumName varchar(225), in gameDate DATE)
BEGIN
	DECLARE club1 int;
    DECLARE club2 int;
    DECLARE sezon int;
    DECLARE referee int;
    DECLARE stadium int;
    SET club1 = (SELECT Club.id FROM Club WHERE Club.name = firstTeam LIMIT 1);
    SET club2 = (SELECT Club.id FROM Club WHERE Club.name = secoundTeam LIMIT 1);
    SET sezon = (SELECT Sezon.id FROM Sezon WHERE Sezon.round = sezonRound AND Sezon.year = sezonYear LIMIT 1);
    SET referee = (SELECT Referee.id FROM Referee WHERE Referee.name = refereeName AND Referee.surname = refereeSurname LIMIT 1);
    SET stadium = (SELECT Stadium.id FROM Stadium WHERE Stadium.name = stadiumName LIMIT 1);
    IF club1 IS NOT NULL AND club2 IS NOT NULL AND sezon IS NOT NULL AND referee IS NOT NULL AND stadium IS NOT NULL THEN
		INSERT INTO FootballGame (club1Id, club2Id, sezonId, refereeId, stadiumId, date) VALUES
		(club1, club2, sezon, referee, stadium, gameDate);
	END IF;
END;//


CREATE PROCEDURE StatisticsOfFootballer(in selectedName varchar(225), in selectedSurname varchar(225))
BEGIN
	SELECT Footballer.name, Footballer.surname, COALESCE(SUM(Statistics.goals), 0) AS Goals, COALESCE(AVG(Statistics.goals), 0) AS 'Avg. Goals', COUNT(Statistics.footballerId) AS 'Matches played',
	COALESCE(SUM(Statistics.redCards), 0) AS 'Red Cards', COALESCE(SUM(Statistics.yellowCards), 0) AS 'Yellow Cards', COALESCE(SUM(Statistics.assists), 0) AS Assists,
    COALESCE(SUM(Statistics.passes), 0) AS Passes, COALESCE(SUM(Statistics.ownGoals), 0) AS 'Own Goals'
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


CREATE PROCEDURE CreateClub(in clubName varchar(225), in leagueName varchar(225),
	in fundation YEAR, in city varchar(225), in budget int)
BEGIN
	DECLARE league int;
    SET league = (SELECT League.id FROM League WHERE League.name = leagueName LIMIT 1);
    IF league IS NOT NULL THEN
		INSERT INTO Club (leagueId, fundationYear, name, city, budget) VALUES
		(league, fundation, clubName, city, budget);
	END IF;
END;//


CREATE PROCEDURE StatisticsOfClub(in selectedName varchar(225))
BEGIN
SELECT Club.name, Club.city, Club.budget,League.name, COALESCE(SUM(Statistics.goals), 0) AS Goals, 
	COALESCE(SUM(Statistics.redCards), 0) AS 'Red Cards', COALESCE(SUM(Statistics.yellowCards), 0) AS 'Yellow Cards'
    FROM Club
    LEFT JOIN FootballerInClub ON Club.id = FootballerInClub.clubId
    LEFT JOIN Statistics ON FootballerInClub.footballerId = Statistics.footballerId
    INNER JOIN League ON Club.leagueId = League.id
    WHERE Club.name = selectedName
    GROUP BY Club.id
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
SELECT Club.name, Club.city, Club.budget,League.name, COALESCE(SUM(Statistics.goals), 0) AS Goals, 
	COALESCE(SUM(Statistics.redCards), 0) AS 'Red Cards', COALESCE(SUM(Statistics.yellowCards), 0) AS 'Yellow Cards'
    FROM Club
    LEFT JOIN FootballerInClub ON Club.id = FootballerInClub.clubId
    LEFT JOIN Statistics ON FootballerInClub.footballerId = Statistics.footballerId
    INNER JOIN League ON Club.leagueId = League.id
    WHERE League.name = selectedName
    GROUP BY Club.id
    ORDER BY Goals DESC;
END;//


CREATE PROCEDURE PlayersInClub(in selectedName varchar(225))
BEGIN
SELECT Footballer.name, Footballer.surname
	FROM Footballer
    INNER JOIN Club
    INNER JOIN FootballerInClub ON Club.Id = FootballerInClub.clubId AND Footballer.id = FootballerInClub.footballerId
    WHERE Club.name = selectedName;
END;//


CREATE PROCEDURE FootballGames()
BEGIN
SELECT DISTINCT club1.name, club2.name, Stadium.name, Stadium.city, FootballGame.date
	FROM FootballGame
    INNER JOIN Club club1 ON FootballGame.club1Id = club1.id
	INNER JOIN Club club2 ON FootballGame.club2Id = club2.id
    INNER JOIN Stadium ON FootballGame.stadiumId = Stadium.id;
END;//


CREATE PROCEDURE StatisticsOfLeagueInSezon(in selectedName varchar(225), in selectedYear YEAR, in selectedRound nvarchar(225))
BEGIN
SELECT Club.name, Club.city, Club.budget,League.name, COALESCE(SUM(Statistics.goals), 0) AS Goals, 
	COALESCE(SUM(Statistics.redCards), 0) AS 'Red Cards', COALESCE(SUM(Statistics.yellowCards), 0) AS 'Yellow Cards'
    FROM Club
    INNER JOIN Sezon
    LEFT JOIN FootballerInClub ON Club.id = FootballerInClub.clubId AND FootballerInClub.sezonId = Sezon.id
    LEFT JOIN Statistics ON FootballerInClub.footballerId = Statistics.footballerId
    INNER JOIN League ON Club.leagueId = League.id
    WHERE League.name = selectedName AND Sezon.round = selectedRound AND Sezon.year = selectedYear
    GROUP BY Club.id
    ORDER BY Goals DESC;
END;//


CREATE PROCEDURE UpdateFootballerInClub(in fotballerName varchar(225), in fotballerSurname varchar(225), in clubName varchar(225), 
	in selectedYear YEAR, in selectedRound nvarchar(225), in newContractTo DATE, in newSalary int)
BEGIN
	DECLARE footballer int;
    DECLARE club int;
    DECLARE sezon int;
    
    SET footballer = (SELECT Footballer.id FROM Footballer WHERE Footballer.name = clubName AND Footballer.surname = fotballerSurname LIMIT 1);
    SET club = (SELECT Club.id FROM Club WHERE Club.name = clubName LIMIT 1);
    SET sezon = (SELECT Sezon.id FROM Sezon WHERE Sezon.round = sezonRound AND Sezon.year = sezonYear);
    
	IF (SELECT * FROM FootballerInClub WHERE FootballerInClub.footballerId = footballer 
		AND FootballerInClub.clubId = club AND FootballerInClub.sezonId = sezon) IS NULL THEN
        
        INSERT INTO FootballerInClub (footballerId, clubId, sezonId, contractTo, salary) VALUES
        (footballer, club, sezon, newContractTo, newSalary);
        
	ELSE
		UPDATE FootballerInClub
        SET contractTo = newContractTo, salary = newSalary
        WHERE FootballerInClub.footballerId = footballer AND FootballerInClub.clubId = club AND FootballerInClub.sezonId = sezon;
        
	END IF;
    
        
END;//


delimiter ;
