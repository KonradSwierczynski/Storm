#!/bin/bash

cd /db
service mysql start
cat tables.sql > bundle.sql
mysql --user=root --password=$MYSQL_ROOT_PASSWORD < init.sql

mysql --user=root --password=$MYSQL_ROOT_USER < bundle.sql

rm bundle.sql

sleep 9999999999999999
