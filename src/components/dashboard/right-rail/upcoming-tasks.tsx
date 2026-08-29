import { PriorityBadge } from '@/components/board/priority-badge';
import type { BoardColumn } from '@/lib/board-types';
import { formatShortDate } from '@/lib/format';

export function UpcomingTasks({ columns }: { columns: BoardColumn[] }) {
	const upcoming = columns
		.filter(c => c.name !== 'Hecho')
		.flatMap(c => c.tasks)
		.filter(t => t.dueDate)
		.sort(
			(a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime(),
		)
		.slice(0, 5);

	return (
		<div className='border-border bg-surface rounded-2xl border p-5'>
			<div className='flex items-center justify-between'>
				<h2 className='text-ink text-sm font-semibold'>
					Próximos vencimientos
				</h2>
			</div>
			<ul className='mt-4 space-y-3'>
				{upcoming.map(task => (
					<li key={task.id} className='flex items-center gap-3'>
						<span className='text-ink-soft w-12 shrink-0 font-mono text-xs font-medium'>
							{formatShortDate(new Date(task.dueDate!))}
						</span>
						<span className='text-ink min-w-0 flex-1 truncate text-sm font-medium'>
							{task.title}
						</span>
						<PriorityBadge priority={task.priority} />
					</li>
				))}
				{upcoming.length === 0 ? (
					<li className='text-ink-faint text-sm'>
						No hay tareas con fecha próxima.
					</li>
				) : null}
			</ul>
		</div>
	);
}
