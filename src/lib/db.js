import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

const db = mysql.createPool({
	host: env.MYSQL_HOST,
	port: Number(env.MYSQL_PORT),
	user: env.MYSQL_USER,
	password: env.MYSQL_PASSWORD,
	database: env.MYSQL_DATABASE
});

try {
	const conn = await db.getConnection();
	console.log('MYSQL CONNECTED');
	conn.release();
} catch (err) {
	console.error('MYSQL ERROR:', err);
}

export default db;