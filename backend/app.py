from quart import Quart
import os
from quart_jwt_extended import (
    JWTManager,
)
from quart_cors import cors
from api import api

app = Quart(__name__)

cors(
    app,
    allow_origin=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:3000/",
    ],
    allow_credentials=True,
    allow_headers=["Content-Type", "Authorization"],
    allow_methods=["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    max_age=1086400,
    expose_headers=["Authorization"],
)

app.register_blueprint(api, url_prefix="/api")

SECRET_KEY = os.getenv("SECRET_KEY", "supersecretdevelopmentkey")
app.config["JWT_SECRET_KEY"] = SECRET_KEY
app.config["MAX_CONTENT_LENGTH"] = 100 * 1024 * 1024  # 100 MB
app.config["JWT_TOKEN_LOCATION"] = [
    "cookies"
]  # Specify that JWT will be stored in cookies
app.config["JWT_COOKIE_SECURE"] = False  # Set to True in production when using HTTPS
app.config["JWT_COOKIE_CSRF_PROTECT"] = False  # Enable CSRF protection

JWTManager(app)


if __name__ == "__main__":
    app.run(debug=True)
