import mysql from 'mysql2/promise';
import { env } from '$env/dynamic/private';

console.log('HOST =', env.MYSQLHOST);
console.log('PORT =', env.MYSQLPORT);
console.log('DB =', env.MYSQLDATABASE);

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