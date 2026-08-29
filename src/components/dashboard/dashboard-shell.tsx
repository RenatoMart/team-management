'use client';

import { useState } from 'react';
import { DrawerContext } from './drawer-context';

export function DashboardShell({
	sidebar,
	mobileLabel,
	children,
}: {
	sidebar: React.ReactNode;
	mobileLabel: string;
	children: React.ReactNode;
}) {
	const [open, setOpen] = useState(false);

	return (
		<DrawerContext.Provider value={{ open, close: () => setOpen(false) }}>
			<div className='bg-canvas flex min-h-screen'>
				{sidebar}

				{open ? (
					<button
						aria-label='Cerrar menú'
						onClick={() => setOpen(false)}
						className='fixed inset-0 z-30 bg-black/30 lg:hidden'
					/>
				) : null}

				<div className='flex min-w-0 flex-1 flex-col'>
					<div className='border-border bg-surface flex items-center gap-3 border-b px-4 py-3 lg:hidden'>
						<button
							aria-label='Abrir menú'
							onClick={() => setOpen(true)}
							className='text-ink hover:bg-surface-muted flex h-9 w-9 items-center justify-center rounded-lg'
						>
							<MenuIcon className='size-5' />
						</button>
						<span className='bg-brand flex h-7 w-7 items-center justify-center rounded-md text-xs font-bold text-white'>
							L
						</span>
						<span className='text-ink min-w-0 flex-1 truncate text-sm font-bold tracking-tight'>
							{mobileLabel}
						</span>
					</div>

					<main className='flex-1 px-4 py-6 sm:px-6 lg:px-8'>{children}</main>
				</div>
			</div>
		</DrawerContext.Provider>
	);
}

function MenuIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' {...props}>
			<path d='M4 7h16M4 12h16M4 17h16' strokeLinecap='round' />
		</svg>
	);
}
