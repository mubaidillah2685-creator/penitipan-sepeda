import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

const db = mysql.createPool({
	host: env.MYSQLHOST,
	port: Number(env.MYSQLPORT),
	user: env.MYSQLUSER,
	password: env.MYSQLPASSWORD,
	database: env.MYSQLDATABASE,
	waitForConnections: true,
	connectionLimit: 10
});

export default db;