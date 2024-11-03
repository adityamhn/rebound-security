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
from services.db import Database, db_config_cowrie

db_config = db_config_cowrie

@api.route("/logs/credentials", methods=["GET"])
async def get_credentials():
    try:
        db_service = Database(config=db_config)
        log_service = LogService(db=db_service)
        connection = log_service
        
        auth_result = await connection.getauth()

        if auth_result:
            return jsonify({
                "credentials": auth_result,
                }), 200
        else:
            return jsonify({"message": "No records found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
@api.route("/logs/commands", methods=["GET"])
async def get_commands():
    try:
        db_service = Database(config=db_config)
        log_service = LogService(db=db_service)
        connection = log_service
        
        auth_result = await connection.getactions()

        if auth_result:
            return jsonify({
                "actions": auth_result,
                }), 200
        else:
            return jsonify({"message": "No records found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
    
    
@api.route("/logs/sessions", methods=["GET"])
async def get_sessions():
    try:
        db_service = Database(config=db_config)
        log_service = LogService(db=db_service)
        connection = log_service
        
        auth_result = await connection.getsessions()

        if auth_result:
            return jsonify({
                "sessions": auth_result,
                }), 200
        else:
            return jsonify({"message": "No records found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    
@api.route("/logs/fingerprints", methods=["GET"])
async def get_fingerprints():
    try:
        db_service = Database(config=db_config)
        log_service = LogService(db=db_service)
        connection = log_service
        
        auth_result = await connection.getfingerprints()

        if auth_result:
            return jsonify({
                "fingerprints": auth_result,
                }), 200
        else:
            return jsonify({"message": "No records found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    