import type { BoardRoom } from '@/lib/board-types';
import { daysUntil } from '@/lib/format';
import { TONE_BADGE_CLASS, urgencyTone } from '@/lib/urgency';
import Link from 'next/link';
import { UserAvatar } from './user-avatar';

export function RoomCard({ room }: { room: BoardRoom }) {
	const allTasks = room.columns.flatMap(c => c.tasks);
	const total = allTasks.length;
	const done = room.columns.find(c => c.name === 'Hecho')?.tasks.length ?? 0;
	const progress = total > 0 ? Math.round((done / total) * 100) : 0;
	const days = room.examDate ? daysUntil(new Date(room.examDate)) : null;
	const toneClass = TONE_BADGE_CLASS[urgencyTone(days)];

	return (
		<Link
			href={`/rooms/${room.id}/resumen`}
			className='group border-border bg-surface hover:border-brand block rounded-2xl border p-5 transition-[transform,box-shadow,border-color] duration-150 ease-out hover:-translate-y-0.5 hover:shadow-md'
		>
			<div className='flex items-start justify-between gap-3'>
				<div className='min-w-0'>
					<h3 className='text-ink group-hover:text-brand truncate text-base font-semibold transition-colors'>
						{room.name}
					</h3>
					{room.description ? (
						<p className='text-ink-soft mt-1 line-clamp-2 text-sm'>
							{room.description}
						</p>
					) : null}
				</div>
			</div>

			{days !== null ? (
				<span
					className={[
						'mt-3 inline-flex items-center gap-1.5 rounded-full px-2.5 py-1',
						'font-mono text-xs font-semibold',
						toneClass,
					].join(' ')}
				>
					<span className='size-1.5 rounded-full bg-current' />
					{days >= 0 ? `Faltan ${days} días` : 'Sustentación realizada'}
				</span>
			) : null}

			<div className='mt-4'>
				<div className='text-ink-soft flex items-center justify-between text-xs'>
					<span>Avance</span>
					<span className='font-mono font-medium'>
						{done}/{total} tareas
					</span>
				</div>
				<div className='bg-surface-muted mt-1.5 h-2 overflow-hidden rounded-full'>
					<div
						className='bg-brand h-full rounded-full'
						style={{ width: `${progress}%` }}
					/>
				</div>
			</div>

			<div className='mt-4 flex items-center justify-between'>
				<div className='flex -space-x-2'>
					{room.members.slice(0, 4).map(m => (
						<span key={m.id} className='ring-surface rounded-full ring-2'>
							<UserAvatar name={m.user.name} size={28} />
						</span>
					))}
				</div>
				<span className='text-brand text-sm font-medium'>Entrar →</span>
			</div>
		</Link>
	);
}
