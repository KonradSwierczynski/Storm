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

# TODO look for mysql-connection alternatives


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


cnx = connect_to_mysql()


def get_db_handle():
    global cnx
    return cnx


async def hello(request):
    sql = get_db_handle()
    cursor = sql.cursor()
    cursor.execute("SHOW TABLES")
    result = [(i[0]).decode('utf-8') for i in cursor.fetchall()]
    cursor.close()
    return web.json_response(result)


async def createTable(request):
    sql = get_db_handle()
    cur = sql.cursor()
    await request.post()
    logging.info(request.POST)
    cur.execute("CREATE TABLE {} (val varchar(225))"
                .format(request.POST['tableName']))
    cur.close()
    return web.json_response()


def init():
    app = web.Application()
    app.router.add_route('GET', '/', hello)
    app.router.add_route('POST', '/', createTable)
    logging.info("Backend server started")
    web.run_app(app)
    logging.info("Closing connection")
    cnx.close()


if __name__ == "__main__":
    init()
