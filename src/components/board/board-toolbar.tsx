export function BoardToolbar() {
	return (
		<div className='flex flex-wrap items-center justify-between gap-3'>
			<h1 className='text-ink text-2xl font-bold tracking-tight'>Tablero</h1>

			<div className='flex items-center gap-3'>
				<div className='relative hidden sm:block'>
					<SearchIcon className='text-ink-faint pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2' />
					<input
						type='search'
						placeholder='Buscar tarea…'
						className='border-border bg-surface text-ink placeholder:text-ink-faint focus:border-brand focus:ring-brand-soft w-56 rounded-lg border py-2 pr-3 pl-9 text-sm focus:ring-2 focus:outline-none'
					/>
				</div>
				<button className='border-border bg-surface text-ink-soft hover:bg-surface-muted hidden items-center gap-1.5 rounded-lg border px-3 py-2 text-sm font-medium transition-colors sm:flex'>
					<FilterIcon className='size-4' />
					Filtrar
				</button>
				<button className='bg-brand hover:bg-brand-dark flex items-center gap-1.5 rounded-lg px-3.5 py-2 text-sm font-semibold text-white transition-colors'>
					<PlusIcon className='size-4' />
					Nueva tarea
				</button>
			</div>
		</div>
	);
}

function SearchIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' {...props}>
			<circle cx='11' cy='11' r='6.5' />
			<path d='m20 20-3.8-3.8' strokeLinecap='round' />
		</svg>
	);
}

function FilterIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' {...props}>
			<path
				d='M4 5h16l-6 7.5V19l-4 2v-8.5L4 5Z'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' {...props}>
			<path d='M12 5v14M5 12h14' strokeLinecap='round' />
		</svg>
	);
}
