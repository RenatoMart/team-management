import { DeliverableRow } from '@/components/dashboard/deliverables/deliverable-row';
import { UploadForm } from '@/components/dashboard/deliverables/upload-form';
import { Reveal } from '@/components/motion/reveal';
import { getRoom } from '@/lib/room-data';
import { notFound } from 'next/navigation';

export default async function DeliverablesPage({
	params,
}: {
	params: Promise<{ roomId: string }>;
}) {
	const { roomId } = await params;
	const room = await getRoom(roomId);

	if (!room) notFound();

	return (
		<div className='flex flex-col gap-6'>
			<div>
				<h1 className='text-ink text-2xl font-bold tracking-tight'>
					Entregables
				</h1>
				<p className='text-ink-soft mt-1 text-sm'>
					Avances y documentos finales de esta sala
				</p>
			</div>

			<UploadForm roomId={room.id} />

			{room.deliverables.length === 0 ? (
				<div className='border-border bg-surface rounded-2xl border p-8 text-center'>
					<p className='text-ink text-sm font-medium'>
						Aún no se ha subido ningún avance
					</p>
					<p className='text-ink-soft mt-1 text-sm'>
						Sube el primer documento con el formulario de arriba.
					</p>
				</div>
			) : (
				<Reveal className='flex flex-col gap-3'>
					{room.deliverables.map(deliverable => (
						<DeliverableRow key={deliverable.id} deliverable={deliverable} />
					))}
				</Reveal>
			)}
		</div>
	);
}
