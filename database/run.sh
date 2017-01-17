#!/bin/bash

cd /db
service mysql start
cat init.sql tables.sql views.sql procedures.sql trigger.sql initdata.sql > bundle.sql

mysql --user=root < bundle.sql

rm bundle.sql

sleep 9999999999999999
