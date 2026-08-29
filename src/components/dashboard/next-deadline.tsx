import type { BoardRoom } from '@/lib/board-types';
import { daysUntil } from '@/lib/format';
import { TONE_SOLID_CLASS, urgencyTone } from '@/lib/urgency';
import Link from 'next/link';

export function NextDeadline({ rooms }: { rooms: BoardRoom[] }) {
	const upcoming = rooms
		.filter(r => r.examDate)
		.map(r => ({ room: r, days: daysUntil(new Date(r.examDate!)) }))
		.filter(r => r.days >= 0)
		.sort((a, b) => a.days - b.days)[0];

	if (!upcoming) return null;

	const { room, days } = upcoming;
	const tone = urgencyTone(days);
	const dotClass = TONE_SOLID_CLASS[tone];

	return (
		<Link
			href={`/rooms/${room.id}/resumen`}
			className='border-border bg-surface hover:border-brand group flex flex-col gap-4 rounded-2xl border p-6 transition-colors sm:flex-row sm:items-center sm:justify-between'
		>
			<div className='flex items-center gap-5'>
				<div className='text-center'>
					<p className='text-ink font-mono text-4xl leading-none font-bold tabular-nums'>
						{days}
					</p>
					<p className='text-ink-faint mt-1 text-[11px] tracking-wide uppercase'>
						{days === 1 ? 'día' : 'días'}
					</p>
				</div>
				<div className='bg-border h-10 w-px' />
				<div className='min-w-0'>
					<p className='text-ink-soft flex items-center gap-1.5 text-xs font-medium'>
						<span className={`size-1.5 rounded-full ${dotClass}`} />
						Tu próxima sustentación
					</p>
					<p className='text-ink mt-0.5 truncate text-base font-semibold'>
						{room.name}
					</p>
				</div>
			</div>
			<span className='text-brand shrink-0 text-sm font-medium group-hover:underline'>
				Ver sala →
			</span>
		</Link>
	);
}
