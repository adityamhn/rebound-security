from quart import Blueprint

api = Blueprint('api', __name__)
routers = ["auth"]
for module in routers:
    __import__(f"{__name__}.{module}")