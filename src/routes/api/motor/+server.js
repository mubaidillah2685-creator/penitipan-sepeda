import { json } from '@sveltejs/kit';
import pool from '$lib/db';

export async function GET() {
	try {
		const [rows] = await pool.query(
			'SELECT * FROM motor'
		);

		return json(rows);
	} catch (error) {
		console.log(error);
		const message = error instanceof Error ? error.message : String(error);

		return json({
			error: message
		});
	}
}

/** @param {import('@sveltejs/kit').RequestEvent} event */
export async function POST({ request }) {
	try {
		const {
			nama,
			plat,
			jenis,
			biaya
		} = await request.json();

		await pool.query(
			`INSERT INTO motor
			(nama, plat, jenis, biaya)
			VALUES (?, ?, ?, ?)`,
			[nama, plat, jenis, biaya]
		);

		return json({
			success: true
		});
	} catch (error) {
		console.log(error);

		return json({
			error: error instanceof Error ? error.message : String(error)
		});
	}
}