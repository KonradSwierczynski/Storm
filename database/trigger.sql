USE storm_database;

DROP TRIGGER IF EXISTS `StatiscticsInGame`;

delimiter //

CREATE TRIGGER StatiscticsInGame AFTER INSERT ON FootballGame 
FOR EACH ROW
BEGIN
	DECLARE cursor_FootblrId int;
	DECLARE done int DEFAULT FALSE;
	DECLARE cursor_i CURSOR FOR 	SELECT footballerId FROM FootballerInClub 
					WHERE clubId = NEW.club1Id OR clubId = NEW.club2Id;
	DECLARE CONTINUE HANDLER FOR NOT FOUND SET done = TRUE;
	OPEN cursor_i;
	create_statisctics: LOOP
		FETCH cursor_i INTO cursor_FootblrId;
		IF done THEN
			LEAVE create_statisctics;
		END IF;
		INSERT INTO Statistics (footballerId, gameId, goals, redCards, yellowCards, passes, assists, ownGoals)  VALUES 
        (cursor_FootblrId, NEW.id, 0, 0, 0, 0, 0, 0);
	END LOOP;
	CLOSE cursor_i;
END;//

delimiter ;