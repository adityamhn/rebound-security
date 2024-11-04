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
from services.log_service import LogService, SQLiteLogService
from services.db import Database, db_config_cowrie

db_config = db_config_cowrie

@api.route("/logs/credentials", methods=["GET"])
async def get_credentials():
    try:
        db_service = Database(config=db_config)
        log_service = LogService(db=db_service)
        connection = log_service
        log_service_2 = SQLiteLogService()
        
        auth_result_1 = await connection.getauth()
        auth_result_2 = await log_service_2.getcreds()
        
        auth_result = auth_result_1 + auth_result_2

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
        
        log_service_2 = SQLiteLogService()

        
        auth_result_1 = await connection.getsessions()
        auth_result_2 = await log_service_2.getsessions()
        
        auth_result = auth_result_1 + auth_result_2
        if auth_result:
            
            auth_result = sorted(auth_result, key=lambda x: x["starttime"], reverse=True)
            
            
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
    
    
@api.route("/logs/http", methods=["GET"])
async def get_http():
    try:
        db_service = Database()
        log_service = LogService(db=db_service)
        connection = log_service
        
        auth_result = await connection.gethttp()

        if auth_result:
            return jsonify({
                "requests": auth_result,
                }), 200
        else:
            return jsonify({"message": "No records found"}), 404

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    