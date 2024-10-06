from quart import Quart, request, jsonify
import jwt
import asyncio
import aiomysql
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import os
from . import api


SECRET_KEY = os.getenv('SECRET_KEY', 'supersecretdevelopmentkey')



db_config = {
    'user': 'root',            
    'password': 'Vaibhavv17',   
    'host': 'localhost',        
    'db': 'rebound',
    'port':3307,              
}


async def get_db_connection():
    return await aiomysql.connect(
        user=db_config['user'],
        password=db_config['password'],
        host=db_config['host'],
        db=db_config['db'],
        port=db_config['port'],
    )


def generate_jwt(username):
    payload = {
        'username': username,
        'exp': datetime.utcnow() + timedelta(hours=1)  # Token expires in 1 hour
    }
    token = jwt.encode(payload, SECRET_KEY, algorithm='HS256')
    return token


def verify_jwt(token):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=['HS256'])
        return payload['username']
    except jwt.ExpiredSignatureError:
        return None
    except jwt.InvalidTokenError:
        return None


@api.route('/signup', methods=['POST'])
async def signup():
    data = await request.get_json()
    username = data.get('username')
    password = data.get('password')

   
    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400

    
    conn = await get_db_connection()
    async with conn.cursor() as cursor:
        
        await cursor.execute("SELECT username FROM users WHERE username=%s", (username,))
        result = await cursor.fetchone()
        if result:
            return jsonify({'message': 'User already exists'}), 400

        
        hashed_password = generate_password_hash(password)
        await cursor.execute("INSERT INTO users (username, password) VALUES (%s, %s)", (username, hashed_password))
        await conn.commit()

    conn.close()  
    return jsonify({'message': f'User {username} registered successfully!'}), 201

@api.route('/login', methods=['POST'])
async def login():
    data = await request.get_json()
    username = data.get('username')
    password = data.get('password')

    
    if not username or not password:
        return jsonify({'message': 'Username and password required'}), 400

    
    conn = await get_db_connection()
    async with conn.cursor() as cursor:
        
        await cursor.execute("SELECT password FROM users WHERE username=%s", (username,))
        result = await cursor.fetchone()
        if result is None:
            return jsonify({'message': 'User does not exist'}), 404

        stored_password = result[0]
        
        if not check_password_hash(stored_password, password):
            return jsonify({'message': 'Incorrect password'}), 401

    conn.close()  
    
    token = generate_jwt(username)
    return jsonify({'message': f'User {username} logged in successfully!', 'token': token}), 200


@api.route('/protected', methods=['GET'])
async def protected():
    auth_header = request.headers.get('Authorization')

    if not auth_header:
        return jsonify({'message': 'Missing token'}), 403

    token = auth_header.split(" ")[1]  
    username = verify_jwt(token)

    if not username:
        return jsonify({'message': 'Invalid or expired token'}), 403

    return jsonify({'message': f'Welcome {username}! You are authenticated!'}), 200
 