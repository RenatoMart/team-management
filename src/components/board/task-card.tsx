'use client';

import { UserAvatar } from '@/components/dashboard/user-avatar';
import type { BoardTask } from '@/lib/board-types';
import { daysUntil, formatShortDate } from '@/lib/format';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { PriorityDot } from './priority-badge';
import { TagBadge } from './tag-badge';

export function TaskCard({ task }: { task: BoardTask }) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: task.id, data: { columnId: task.columnId } });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	const overdue =
		task.dueDate && daysUntil(new Date(task.dueDate)) < 0 ? true : false;

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...attributes}
			{...listeners}
			className={[
				'border-border bg-surface cursor-grab touch-none rounded-xl border p-3 shadow-sm',
				'transition-shadow duration-150 ease-out hover:shadow-md active:cursor-grabbing',
				isDragging ? 'opacity-40' : '',
			].join(' ')}
		>
			<div className='flex items-start justify-between gap-2'>
				<div className='flex items-center gap-1.5'>
					<PriorityDot priority={task.priority} />
					<p className='text-ink text-sm font-semibold'>{task.title}</p>
				</div>
			</div>

			{task.tag ? (
				<div className='mt-2'>
					<TagBadge tag={task.tag} />
				</div>
			) : null}

			<div className='mt-3 flex items-center justify-between'>
				<span
					className={`font-mono text-xs ${overdue ? 'text-high font-semibold' : 'text-ink-faint'}`}
				>
					{task.dueDate ? formatShortDate(new Date(task.dueDate)) : 'Sin fecha'}
				</span>
				{task.assignee ? (
					<UserAvatar name={task.assignee.name} size={22} />
				) : null}
			</div>
		</div>
	);
}
