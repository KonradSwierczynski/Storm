from aiohttp import web
from aiohttp_auth import auth

import sample.utils as utils


@auth.auth_required
@utils.mysql_connection
async def get_players(cur, request):
    cur.execute("SELECT * FROM Footballer")
    result = [{
        'dateOfBirth': str(p[1]),
        'nationality': p[2],
        'name': p[3],
        'surname': p[4],
        'playingPosition': p[5]
    } for p in cur.fetchall()]
    return web.json_response(result)


@auth.auth_required
@utils.mysql_connection
async def get_referees_stats(cur, request):
    cur.execute("SELECT * FROM StatisticsOfReferees")
    return web.json_response(cur.fetchall())


@auth.auth_required
@utils.mysql_connection
async def add_player(cur, request):
    await request.post()
    try:
        name = request.POST['name']
        surname = request.POST['surname']
        dateOfBirth = request.POST['dateOfBirth']
        nationality = request.POST['nationality']
        playingPosition = request.POST['playingPosition']
    except KeyError:
        raise web.HTTPBadRequest()
    dbquery = ('INSERT INTO Footballer '
               + '(dateOfBirth, nationality, name, surname, playingPosition) '
               + 'VALUES ("{}", "{}", "{}", "{}", "{}")'
               .format(dateOfBirth, nationality, name,
                       surname, playingPosition))
    cur.execute(dbquery)
    return web.json_response({})
