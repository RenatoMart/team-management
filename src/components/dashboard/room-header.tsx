import { daysUntil } from '@/lib/format';
import { TONE_BADGE_CLASS, urgencyTone } from '@/lib/urgency';

export function RoomHeader({
	roomName,
	examDate,
}: {
	roomName: string;
	examDate: Date | null;
}) {
	const days = examDate ? daysUntil(examDate) : null;
	const toneClass = TONE_BADGE_CLASS[urgencyTone(days)];

	return (
		<div>
			<div className='flex flex-wrap items-center gap-3'>
				<h1 className='text-ink text-2xl font-bold tracking-tight'>
					{roomName}
				</h1>
				{days !== null ? (
					<span
						className={[
							'inline-flex items-center gap-1.5 rounded-full px-3 py-1',
							'font-mono text-xs font-semibold',
							toneClass,
						].join(' ')}
					>
						<span className='size-1.5 rounded-full bg-current' />
						{days >= 0
							? `Faltan ${days} días para la sustentación`
							: 'Sustentación realizada'}
					</span>
				) : null}
			</div>
			<p className='text-ink-soft mt-1 text-sm'>
				Así va el equipo con los entregables de esta sala.
			</p>
		</div>
	);
}
