import type { BoardColumn } from '@/lib/board-types';

export function PriorityOverview({ columns }: { columns: BoardColumn[] }) {
	const tasks = columns.flatMap(c => c.tasks);
	const high = tasks.filter(t => t.priority === 'HIGH').length;
	const medium = tasks.filter(t => t.priority === 'MEDIUM').length;
	const low = tasks.filter(t => t.priority === 'LOW').length;
	const total = tasks.length || 1;

	return (
		<div className='border-border bg-surface rounded-2xl border p-5'>
			<h2 className='text-ink text-sm font-semibold'>Resumen por prioridad</h2>
			<div className='mt-4 grid grid-cols-3 gap-2'>
				<div className='bg-high-soft rounded-xl p-3 text-center'>
					<p className='text-high text-xs font-semibold'>Alta</p>
					<p className='text-high font-mono text-xl font-bold'>{high}</p>
				</div>
				<div className='bg-medium-soft rounded-xl p-3 text-center'>
					<p className='text-medium text-xs font-semibold'>Media</p>
					<p className='text-medium font-mono text-xl font-bold'>{medium}</p>
				</div>
				<div className='bg-low-soft rounded-xl p-3 text-center'>
					<p className='text-low text-xs font-semibold'>Baja</p>
					<p className='text-low font-mono text-xl font-bold'>{low}</p>
				</div>
			</div>
			<div className='mt-4 flex h-2 overflow-hidden rounded-full'>
				<div
					className='bg-high h-full'
					style={{ width: `${(high / total) * 100}%` }}
				/>
				<div
					className='bg-medium h-full'
					style={{ width: `${(medium / total) * 100}%` }}
				/>
				<div
					className='bg-low h-full'
					style={{ width: `${(low / total) * 100}%` }}
				/>
			</div>
			<p className='text-ink-faint mt-2 text-xs'>
				Total: {tasks.length} tareas
			</p>
		</div>
	);
}
