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
from services.log_service import LogService
from services.db import Database


db_config = {
    "user": "root",
    "password": "password",
    "host": "143.244.143.214",
    "db": "cowrie",
    "port": 3306,
}

@api.route("/logs", methods=["GET"])
async def getlogs():
    try:
        db_service = Database(config=db_config)
        log_service = LogService(db=db_service)
        connection = log_service
        auth_result = await connection.getauth()
        input_result = await connection.getactions()

        if auth_result:
            # Assuming the table 'auth' has columns 'id' and 'username', modify as per your schema
            response = [
                row for row in auth_result
            ]
            
            actions_response = [
                row for row in input_result
            ]
            
            return jsonify({
                "auth": response,
                "input": actions_response
                }), 200
        else:
            return jsonify({"message": "No records found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500