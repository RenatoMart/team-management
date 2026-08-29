import { UserAvatar } from '@/components/dashboard/user-avatar';
import type { BoardDeliverable } from '@/lib/board-types';
import { formatShortDate } from '@/lib/format';
import { FileBadge } from './file-badge';

export function DeliverableRow({
	deliverable,
}: {
	deliverable: BoardDeliverable;
}) {
	return (
		<a
			href={deliverable.fileUrl}
			target='_blank'
			rel='noreferrer'
			className='border-border bg-surface hover:border-brand flex items-center gap-4 rounded-2xl border p-4 transition-colors'
		>
			<FileBadge fileType={deliverable.fileType} />
			<div className='min-w-0 flex-1'>
				<p className='text-ink truncate text-sm font-semibold'>
					{deliverable.title}
				</p>
				<p className='text-ink-soft mt-0.5 text-xs'>
					Subido por {deliverable.uploadedBy.name} ·{' '}
					{formatShortDate(new Date(deliverable.uploadedAt))}
				</p>
			</div>
			<UserAvatar name={deliverable.uploadedBy.name} size={28} />
		</a>
	);
}
