import logging
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
async def get_clubs_stats(cur, request):
    cur.execute("SELECT * FROM StatisticsOfClubs")
    return web.json_response(cur.fetchall())


@auth.auth_required
@utils.mysql_connection
async def get_referees_stats(cur, request):
    cur.execute("SELECT * FROM StatisticsOfReferees")
    return web.json_response(cur.fetchall())


@auth.auth_required
@utils.mysql_connection
async def add_referee(cur, request):
    await request.post()
    try:
        input_dict = {
            'name': request.POST['name'],
            'surname': request.POST['surname'],
            'dateOfBirth': request.POST['dateOfBirth'],
            'nationality': request.POST['nationality'],
            'category': request.POST['category']
        }
    except KeyError:
        raise web.HTTPBadRequest()
    await insert_into(cur, "Referee", input_dict)
    return web.json_response({})


@auth.auth_required
@utils.mysql_connection
async def add_player(cur, request):
    await request.post()
    try:
        input_dict = {
            'name': request.POST['name'],
            'surname': request.POST['surname'],
            'dateOfBirth': request.POST['dateOfBirth'],
            'nationality': request.POST['nationality'],
            'playingPosition': request.POST['playingPosition']

        }
    except KeyError:
        raise web.HTTPBadRequest()
    await insert_into(cur, "Footballer", input_dict)
    return web.json_response({})


async def insert_into(cur, table, input_dict):
    dbquery = ('INSERT INTO {} ({}) VALUES ({})'.
               format(table,
                      ', '.join(['{}'.format(col)
                                for col in list(input_dict.keys())]),
                      ', '.join(['"{}"'.format(val)
                                for val in list(input_dict.values())])))
    logging.info(dbquery)
    cur.execute(dbquery)
