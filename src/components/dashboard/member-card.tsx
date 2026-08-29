import type { BoardColumn, BoardMember } from '@/lib/board-types';
import { UserAvatar } from './user-avatar';

export function MemberCard({
	member,
	columns,
}: {
	member: BoardMember;
	columns: BoardColumn[];
}) {
	const tasks = columns
		.flatMap(c => c.tasks.map(t => ({ task: t, columnName: c.name })))
		.filter(({ task }) => task.assigneeId === member.userId);
	const done = tasks.filter(({ columnName }) => columnName === 'Hecho').length;
	const active = tasks.length - done;

	return (
		<div className='border-border bg-surface flex items-center gap-4 rounded-2xl border p-5'>
			<UserAvatar name={member.user.name} size={44} />
			<div className='min-w-0 flex-1'>
				<div className='flex items-center gap-2'>
					<p className='text-ink truncate text-sm font-semibold'>
						{member.user.name}
					</p>
					{member.role === 'OWNER' ? (
						<span className='bg-brand-soft text-brand rounded-md px-1.5 py-0.5 text-[11px] font-semibold'>
							Responsable
						</span>
					) : null}
				</div>
				<p className='text-ink-soft truncate text-xs'>{member.user.email}</p>
			</div>
			<div className='shrink-0 text-right'>
				<p className='text-ink font-mono text-sm font-semibold'>{active}</p>
				<p className='text-ink-faint text-[11px]'>activas</p>
			</div>
			<div className='shrink-0 text-right'>
				<p className='text-ink font-mono text-sm font-semibold'>{done}</p>
				<p className='text-ink-faint text-[11px]'>hechas</p>
			</div>
		</div>
	);
}
