import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

const db = mysql.createPool({
	host: env.MYSQL_HOST,
	port: Number(env.MYSQL_PORT),
	user: env.MYSQL_USER,
	password: env.MYSQL_PASSWORD,
	database: env.MYSQL_DATABASE,
	waitForConnections: true,
	connectionLimit: 10
});

export default db;