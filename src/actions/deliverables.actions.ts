'use server';

import { getCurrentUser } from '@/lib/current-user';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { randomUUID } from 'node:crypto';
import { mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';

export async function uploadDeliverable(roomId: string, formData: FormData) {
	const file = formData.get('file');
	if (!(file instanceof File) || file.size === 0) {
		throw new Error('Selecciona un archivo para subir.');
	}

	const user = await getCurrentUser();
	const rawTitle = formData.get('title');
	const title =
		typeof rawTitle === 'string' && rawTitle.trim()
			? rawTitle.trim()
			: file.name;

	const extension = path.extname(file.name);
	const fileName = `${randomUUID()}${extension}`;
	const uploadDir = path.join(process.cwd(), 'public', 'uploads', roomId);
	await mkdir(uploadDir, { recursive: true });

	const buffer = Buffer.from(await file.arrayBuffer());
	await writeFile(path.join(uploadDir, fileName), buffer);

	await db.deliverable.create({
		data: {
			title,
			fileUrl: `/uploads/${roomId}/${fileName}`,
			fileType: extension.replace('.', '') || null,
			roomId,
			uploadedById: user.id,
		},
	});

	revalidatePath(`/rooms/${roomId}/deliverables`);
	revalidatePath(`/rooms/${roomId}/board`);
}
