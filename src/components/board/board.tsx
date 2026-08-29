'use client';

import { moveTask } from '@/actions/tasks.actions';
import { Reveal } from '@/components/motion/reveal';
import type { BoardColumn } from '@/lib/board-types';
import {
	DndContext,
	PointerSensor,
	closestCorners,
	useSensor,
	useSensors,
	type DragEndEvent,
} from '@dnd-kit/core';
import { useOptimistic, useTransition } from 'react';
import { Column } from './column';

type MoveAction = {
	taskId: string;
	fromColumnId: string;
	toColumnId: string;
	toIndex: number;
};

function applyMove(columns: BoardColumn[], action: MoveAction): BoardColumn[] {
	const next = columns.map(c => ({ ...c, tasks: [...c.tasks] }));
	const fromCol = next.find(c => c.id === action.fromColumnId);
	const toCol = next.find(c => c.id === action.toColumnId);
	if (!fromCol || !toCol) return columns;

	const taskIndex = fromCol.tasks.findIndex(t => t.id === action.taskId);
	if (taskIndex === -1) return columns;

	const [task] = fromCol.tasks.splice(taskIndex, 1);
	toCol.tasks.splice(action.toIndex, 0, {
		...task,
		columnId: action.toColumnId,
	});
	return next;
}

export function Board({
	roomId,
	columns,
}: {
	roomId: string;
	columns: BoardColumn[];
}) {
	const [optimisticColumns, dispatchMove] = useOptimistic(columns, applyMove);
	const [, startTransition] = useTransition();
	const sensors = useSensors(
		useSensor(PointerSensor, { activationConstraint: { distance: 6 } }),
	);

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event;
		if (!over) return;

		const taskId = String(active.id);
		const fromColumnId = active.data.current?.columnId as string | undefined;
		const overColumnId =
			(over.data.current?.columnId as string | undefined) ?? String(over.id);
		if (!fromColumnId || !overColumnId) return;

		const destColumn = optimisticColumns.find(c => c.id === overColumnId);
		if (!destColumn) return;

		let toIndex = destColumn.tasks.findIndex(t => t.id === over.id);
		if (toIndex === -1) toIndex = destColumn.tasks.length;
		if (fromColumnId === overColumnId) {
			const currentIndex = destColumn.tasks.findIndex(t => t.id === taskId);
			if (currentIndex === toIndex) return;
		}

		startTransition(async () => {
			dispatchMove({ taskId, fromColumnId, toColumnId: overColumnId, toIndex });
			await moveTask(taskId, overColumnId, toIndex, roomId);
		});
	}

	return (
		<DndContext
			id={`board-${roomId}`}
			sensors={sensors}
			collisionDetection={closestCorners}
			onDragEnd={handleDragEnd}
		>
			<Reveal
				className='grid auto-cols-[minmax(240px,1fr)] grid-flow-col gap-4 overflow-x-auto px-4 pb-2 sm:px-0'
				y={8}
				staggerMs={60}
			>
				{optimisticColumns.map(column => (
					<Column key={column.id} column={column} />
				))}
			</Reveal>
		</DndContext>
	);
}
