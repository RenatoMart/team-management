import { CreateRoomCard } from '@/components/dashboard/create-room-card';
import { GlobalTopbar } from '@/components/dashboard/global-topbar';
import { NextDeadline } from '@/components/dashboard/next-deadline';
import { RoomCard } from '@/components/dashboard/room-card';
import { Reveal } from '@/components/motion/reveal';
import { getCurrentUser } from '@/lib/current-user';
import { getRoomsForUser } from '@/lib/room-data';

export default async function HomePage() {
	const user = await getCurrentUser();
	const rooms = await getRoomsForUser(user.id);

	return (
		<div className='bg-canvas min-h-screen'>
			<GlobalTopbar currentUserName={user.name} />

			<div className='mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8'>
				<div>
					<h1 className='text-ink text-2xl font-bold tracking-tight'>
						Hola, {user.name}
					</h1>
					<p className='text-ink-soft mt-1 text-sm'>
						Esto es lo que tienes por delante en tus salas de proyecto.
					</p>
				</div>

				{rooms.length > 0 ? (
					<div className='mt-6'>
						<NextDeadline rooms={rooms} />
					</div>
				) : null}

				<div className='mt-8 flex items-center justify-between'>
					<h2 className='text-ink text-base font-semibold'>
						Tus salas{rooms.length > 0 ? ` (${rooms.length})` : ''}
					</h2>
				</div>

				<Reveal
					className='mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3'
					staggerMs={60}
				>
					{rooms.map(room => (
						<RoomCard key={room.id} room={room} />
					))}
					<CreateRoomCard />
				</Reveal>
			</div>
		</div>
	);
}
