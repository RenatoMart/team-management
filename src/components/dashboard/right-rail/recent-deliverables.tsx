import { UserAvatar } from '@/components/dashboard/user-avatar';
import type { BoardDeliverable } from '@/lib/board-types';

function timeAgo(date: Date): string {
	const minutes = Math.round((Date.now() - date.getTime()) / 60000);
	if (minutes < 60) return `hace ${minutes} min`;
	const hours = Math.round(minutes / 60);
	if (hours < 24) return `hace ${hours} h`;
	const days = Math.round(hours / 24);
	return `hace ${days} d`;
}

export function RecentDeliverables({
	deliverables,
}: {
	deliverables: BoardDeliverable[];
}) {
	const recent = [...deliverables]
		.sort((a, b) => b.uploadedAt.getTime() - a.uploadedAt.getTime())
		.slice(0, 4);

	return (
		<div className='border-border bg-surface rounded-2xl border p-5'>
			<h2 className='text-ink text-sm font-semibold'>
				Últimos avances subidos
			</h2>
			<ul className='mt-4 space-y-4'>
				{recent.map(d => (
					<li key={d.id} className='flex items-start gap-3'>
						<UserAvatar name={d.uploadedBy.name} size={28} />
						<div className='min-w-0'>
							<p className='text-ink truncate text-sm'>
								<span className='font-semibold'>{d.uploadedBy.name}</span> subió{' '}
								<a
									href={d.fileUrl}
									target='_blank'
									rel='noreferrer'
									className='text-brand font-medium hover:underline'
								>
									{d.title}
								</a>
							</p>
							<p className='text-ink-faint mt-0.5 font-mono text-xs'>
								{timeAgo(d.uploadedAt)}
							</p>
						</div>
					</li>
				))}
				{recent.length === 0 ? (
					<li className='text-ink-faint text-sm'>
						Aún no se han subido avances.
					</li>
				) : null}
			</ul>
		</div>
	);
}
