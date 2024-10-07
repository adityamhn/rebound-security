from quart import Quart
import os
from quart_jwt_extended import (
    JWTManager,
)

from api import api

app = Quart(__name__)
app.register_blueprint(api, url_prefix="/api")

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretdevelopmentkey")
app.config["JWT_SECRET_KEY"] = SECRET_KEY
jwt = JWTManager(app)


if __name__ == "__main__":
    app.run(debug=True)