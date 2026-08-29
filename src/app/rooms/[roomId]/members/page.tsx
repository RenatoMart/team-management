import { MemberCard } from '@/components/dashboard/member-card';
import { Reveal } from '@/components/motion/reveal';
import { getRoom } from '@/lib/room-data';
import { notFound } from 'next/navigation';

export default async function MembersPage({
	params,
}: {
	params: Promise<{ roomId: string }>;
}) {
	const { roomId } = await params;
	const room = await getRoom(roomId);

	if (!room) notFound();

	return (
		<div className='flex flex-col gap-6'>
			<div className='flex flex-wrap items-center justify-between gap-4'>
				<div>
					<h1 className='text-ink text-2xl font-bold tracking-tight'>Equipo</h1>
					<p className='text-ink-soft mt-1 text-sm'>
						Quiénes están en esta sala
					</p>
				</div>
				<button className='bg-brand hover:bg-brand-dark rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors'>
					Copiar código de invitación
				</button>
			</div>

			<Reveal className='flex flex-col gap-3'>
				{room.members.map(member => (
					<MemberCard key={member.id} member={member} columns={room.columns} />
				))}
			</Reveal>
		</div>
	);
}
