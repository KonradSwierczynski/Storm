DROP DATABASE IF EXISTS storm_database;
CREATE DATABASE storm_database;

CREATE USER 'storm_user'@'%' IDENTIFIED BY 'storm_password';
GRANT ALL ON *.* TO 'storm_user'@'%';
