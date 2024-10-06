CREATE DATABASE cowrie;
GRANT ALL ON cowrie.* TO 'cowrie'@'%' IDENTIFIED BY 'secret';
FLUSH PRIVILEGES;
USE cowrie;
source /cowrie-sql/mysql.sql;
