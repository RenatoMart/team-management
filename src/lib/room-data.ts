import { cache } from 'react';
import { db } from './db';
import { mockBoard } from './mock-board';

const ROOM_INCLUDE = {
	members: { include: { user: true } },
	columns: {
		orderBy: { order: 'asc' as const },
		include: {
			tasks: {
				orderBy: { order: 'asc' as const },
				include: { assignee: true },
			},
		},
	},
	deliverables: {
		include: { uploadedBy: true },
		orderBy: { uploadedAt: 'desc' as const },
	},
};

export const getRoom = cache(async (roomId: string) => {
	if (process.env.DEMO_MODE === 'true') {
		return mockBoard.id === roomId ? mockBoard : null;
	}

	return db.room.findUnique({ where: { id: roomId }, include: ROOM_INCLUDE });
});

export async function getRoomsForUser(userId: string) {
	if (process.env.DEMO_MODE === 'true') {
		return mockBoard.members.some(m => m.userId === userId) ? [mockBoard] : [];
	}

	return db.room.findMany({
		where: { members: { some: { userId } } },
		include: ROOM_INCLUDE,
		orderBy: { createdAt: 'asc' },
	});
}
