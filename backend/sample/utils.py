from mysql.connector import connection
from functools import wraps
import time
import logging

mysql_config = {
    'user': 'storm_user',
    'password': 'storm_password',
    'host': 'mysql',
    'database': 'storm_database'
}


def get_sql_handle():
    global cnx
    return cnx


def mysql_connection(fn):
    @wraps(fn)
    async def wrapper(*args, **kwargs):
        cursor = get_sql_handle().cursor()
        result = await fn(cursor, *args, **kwargs)
        cursor.close()
        return result
    return wrapper


def connect_to_mysql():
    global cnx
    i = 1
    while True:
        try:
            logging.info("Attempt no. {}: connect to MySQL".format(i))
            cnx = connection.MySQLConnection(**mysql_config)
            logging.info("Connected to MySQL")
        except Exception as e:
            logging.warn("Couldn't connect to MySQL... reconnecting")
            logging.warn("Connection error: {}".format(e))
            time.sleep(5)
            i += 1
            continue
        return cnx
