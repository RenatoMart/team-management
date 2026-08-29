import { createRoom } from '@/actions/rooms.actions';
import { GlobalTopbar } from '@/components/dashboard/global-topbar';
import { getCurrentUser } from '@/lib/current-user';
import Link from 'next/link';

export default async function NewRoomPage() {
	const user = await getCurrentUser();

	return (
		<div className='bg-canvas min-h-screen'>
			<GlobalTopbar currentUserName={user.name} />

			<div className='mx-auto max-w-lg px-4 py-10 sm:px-6'>
				<Link
					href='/'
					className='text-ink-soft hover:text-ink flex items-center gap-1.5 text-xs font-medium'
				>
					<BackIcon className='size-3.5' />
					Mis salas
				</Link>

				<h1 className='text-ink mt-3 text-2xl font-bold tracking-tight'>
					Nueva sala
				</h1>
				<p className='text-ink-soft mt-1 text-sm'>
					Crea un espacio para coordinar un nuevo proyecto en equipo.
				</p>

				<form
					action={createRoom}
					className='border-border bg-surface mt-6 flex flex-col gap-5 rounded-2xl border p-6'
				>
					<label className='flex flex-col gap-1.5'>
						<span className='text-ink text-sm font-medium'>
							Nombre de la sala
						</span>
						<input
							required
							name='name'
							type='text'
							placeholder='Ej. Informe Estratégico: Caso Café Andino S.A.C.'
							className='border-border bg-surface text-ink placeholder:text-ink-faint focus:border-brand focus:ring-brand-soft rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
						/>
					</label>

					<label className='flex flex-col gap-1.5'>
						<span className='text-ink text-sm font-medium'>
							Descripción <span className='text-ink-faint'>(opcional)</span>
						</span>
						<textarea
							name='description'
							rows={3}
							placeholder='¿De qué trata el proyecto?'
							className='border-border bg-surface text-ink placeholder:text-ink-faint focus:border-brand focus:ring-brand-soft resize-none rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
						/>
					</label>

					<label className='flex flex-col gap-1.5'>
						<span className='text-ink text-sm font-medium'>
							Fecha de sustentación{' '}
							<span className='text-ink-faint'>(opcional)</span>
						</span>
						<input
							name='examDate'
							type='date'
							className='border-border bg-surface text-ink focus:border-brand focus:ring-brand-soft rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
						/>
					</label>

					<button
						type='submit'
						className='bg-brand hover:bg-brand-dark mt-1 rounded-lg px-4 py-2.5 text-sm font-semibold text-white transition-colors'
					>
						Crear sala
					</button>
				</form>
			</div>
		</div>
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
