import { UserAvatar } from './user-avatar';

export function GlobalTopbar({ currentUserName }: { currentUserName: string }) {
	return (
		<header className='border-border bg-surface flex items-center justify-between border-b px-4 py-3 sm:px-6 lg:px-8'>
			<div className='flex items-center gap-2'>
				<span className='bg-brand flex h-8 w-8 items-center justify-center rounded-lg text-sm font-bold text-white'>
					L
				</span>
				<span className='text-ink text-lg font-bold tracking-tight'>
					Legajo
				</span>
			</div>
			<UserAvatar name={currentUserName} size={36} />
		</header>
	);
}
