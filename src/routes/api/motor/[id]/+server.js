import { json } from '@sveltejs/kit';
import db from '$lib/db';

export async function PUT({ params, request }) {
	const { id } = params;

	try {
		const { nama, plat, jenis, biaya } = await request.json();

		const [result] = await db.execute(
			`UPDATE motor
			 SET nama = ?,
			     plat = ?,
			     jenis = ?,
			     biaya = ?
			 WHERE id = ?`,
			[nama, plat, jenis, biaya, id]
		);

		return json({
			success: true,
			result
		});
	} catch (error) {
		console.error(error);

		return json(
			{
				success: false,
				error: error.message
			},
			{ status: 500 }
		);
	}
}

export async function DELETE({ params }) {
	const { id } = params;

	try {
		await db.execute(
			'DELETE FROM motor WHERE id = ?',
			[id]
		);

		return json({
			success: true
		});
	} catch (error) {
		console.error(error);

		return json(
			{
				success: false,
				error: error.message
			},
			{ status: 500 }
		);
	}
}