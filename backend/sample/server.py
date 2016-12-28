from aiohttp import web
import aiohttp_autoreload
import logging
import sample.utils as utils

logging.basicConfig(level=logging.DEBUG)
aiohttp_autoreload.start()


@utils.mysql_connection
async def hello(cur, request):
    cur.execute("SHOW TABLES")
    result = [(i[0]).decode('utf-8') for i in cur.fetchall()]
    return web.json_response(result)


@utils.mysql_connection
async def createTable(cur, request):
    await request.post()
    logging.info(request.POST)
    cur.execute("CREATE TABLE {} (val varchar(225))"
                .format(request.POST['tableName']))
    return web.json_response()


def init():
    app = web.Application()
    utils.connect_to_mysql()
    app.router.add_route('GET', '/', hello)
    app.router.add_route('POST', '/', createTable)
    logging.info("Backend server started")
    web.run_app(app)
    logging.info("Closing connection")


if __name__ == "__main__":
    init()
