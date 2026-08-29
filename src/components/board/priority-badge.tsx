import type { Priority } from '@prisma/client';

const PRIORITY_LABEL: Record<Priority, string> = {
	HIGH: 'Alta',
	MEDIUM: 'Media',
	LOW: 'Baja',
};

const PRIORITY_CLASS: Record<Priority, string> = {
	HIGH: 'bg-high-soft text-high',
	MEDIUM: 'bg-medium-soft text-medium',
	LOW: 'bg-low-soft text-low',
};

export function PriorityBadge({ priority }: { priority: Priority }) {
	return (
		<span
			className={[
				'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold',
				PRIORITY_CLASS[priority],
			].join(' ')}
		>
			{PRIORITY_LABEL[priority]}
		</span>
	);
}

export function PriorityDot({ priority }: { priority: Priority }) {
	const color =
		priority === 'HIGH'
			? '#e5484d'
			: priority === 'MEDIUM'
				? '#f5a623'
				: '#3aa0d1';
	return (
		<span
			className='inline-block size-2 rounded-full'
			style={{ backgroundColor: color }}
		/>
	);
}
