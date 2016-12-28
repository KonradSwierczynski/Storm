#!/bin/bash

cd /db
service mysql start
cat tables.sql > bundle.sql
mysql --user=root < init.sql

mysql --user=root < bundle.sql

rm bundle.sql

sleep 9999999999999999
