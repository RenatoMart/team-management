const TAG_CLASS: Record<string, string> = {
	Estrategia:
		'bg-[var(--color-tag-estrategia-soft)] text-[var(--color-tag-estrategia)]',
	Tecnología:
		'bg-[var(--color-tag-tecnologia-soft)] text-[var(--color-tag-tecnologia)]',
	Mercado: 'bg-[var(--color-tag-mercado-soft)] text-[var(--color-tag-mercado)]',
	Presentación:
		'bg-[var(--color-tag-presentacion-soft)] text-[var(--color-tag-presentacion)]',
};

export function TagBadge({ tag }: { tag: string }) {
	const cls = TAG_CLASS[tag] ?? 'bg-surface-muted text-ink-soft';
	return (
		<span
			className={[
				'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-semibold',
				cls,
			].join(' ')}
		>
			{tag}
		</span>
	);
}
