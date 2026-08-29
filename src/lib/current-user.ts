import { db } from './db';
import { mockBoard } from './mock-board';

const CURRENT_USER_EMAIL = 'reagui667@gmail.com';

export async function getCurrentUser() {
	if (process.env.DEMO_MODE === 'true') {
		return mockBoard.members[0].user;
	}

	return db.user.findUniqueOrThrow({ where: { email: CURRENT_USER_EMAIL } });
}
