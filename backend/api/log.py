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
from services.log_service import log_service


db_config = {
    "user": "root",
    "password": "password",
    "host": "143.244.143.214",
    "db": "cowrie",
    "port": 3306,
}


@api.route("/log", methods=["POST"])
async def signup():
    try:
        data = await request.get_json()  # Use get_json() to parse JSON data
        if not data:
            return jsonify({"error": "No data provided"}), 400

        connection = log_service
        auth_result = await connection.getauth()

        if auth_result:
            response = {"message": "Authorization successful"}
        else:
            response = {"message": "Authorization failed"}

        return jsonify(response), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
