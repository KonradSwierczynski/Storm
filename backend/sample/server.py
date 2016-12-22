from aiohttp import web
import aiohttp_autoreload
from mysql.connector import connection
import logging

logging.basicConfig(level=logging.DEBUG)
aiohttp_autoreload.start()

mysql_config = {
    'user': 'storm_user',
    'password': 'storm_password',
    'host': 'mysql',
    'database': 'storm_database',
    'port': '3333'
}


async def hello(request):
    return web.json_response("WORLD FROM BACKEND!")


# TODO connecting to MySQL is borken ATM
def init():
    try:
        cnx = connection.MySQLConnection(**mysql_config)
        cnx.close()
    except:
        logging.critical("Couldn't connect to MySQL")
    app = web.Application()
    app.router.add_route('GET', '/', hello)
    logging.info("Backend server started")
    web.run_app(app)


if __name__ == "__main__":
    init()
