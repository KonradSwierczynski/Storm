import logging
from aiohttp import web
from aiohttp_auth import auth
import decimal
import datetime
import sample.utils as utils


@auth.auth_required
@utils.mysql_connection
async def get_players(cur, request):
    cur.execute("SELECT * FROM StatisticsOfFootballers")
    result = cur.fetchall()
    for i, r in enumerate(result):
        r = list(r)
        for j, s in enumerate(r):
            if isinstance(s, decimal.Decimal):
                r[j] = int(s)
        result[i] = r
    logging.info("ALL: " + str(result))
    return web.json_response(result)


@auth.auth_required
@utils.mysql_connection
async def update_player_stats(cur, request):
    await request.post()
    utils.validate_request(request)
    p = request.POST
    try:
        input_list = [
            p['cName'], p['date'], p['pName'], p['pSurname'], p['goals'],
            p['reds'], p['yellows'], p['passes'], p['assists'], p['owngoals']
        ]
    except KeyError:
        raise web.HTTPBadRequest()
    logging.info(input_list)
    cur.callproc("UpdateStatisticsOfFootballer", input_list)
    result = [r.fetchall() for r in cur.stored_results()]
    logging.info("UPDATE: " + str(result))
    return web.json_response({})


@auth.auth_required
@utils.mysql_connection
async def get_clubs_stats(cur, request):
    cur.execute("SELECT * FROM StatisticsOfClubs")
    result = cur.fetchall()
    result = [
        [entry[0]] + [int(entry[i]) for i in range(1, 4)]
        for entry in result]
    return web.json_response(result)


@auth.auth_required
@utils.mysql_connection
async def get_single_club_info(cur, request):
    club_name = request.match_info['club']
    cur.callproc("StatisticsOfClub", [club_name])
    result = [r.fetchall() for r in cur.stored_results()][0][0]
    result = list(result)
    for i, r in enumerate(result):
        if isinstance(r, decimal.Decimal):
            result[i] = int(r)
    cur.callproc("PlayersInClub", [club_name])
    players = [p.fetchall() for p in cur.stored_results()][0]
    logging.info("RESULT: " + str(players))
    return web.json_response({'info': result, 'players': players})


@auth.auth_required
@utils.mysql_connection
async def add_new_club(cur, request):
    await request.post()
    utils.validate_request(request)
    try:
        input_list = [
            request.POST['name'],
            request.POST['league'],
            request.POST['foundation'],
            request.POST['city'],
            request.POST['budget']
        ]
    except KeyError:
        raise web.HTTPBadRequest()
    cur.callproc("CreateClub", input_list)
    return web.json_response({})


@auth.auth_required
@utils.mysql_connection
async def get_matches(cur, request):
    cur.callproc("FootballGames")
    result = [g.fetchall() for g in cur.stored_results()][0]
    logging.info(result)
    for j, match in enumerate(result):
        match = list(match)
        for i, r in enumerate(match):
            if isinstance(r, datetime.date):
                match[i] = str(r)
        result[j] = match
    return web.json_response(result)


@auth.auth_required
@utils.mysql_connection
async def add_match(cur, request):
    await request.post()
    utils.validate_request(request)
    try:
        input_list = [
            request.POST['club1'],
            request.POST['club2'],
            request.POST['seasonYear'],
            request.POST['round'],
            request.POST['refereeName'],
            request.POST['refereeSurname'],
            request.POST['stadium'],
            request.POST['date']
        ]
    except KeyError:
        raise web.HTTPBadRequest()
    cur.callproc("CreateGame", input_list)
    return web.json_response({})


@auth.auth_required
@utils.mysql_connection
async def get_referees_stats(cur, request):
    cur.execute("SELECT * FROM StatisticsOfReferees")
    return web.json_response(cur.fetchall())


@auth.auth_required
@utils.mysql_connection
async def add_referee(cur, request):
    await request.post()
    utils.validate_request(request)
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
    utils.validate_request(request)
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


@auth.auth_required
@utils.mysql_connection
async def get_league_stats(cur, request):
    lname = request.match_info['league']
    cur.callproc("StatisticsOfLeague", [lname])
    result = [r.fetchall() for r in cur.stored_results()][0]
    result = list(result)
    for i, r in enumerate(result):
        r = list(r)
        for j, s in enumerate(r):
            if isinstance(s, decimal.Decimal):
                r[j] = int(s)
        result[i] = r
    return web.json_response(result)


@auth.auth_required
@utils.mysql_connection
async def get_stadiums_stats(cur, request):
    cur.execute("SELECT * FROM StatisticsOfStadiums")
    return web.json_response(cur.fetchall())


async def insert_into(cur, table, input_dict):
    dbquery = ('INSERT INTO {} ({}) VALUES ({})'.
               format(table,
                      ', '.join(['{}'.format(col)
                                for col in list(input_dict.keys())]),
                      ', '.join(['"{}"'.format(val)
                                for val in list(input_dict.values())])))
    logging.info(dbquery)
    cur.execute(dbquery)
