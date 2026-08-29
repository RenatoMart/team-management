'use client';

import { uploadDeliverable } from '@/actions/deliverables.actions';
import { useRef, useState, useTransition } from 'react';

export function UploadForm({ roomId }: { roomId: string }) {
	const formRef = useRef<HTMLFormElement>(null);
	const [isPending, startTransition] = useTransition();
	const [error, setError] = useState<string | null>(null);
	const [fileName, setFileName] = useState<string | null>(null);

	function handleSubmit(formData: FormData) {
		setError(null);
		startTransition(async () => {
			try {
				await uploadDeliverable(roomId, formData);
				formRef.current?.reset();
				setFileName(null);
			} catch {
				setError('No se pudo subir el archivo. Intenta de nuevo.');
			}
		});
	}

	return (
		<form
			ref={formRef}
			action={handleSubmit}
			className='border-border bg-surface rounded-2xl border border-dashed p-5'
		>
			<div className='flex flex-col gap-3 sm:flex-row sm:items-end'>
				<label className='flex-1'>
					<span className='text-ink-soft text-xs font-medium'>
						Título (opcional)
					</span>
					<input
						type='text'
						name='title'
						placeholder='Ej. Matriz FODA final'
						className='border-border bg-surface text-ink placeholder:text-ink-faint focus:border-brand focus:ring-brand-soft mt-1 w-full rounded-lg border px-3 py-2 text-sm focus:ring-2 focus:outline-none'
					/>
				</label>

				<label className='flex-1'>
					<span className='text-ink-soft text-xs font-medium'>Archivo</span>
					<input
						required
						type='file'
						name='file'
						onChange={e => setFileName(e.target.files?.[0]?.name ?? null)}
						className='text-ink-soft file:bg-brand-soft file:text-brand mt-1 w-full text-sm file:mr-3 file:rounded-lg file:border-0 file:px-3 file:py-2 file:text-xs file:font-semibold'
					/>
				</label>

				<button
					type='submit'
					disabled={isPending}
					className='bg-brand hover:bg-brand-dark shrink-0 rounded-lg px-4 py-2 text-sm font-semibold text-white transition-colors disabled:opacity-60'
				>
					{isPending ? 'Subiendo…' : 'Subir avance'}
				</button>
			</div>

			{fileName ? (
				<p className='text-ink-faint mt-2 text-xs'>Seleccionado: {fileName}</p>
			) : null}
			{error ? (
				<p className='text-high mt-2 text-xs font-medium'>{error}</p>
			) : null}
		</form>
	);
}
