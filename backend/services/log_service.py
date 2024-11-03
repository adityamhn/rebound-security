from services.db import SQLiteDatabase
from werkzeug.security import generate_password_hash, check_password_hash
import datetime

# CREATE TABLE IF NOT EXISTS `sessions` (
#   `id` char(32) NOT NULL,
#   `starttime` datetime NOT NULL,
#   `endtime` datetime default NULL,
#   `sensor` int(4) NOT NULL,
#   `ip` varchar(15) NOT NULL default '',
#   `termsize` varchar(7) default NULL,
#   `client` int(4) default NULL,
#   PRIMARY KEY  (`id`),
#   KEY `starttime` (`starttime`,`sensor`)
# ) ;


class LogService:
    def __init__(self, db):
        self.db = db

    async def getauth(self):
        conn = await self.db.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT * FROM auth ORDER BY timestamp DESC")
            result = await cursor.fetchall()  # Fetch all rows instead of just one
            data = []
            for row in result:
                id, session, success, username, password, timestamp = row
                data.append(
                    {
                        "id": id,
                        "success": success,
                        "session": session,
                        "username": username,
                        "password": password,
                        "timestamp": timestamp,
                    }
                )
            return data

    async def getactions(self):
        conn = await self.db.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT * FROM input ORDER BY timestamp DESC")
            result = await cursor.fetchall()  # Fetch all rows instead of just one
            data = []
            for row in result:
                id, session, timestamp, realm, success, input = row
                data.append(
                    {
                        "id": id,
                        "session": session,
                        "timestamp": timestamp,
                        "realm": realm,
                        "success": success,
                        "input": input,
                    }
                )
            return data

    async def getsessions(self,limit=None):
        conn = await self.db.get_connection()
        async with conn.cursor() as cursor:
            query = "SELECT * FROM sessions ORDER BY starttime DESC"
            if limit:
                query += f" LIMIT {limit}"
            await cursor.execute(query)
            result = await cursor.fetchall()
            data = []
            for row in result:
                id, starttime, endtime, sensor, ip, termsize, client = row
                
                async with conn.cursor() as cursor2:
                    await cursor2.execute(
                        "SELECT version FROM clients WHERE id=%s", (client,)
                    )
                    client_version = await cursor2.fetchone()
                    client = client_version[0] if client_version else None
                    
                data.append(
                    {
                        "id": id,
                        "starttime": starttime,
                        "endtime": endtime,
                        "sensor": sensor,
                        "ip": ip,
                        "termsize": termsize,
                        "client": client,
                    }
                )
                
        
            return data
        
    async def getfingerprints(self):
        conn = await self.db.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute("SELECT * FROM keyfingerprints ORDER BY id DESC")
            result = await cursor.fetchall()
            data = []
            for row in result:
                id, session, username, fingerprint = row
                data.append(
                    {
                        "id": id,
                        "session": session,
                        "username": username,
                        "fingerprint": fingerprint,
                    }
                )
                
            return data

class SQLiteLogService:
    def __init__(self, db=None):
        if db is None:
            self.db = SQLiteDatabase()
        else:
            self.db = SQLiteDatabase(db)

    async def getsessions(self):
        conn = await self.db.get_connection()
        async with conn.cursor() as cursor:
            await cursor.execute("select * from connections order by connection_timestamp desc")
            result = await cursor.fetchall()
            data = []
            for row in result:
                connection, connection_type, connection_transport, connection_protocol, connection_timestamp, connection_root, connection_parent, local_host, local_port, remote_host, remote_hostname,  remote_port= row
                data.append(
                    {
                        "id": "DIO" + str(connection),
                        "starttime": datetime.datetime.fromtimestamp(connection_timestamp),
                        "endtime": None,
                        "sensor": 1,
                        "ip": remote_host,
                        "termsize": None,
                        "client": connection_protocol,
                    }
                )
                
            return data
