from aiohttp import web
from aiohttp_auth import auth

import aiohttp_autoreload

from os import urandom

import logging
import sample.utils as utils
import sample.dbutils as dbutils

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
    'adam': '9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684',
    'konrad': '9d4e1e23bd5b727046a9e3b4b7db57bd8d6ee684'
}


async def login(request):
    params = await request.post()
    user = params.get('username', None)
    if (user in db and params.get('password', None) == db[user]):
        await auth.remember(request, user)
        return web.Response(body='OK'.encode('utf-8'))
    raise web.HTTPForbidden()


@auth.auth_required
async def logout(request):
    await auth.forget(request)
    return web.Response(body='OK'.encode('utf-8'))


async def checkIfLoggedIn(request):
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
    app.router.add_route('GET', '/check', checkIfLoggedIn)
    app.router.add_route('POST', '/login', login)
    app.router.add_route('POST', '/logout', logout)

    # Players
    app.router.add_route('GET', '/allplayers', dbutils.get_players)
    app.router.add_route('POST', '/addplayer', dbutils.add_player)

    # Referee
    app.router.add_route('GET', '/stats/referees', dbutils.get_referees_stats)
    app.router.add_route('POST', '/addreferee', dbutils.add_referee)

    # Clubs
    app.router.add_route('GET', '/stats/clubs', dbutils.get_clubs_stats)
    app.router.add_route('GET', '/club/{club}', dbutils.get_single_club_info)
    app.router.add_route('POST', '/add/club', dbutils.add_new_club)

    # Matches
    app.router.add_route('GET', '/matches', dbutils.get_matches)
    app.router.add_route('POST', '/matches/add', dbutils.add_match)

    # League
    app.router.add_route('GET', '/league/{league}', dbutils.get_league_stats)

    logging.info("Backend server started")
    web.run_app(app)
    logging.info("Closing connection")


if __name__ == "__main__":
    init()
