from aiohttp import web
import aiohttp_autoreload
from mysql.connector import connection
import time
import logging

logging.basicConfig(level=logging.DEBUG)
aiohttp_autoreload.start()

mysql_config = {
    'user': 'storm_user',
    'password': 'storm_password',
    'host': 'mysql',
    'database': 'storm_database'
}


async def hello(request):
    return web.json_response("WORLD FROM BACKEND!")


def connect_to_mysql():
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


def init():
    cnx = connect_to_mysql()
    app = web.Application()
    app.router.add_route('GET', '/', hello)
    logging.info("Backend server started")
    web.run_app(app)
    cnx.close()


if __name__ == "__main__":
    init()
