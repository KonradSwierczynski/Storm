from aiohttp import web
from aiohttp_auth import auth

import aiohttp_autoreload

from os import urandom

import logging
import sample.utils as utils

logging.basicConfig(level=logging.DEBUG)
aiohttp_autoreload.start()


@auth.auth_required
@utils.mysql_connection
async def hello(cur, request):
    cur.execute("SHOW TABLES")
    result = [(i[0]).decode('utf-8') for i in cur.fetchall()]
    return web.json_response(result)


@auth.auth_required
@utils.mysql_connection
async def createTable(cur, request):
    await request.post()
    logging.info(request.POST)
    cur.execute("CREATE TABLE {} (val varchar(225))"
                .format(request.POST['tableName']))
    return web.json_response()

db = {
    'adam': 'pass',
    'konrad': 'pass'
}


async def login(request):
    params = await request.post()
    user = params.get('username', None)
    if (user in db and
            params.get('password', None) == db[user]):
        await auth.remember(request, user)
        return web.Response(body='OK'.encode('utf-8'))
    raise web.HTTPForbidden()


@auth.auth_required
async def logout(request):
    await auth.forget(request)
    return web.Response(body='OK'.encode('utf-8'))


async def checkLogin(request):
    user = await auth.get_auth(request)
    result = False if user is None else True
    return web.json_response(result)


def init():
    policy = auth.CookieTktAuthentication(urandom(32), 600, include_ip=True)
    middlewares = [auth.auth_middleware(policy)]
    app = web.Application(middlewares=middlewares)
    utils.connect_to_mysql()
    app.router.add_route('GET', '/', hello)
    app.router.add_route('POST', '/', createTable)
    app.router.add_route('GET', '/check', checkLogin)
    app.router.add_route('POST', '/login', login)
    app.router.add_route('POST', '/logout', logout)
    logging.info("Backend server started")
    web.run_app(app)
    logging.info("Closing connection")


if __name__ == "__main__":
    init()
