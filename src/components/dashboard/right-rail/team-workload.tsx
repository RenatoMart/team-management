import { UserAvatar } from '@/components/dashboard/user-avatar';
import type { BoardColumn, BoardMember } from '@/lib/board-types';

export function TeamWorkload({
	members,
	columns,
}: {
	members: BoardMember[];
	columns: BoardColumn[];
}) {
	const activeTasks = columns
		.filter(c => c.name !== 'Hecho')
		.flatMap(c => c.tasks);
	const maxLoad = Math.max(
		1,
		...members.map(
			m => activeTasks.filter(t => t.assigneeId === m.userId).length,
		),
	);

	return (
		<div className='border-border bg-surface rounded-2xl border p-5'>
			<h2 className='text-ink text-sm font-semibold'>Carga del equipo</h2>
			<p className='text-ink-soft text-xs'>Tareas activas por integrante</p>
			<ul className='mt-4 space-y-3'>
				{members.map(m => {
					const count = activeTasks.filter(
						t => t.assigneeId === m.userId,
					).length;
					const pct = Math.round((count / maxLoad) * 100);
					return (
						<li key={m.id} className='flex items-center gap-3'>
							<UserAvatar name={m.user.name} size={26} />
							<span className='text-ink w-28 shrink-0 truncate text-sm'>
								{m.user.name}
							</span>
							<div className='bg-surface-muted h-2 flex-1 overflow-hidden rounded-full'>
								<div
									className='bg-brand h-full rounded-full'
									style={{ width: `${pct}%` }}
								/>
							</div>
							<span className='text-ink-soft w-6 shrink-0 text-right font-mono text-xs'>
								{count}
							</span>
						</li>
					);
				})}
			</ul>
		</div>
	);
}
