import { ProgressDonut } from '@/components/dashboard/progress-donut';
import { PriorityOverview } from '@/components/dashboard/right-rail/priority-overview';
import { RecentDeliverables } from '@/components/dashboard/right-rail/recent-deliverables';
import { TeamWorkload } from '@/components/dashboard/right-rail/team-workload';
import { UpcomingTasks } from '@/components/dashboard/right-rail/upcoming-tasks';
import { RoomHeader } from '@/components/dashboard/room-header';
import { StatCard } from '@/components/dashboard/stat-card';
import { Reveal } from '@/components/motion/reveal';
import { getRoom } from '@/lib/room-data';
import { notFound } from 'next/navigation';

export default async function ResumenPage({
	params,
}: {
	params: Promise<{ roomId: string }>;
}) {
	const { roomId } = await params;
	const room = await getRoom(roomId);

	if (!room) notFound();

	const allTasks = room.columns.flatMap(c => c.tasks);
	const total = allTasks.length;
	const done = room.columns.find(c => c.name === 'Hecho')?.tasks.length ?? 0;
	const inProgress =
		room.columns.find(c => c.name === 'En progreso')?.tasks.length ?? 0;
	const inReview =
		room.columns.find(c => c.name === 'En revisión')?.tasks.length ?? 0;
	const todo =
		room.columns.find(c => c.name === 'Por hacer')?.tasks.length ?? 0;

	return (
		<div className='flex flex-col gap-6'>
			<RoomHeader roomName={room.name} examDate={room.examDate} />

			<Reveal className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				<StatCard
					label='Total de tareas'
					value={total}
					hint={`${todo} por hacer`}
					icon={<ListIcon className='size-5' />}
					iconBg='var(--color-brand-soft)'
					iconFg='var(--color-brand)'
				/>
				<StatCard
					label='En progreso'
					value={inProgress}
					hint={`${inReview} en revisión`}
					hintTone='neutral'
					icon={<ActivityIcon className='size-5' />}
					iconBg='var(--color-medium-soft)'
					iconFg='var(--color-medium)'
				/>
				<StatCard
					label='Completadas'
					value={done}
					hint={
						total > 0
							? `${Math.round((done / total) * 100)}% del total`
							: undefined
					}
					hintTone='up'
					icon={<CheckIcon className='size-5' />}
					iconBg='var(--color-done-soft)'
					iconFg='var(--color-done)'
				/>
				<div className='border-border bg-surface rounded-2xl border p-5'>
					<p className='text-ink-soft mb-2 text-sm font-medium'>
						Avance del proyecto
					</p>
					<ProgressDonut
						centerPercent={total > 0 ? Math.round((done / total) * 100) : 0}
						centerLabel='completado'
						segments={[
							{ label: 'Hecho', value: done },
							{ label: 'En curso', value: inProgress + inReview },
							{ label: 'Por hacer', value: todo },
						]}
					/>
				</div>
			</Reveal>

			<div className='grid grid-cols-1 gap-6 lg:grid-cols-2'>
				<Reveal className='flex flex-col gap-6'>
					<UpcomingTasks columns={room.columns} />
					<RecentDeliverables deliverables={room.deliverables} />
				</Reveal>
				<Reveal className='flex flex-col gap-6'>
					<TeamWorkload members={room.members} columns={room.columns} />
					<PriorityOverview columns={room.columns} />
				</Reveal>
			</div>
		</div>
	);
}

function ListIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' {...props}>
			<path
				d='M8 6h12M8 12h12M8 18h12M4 6h.01M4 12h.01M4 18h.01'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

function ActivityIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' {...props}>
			<path
				d='M3 12h4l2.5-7 4 14 2.5-7H21'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' {...props}>
			<circle cx='12' cy='12' r='9' />
			<path
				d='m8.5 12.5 2.5 2.5 5-5'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
