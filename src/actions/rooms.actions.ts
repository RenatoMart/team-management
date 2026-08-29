'use server';

import { getCurrentUser } from '@/lib/current-user';
import { db } from '@/lib/db';
import { redirect } from 'next/navigation';

const DEFAULT_COLUMNS = ['Por hacer', 'En progreso', 'En revisión', 'Hecho'];

export async function createRoom(formData: FormData) {
	const name = (formData.get('name') as string)?.trim();
	if (!name) {
		throw new Error('Ponle un nombre a la sala.');
	}

	const description = (formData.get('description') as string)?.trim() || null;
	const examDateRaw = formData.get('examDate') as string;
	const examDate = examDateRaw ? new Date(examDateRaw) : null;

	const user = await getCurrentUser();

	const room = await db.room.create({
		data: {
			name,
			description,
			examDate,
			members: { create: { userId: user.id, role: 'OWNER' } },
			columns: {
				create: DEFAULT_COLUMNS.map((columnName, order) => ({
					name: columnName,
					order,
				})),
			},
		},
	});

	redirect(`/rooms/${room.id}/resumen`);
}
