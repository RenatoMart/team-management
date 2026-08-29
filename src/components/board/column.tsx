'use client';

import type { BoardColumn } from '@/lib/board-types';
import { useDroppable } from '@dnd-kit/core';
import {
	SortableContext,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TaskCard } from './task-card';

const COLUMN_ACCENT: Record<string, string> = {
	'Por hacer': 'bg-ink-faint',
	'En progreso': 'bg-medium',
	'En revisión': 'bg-[var(--color-tag-estrategia)]',
	Hecho: 'bg-done',
};

export function Column({ column }: { column: BoardColumn }) {
	const { setNodeRef, isOver } = useDroppable({
		id: column.id,
		data: { columnId: column.id },
	});
	const accent = COLUMN_ACCENT[column.name] ?? 'bg-ink-faint';

	return (
		<div className='bg-surface-muted flex min-w-0 flex-col rounded-2xl p-3'>
			<div className='mb-3 flex items-center justify-between px-1'>
				<div className='flex items-center gap-2'>
					<span className={`size-2 rounded-full ${accent}`} />
					<h2 className='text-ink text-sm font-semibold'>{column.name}</h2>
				</div>
				<span className='bg-surface text-ink-soft rounded-md px-2 py-0.5 text-xs font-semibold'>
					{column.tasks.length}
				</span>
			</div>

			<div
				ref={setNodeRef}
				className={[
					'flex min-h-16 flex-1 flex-col gap-2 rounded-xl p-1 transition-colors',
					isOver ? 'bg-brand-soft/60' : '',
				].join(' ')}
			>
				<SortableContext
					items={column.tasks.map(t => t.id)}
					strategy={verticalListSortingStrategy}
				>
					{column.tasks.map(task => (
						<TaskCard key={task.id} task={task} />
					))}
				</SortableContext>
			</div>

			<button className='text-ink-faint hover:bg-surface hover:text-brand mt-2 rounded-lg px-2 py-1.5 text-left text-xs font-medium transition-colors'>
				+ Añadir tarea
			</button>
		</div>
	);
}
