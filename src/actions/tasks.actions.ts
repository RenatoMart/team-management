'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function moveTask(
	taskId: string,
	toColumnId: string,
	toIndex: number,
	roomId: string,
) {
	const task = await db.task.findUniqueOrThrow({ where: { id: taskId } });

	await db.$transaction(async tx => {
		const destinationTasks = await tx.task.findMany({
			where: { columnId: toColumnId, id: { not: taskId } },
			orderBy: { order: 'asc' },
		});

		destinationTasks.splice(toIndex, 0, task);

		await Promise.all(
			destinationTasks.map((t, index) =>
				tx.task.update({
					where: { id: t.id },
					data: { order: index, columnId: toColumnId },
				}),
			),
		);
	});

	revalidatePath(`/rooms/${roomId}/board`);
}
