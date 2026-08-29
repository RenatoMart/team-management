import { Board } from '@/components/board/board';
import { BoardToolbar } from '@/components/board/board-toolbar';
import { getRoom } from '@/lib/room-data';
import { notFound } from 'next/navigation';

export default async function BoardPage({
	params,
}: {
	params: Promise<{ roomId: string }>;
}) {
	const { roomId } = await params;
	const room = await getRoom(roomId);

	if (!room) notFound();

	return (
		<div className='flex flex-col gap-6'>
			<BoardToolbar />
			<Board roomId={room.id} columns={room.columns} />
		</div>
	);
}
