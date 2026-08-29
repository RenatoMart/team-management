import type { Prisma } from '@prisma/client';

export type BoardRoom = Prisma.RoomGetPayload<{
	include: {
		members: { include: { user: true } };
		columns: {
			include: {
				tasks: { include: { assignee: true } };
			};
		};
		deliverables: { include: { uploadedBy: true } };
	};
}>;

export type BoardColumn = BoardRoom['columns'][number];
export type BoardTask = BoardColumn['tasks'][number];
export type BoardMember = BoardRoom['members'][number];
export type BoardDeliverable = BoardRoom['deliverables'][number];
