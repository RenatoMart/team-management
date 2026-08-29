'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useDrawer } from './drawer-context';
import { UserAvatar } from './user-avatar';

function navItems(roomId: string) {
	return [
		{ href: `/rooms/${roomId}/resumen`, label: 'Resumen', icon: PulseIcon },
		{ href: `/rooms/${roomId}/board`, label: 'Tablero', icon: BoardIcon },
		{
			href: `/rooms/${roomId}/deliverables`,
			label: 'Entregables',
			icon: FileIcon,
		},
		{ href: `/rooms/${roomId}/members`, label: 'Equipo', icon: TeamIcon },
	];
}

export function Sidebar({
	roomId,
	roomName,
	currentUserName,
}: {
	roomId: string;
	roomName: string;
	currentUserName: string;
}) {
	const pathname = usePathname();
	const { open, close } = useDrawer();
	const items = navItems(roomId);
	const activeHref = items
		.map(item => item.href)
		.filter(href => pathname === href || pathname.startsWith(`${href}/`))
		.sort((a, b) => b.length - a.length)[0];

	return (
		<aside
			className={[
				'fixed inset-y-0 left-0 z-40 flex h-full w-64 shrink-0 flex-col',
				'border-border bg-surface border-r px-4 py-6',
				'transition-transform duration-200 ease-out lg:static lg:translate-x-0',
				open ? 'translate-x-0' : '-translate-x-full',
			].join(' ')}
		>
			<Link
				href='/'
				onClick={close}
				className='text-ink-soft hover:text-ink flex items-center gap-1.5 px-2 text-xs font-medium'
			>
				<BackIcon className='size-3.5' />
				Mis salas
			</Link>

			<div className='mt-3 flex items-center gap-2 px-2'>
				<span className='bg-brand flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-sm font-bold text-white'>
					{roomName.charAt(0)}
				</span>
				<span className='text-ink min-w-0 flex-1 truncate text-sm font-bold tracking-tight'>
					{roomName}
				</span>
			</div>

			<nav className='mt-8 flex flex-1 flex-col gap-1'>
				{items.map(item => {
					const active = item.href === activeHref;
					const Icon = item.icon;
					return (
						<Link
							key={item.href}
							href={item.href}
							onClick={close}
							className={[
								'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium',
								'transition-colors',
								active
									? 'bg-brand-soft text-brand'
									: 'text-ink-soft hover:bg-surface-muted hover:text-ink',
							].join(' ')}
						>
							<Icon
								className='size-[18px]'
								strokeWidth={active ? 2.25 : 1.75}
							/>
							{item.label}
						</Link>
					);
				})}
			</nav>

			<div className='border-border bg-surface-muted mt-4 rounded-xl border p-4'>
				<p className='text-ink text-sm font-semibold'>Invita a tu equipo</p>
				<p className='text-ink-soft mt-1 text-xs'>
					Comparte el código de la sala para que se unan a tu equipo.
				</p>
				<button className='bg-brand hover:bg-brand-dark mt-3 w-full rounded-lg px-3 py-2 text-xs font-semibold text-white transition-colors'>
					Copiar código de invitación
				</button>
			</div>

			<div className='mt-4 flex items-center gap-3 px-2 pt-4'>
				<UserAvatar name={currentUserName} size={36} />
				<div className='min-w-0'>
					<p className='text-ink truncate text-sm font-semibold'>
						{currentUserName}
					</p>
					<p className='text-ink-soft truncate text-xs'>Miembro del equipo</p>
				</div>
			</div>
		</aside>
	);
}

function BackIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' {...props}>
			<path
				d='m11 5-6 7 6 7M5 12h14'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}

function PulseIcon(props: React.SVGProps<SVGSVGElement>) {
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

function BoardIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' {...props}>
			<rect x='4' y='4' width='16' height='16' rx='2' />
			<path d='M9 4v16M15 4v9' />
		</svg>
	);
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' {...props}>
			<path
				d='M7 3.5h7l4 4v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1v-16a1 1 0 0 1 1-1Z'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
			<path d='M14 3.5V8h4' strokeLinecap='round' strokeLinejoin='round' />
		</svg>
	);
}

function TeamIcon(props: React.SVGProps<SVGSVGElement>) {
	return (
		<svg viewBox='0 0 24 24' fill='none' stroke='currentColor' {...props}>
			<circle cx='9' cy='8' r='3' />
			<path
				d='M3.5 19a5.5 5.5 0 0 1 11 0M16 8.5a2.5 2.5 0 1 1 0-5M15 12.5c2.5 0 5.5 1.3 5.5 4.2v1.3h-4'
				strokeLinecap='round'
				strokeLinejoin='round'
			/>
		</svg>
	);
}
