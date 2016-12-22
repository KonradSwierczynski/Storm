from aiohttp import web
import aiohttp_autoreload
import logging

logging.basicConfig(level=logging.DEBUG)
aiohttp_autoreload.start()


async def hello(request):
    return web.json_response("WORLD FROM BACKEND!")


def init():
    app = web.Application()
    app.router.add_route('GET', '/', hello)
    logging.info("Backend server started")
    web.run_app(app)


if __name__ == "__main__":
    init()
