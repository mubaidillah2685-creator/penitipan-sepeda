import { json } from '@sveltejs/kit';
import db from '$lib/db';

export async function DELETE({ params }) {
	const { id } = params;

	try {
		await db.execute(
			'DELETE FROM motor WHERE id = ?',
			[id]
		);

		return json({
			success: true,
			message: 'Data berhasil dihapus'
		});
	} catch (error) {
		console.error(error);

		return json(
			{
				success: false,
				message: 'Gagal menghapus data'
			},
			{ status: 500 }
		);
	}
}
