from quart import  request, jsonify
import os
from . import api
from quart_jwt_extended import (
    create_access_token,
    set_access_cookies,
    jwt_required,
    get_jwt_identity,
    unset_jwt_cookies,
)
from services.user_service import user_service


SECRET_KEY = os.getenv("SECRET_KEY", "supersecretdevelopmentkey")


# db_config = {
#     "user": "root",
#     "password": "Vaibhavv17",
#     "host": "localhost",
#     "db": "rebound",
#     "port": 3307,
# }


# async def get_db_connection():
#     return await aiomysql.connect(
#         user=db_config["user"],
#         password=db_config["password"],
#         host=db_config["host"],
#         db=db_config["db"],
#         port=db_config["port"],
#     )


# def generate_jwt(username):
#     payload = {
#         "username": username,
#         "exp": datetime.utcnow() + timedelta(hours=1),  # Token expires in 1 hour
#     }
#     token = jwt.encode(payload, SECRET_KEY, algorithm="HS256")
#     return token


# def verify_jwt(token):
#     try:
#         payload = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
#         return payload["username"]
#     except jwt.ExpiredSignatureError:
#         return None
#     except jwt.InvalidTokenError:
#         return None


@api.route("/auth/signup", methods=["POST"])
async def signup():
    data = await request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    if await user_service.check_user_exists(username):
        return jsonify({"message": "User already exists"}), 400

    await user_service.create_user(username, password)
    return jsonify({"message": f"User {username} registered successfully!"}), 201


@api.route("/auth/login", methods=["POST"])
async def login():
    data = await request.get_json()
    username = data.get("username")
    password = data.get("password")

    if not username or not password:
        return jsonify({"message": "Username and password required"}), 400

    stored_password = await user_service.get_user_password(username)
    if not stored_password:
        return jsonify({"message": "User does not exist"}), 404

    if not await user_service.verify_password(stored_password, password):
        return jsonify({"message": "Incorrect password"}), 401

    # Generate JWT token and set it in the response
    access_token = create_access_token(identity=username)
    response = jsonify({"message": f"User {username} logged in successfully!"})
    set_access_cookies(response, access_token)
    return response, 200

@api.route("/auth/status", methods=["GET"])
@jwt_required
async def status():
    try:
        current_user = get_jwt_identity()
        if not current_user:
            return jsonify({"message": "Unauthorized access", "success": False}), 401
        return jsonify({"message": "User is logged in", "user": current_user}), 200
    except Exception:
        return jsonify({"message": "Unauthorized access", "success": False}), 401


@api.route("/auth/logout", methods=["POST"])
async def logout():
    response = jsonify({"message": "Successfully logged out"})
    unset_jwt_cookies(response)
    return response, 200
