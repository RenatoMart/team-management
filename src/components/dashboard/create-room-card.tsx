import Link from 'next/link';

export function CreateRoomCard() {
	return (
		<Link
			href='/rooms/new'
			className='border-border text-ink-soft hover:border-brand hover:text-brand hover:bg-brand-soft/40 flex min-h-[168px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed p-5 text-center transition-colors'
		>
			<span className='border-border group-hover:border-brand flex size-9 items-center justify-center rounded-full border text-lg'>
				+
			</span>
			<span className='text-sm font-semibold'>Nueva sala</span>
			<span className='text-ink-faint text-xs'>
				Crea un espacio para tu próximo proyecto
			</span>
		</Link>
	);
}
