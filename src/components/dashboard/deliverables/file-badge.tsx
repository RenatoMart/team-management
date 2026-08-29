const TYPE_STYLES: Record<string, { bg: string; fg: string }> = {
	pdf: { bg: 'var(--color-high-soft)', fg: 'var(--color-high)' },
	doc: {
		bg: 'var(--color-tag-tecnologia-soft)',
		fg: 'var(--color-tag-tecnologia)',
	},
	docx: {
		bg: 'var(--color-tag-tecnologia-soft)',
		fg: 'var(--color-tag-tecnologia)',
	},
	xls: { bg: 'var(--color-done-soft)', fg: 'var(--color-done)' },
	xlsx: { bg: 'var(--color-done-soft)', fg: 'var(--color-done)' },
	ppt: {
		bg: 'var(--color-tag-presentacion-soft)',
		fg: 'var(--color-tag-presentacion)',
	},
	pptx: {
		bg: 'var(--color-tag-presentacion-soft)',
		fg: 'var(--color-tag-presentacion)',
	},
	png: {
		bg: 'var(--color-tag-estrategia-soft)',
		fg: 'var(--color-tag-estrategia)',
	},
	jpg: {
		bg: 'var(--color-tag-estrategia-soft)',
		fg: 'var(--color-tag-estrategia)',
	},
	jpeg: {
		bg: 'var(--color-tag-estrategia-soft)',
		fg: 'var(--color-tag-estrategia)',
	},
};

const DEFAULT_STYLE = {
	bg: 'var(--color-surface-muted)',
	fg: 'var(--color-ink-soft)',
};

export function FileBadge({ fileType }: { fileType: string | null }) {
	const key = (fileType ?? '').toLowerCase();
	const { bg, fg } = TYPE_STYLES[key] ?? DEFAULT_STYLE;

	return (
		<span
			className='flex size-10 shrink-0 items-center justify-center rounded-xl text-[11px] font-bold tracking-wide uppercase'
			style={{ backgroundColor: bg, color: fg }}
		>
			{key || '—'}
		</span>
	);
}
