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
import requests
import aiohttp
import asyncio
from collections import defaultdict, Counter
db_config = db_config_cowrie



@api.route("/stats/login-attempts", methods=["GET"])
async def get_login_attempts_stats():
    try:
        db_service = Database(config=db_config)
        log_service = LogService(db=db_service)
        
        # Total login attempts
        auth_result = await log_service.getauth()
        total_attempts = len(auth_result)
        
        # Successful authentications
        successful_attempts = sum(1 for record in auth_result if record["success"] == 1)
        
        # Unique attackers based on session/IP or username
        unique_attackers = len(set(record["username"] for record in auth_result))
        
        # Construct response
        stats = {
            "total_login_attempts": total_attempts,
            "successful_authentications": successful_attempts,
            "unique_attackers": unique_attackers
        }
        return jsonify(stats), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@api.route("/stats/geographical-attack-map", methods=["GET"])
async def get_geographical_attack_map():
    try:
        db_service = Database(config=db_config)
        log_service = LogService(db=db_service)
        
        session_data = await log_service.getsessions()
        ips = [session["ip"] for session in session_data]
        ips = [ips[0], ips[1]]
        
        # Run get_geo_data for all IPs concurrently
        geo_data = await asyncio.gather(*(get_geo_data(ip) for ip in set(ips)))
        
        # Group IPs by country
        country_ip_map = defaultdict(lambda: {"count": 0, "ips": []})
        
        for entry in geo_data:
            country = entry.get("country", "Unknown")
            ip = entry["ip"]
            if country != "Unknown":
                country_ip_map[country]["count"] += 1
                country_ip_map[country]["ips"].append(ip)
        
        return jsonify({"geographical_attack_map": country_ip_map}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

@api.route("/stats/top-credentials", methods=["GET"])
async def get_top_credentials():
    try:
        db_service = Database(config=db_config)
        log_service = LogService(db=db_service)
        
        auth_result = await log_service.getauth()
        credentials = [(record["username"], record["password"]) for record in auth_result]
        
        credential_counts = Counter(credentials)
        top_credentials = credential_counts.most_common(6)  # Top 5 credentials
        
        final = []
        
        for cred in top_credentials:
            final.append({
                "username": cred[0][0],
                "password": cred[0][1],
                "count": cred[1]
            })
        
        return jsonify({"top_credentials": final}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@api.route("/stats/recent-sessions", methods=["GET"])
async def get_recent_sessions():
    try:
        db_service = Database(config=db_config)
        log_service = LogService(db=db_service)
        
        # Get last 5 sessions
        session_result = await log_service.getsessions(limit=5)  # Implement limit in LogService
        return jsonify({"recent_sessions": session_result}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@api.route("/stats/command-frequency", methods=["GET"])
async def get_command_frequency():
    try:
        db_service = Database(config=db_config)
        log_service = LogService(db=db_service)
        
        commands = await log_service.getactions()
        command_texts = [command["input"] for command in commands]
        
        command_counts = Counter(command_texts)
        most_frequent_commands = command_counts.most_common(10)  # Top 10 commands
        
        final = []
        for command in most_frequent_commands:
            final.append({
                "command": command[0],
                "count": command[1]
            })
            
        return jsonify({"command_frequency": final}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500
       
async def get_geo_data(ip):
    api_key = os.environ.get("IPSTACK_API_KEY")
    if not api_key:
        return {"ip": ip, "error": "API key missing"}

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(f"http://api.ipstack.com/{ip}?access_key={api_key}") as response:
                data = await response.json()
                
                return {
                    "ip": ip,
                    "country": data.get("country_name", "Unknown")
                }

    except Exception as e:
        print(f"Error fetching data for IP {ip}: {e}")
        return {"ip": ip, "error": "Could not retrieve data"}
    api_key = os.environ.get("IPSTACK_API_KEY")
    if not api_key:
        return {"ip": ip, "error": "API key missing"}

    try:
        async with aiohttp.ClientSession() as session:
            async with session.get(f"http://api.ipstack.com/{ip}?access_key={api_key}") as response:
                data = await response.json()
                
                return {
                    "ip": ip,
                    "country": data.get("country_name", "Unknown")
                }

    except Exception as e:
        print(f"Error fetching data for IP {ip}: {e}")
        return {"ip": ip, "error": "Could not retrieve data"}