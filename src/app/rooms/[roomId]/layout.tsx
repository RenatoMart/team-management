import { DashboardShell } from '@/components/dashboard/dashboard-shell';
import { Sidebar } from '@/components/dashboard/sidebar';
import { getCurrentUser } from '@/lib/current-user';
import { getRoom } from '@/lib/room-data';
import { notFound } from 'next/navigation';

export default async function RoomLayout({
	children,
	params,
}: {
	children: React.ReactNode;
	params: Promise<{ roomId: string }>;
}) {
	const { roomId } = await params;
	const [room, user] = await Promise.all([getRoom(roomId), getCurrentUser()]);

	if (!room) notFound();

	return (
		<DashboardShell
			mobileLabel={room.name}
			sidebar={
				<Sidebar
					roomId={room.id}
					roomName={room.name}
					currentUserName={user.name}
				/>
			}
		>
			{children}
		</DashboardShell>
	);
}
