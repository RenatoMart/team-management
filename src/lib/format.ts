const AVATAR_PALETTE = [
	{ bg: 'var(--color-brand-soft)', fg: 'var(--color-brand)' },
	{ bg: 'var(--color-tag-estrategia-soft)', fg: 'var(--color-tag-estrategia)' },
	{ bg: 'var(--color-tag-mercado-soft)', fg: 'var(--color-tag-mercado)' },
	{
		bg: 'var(--color-tag-presentacion-soft)',
		fg: 'var(--color-tag-presentacion)',
	},
	{ bg: 'var(--color-done-soft)', fg: 'var(--color-done)' },
];

export function initials(name: string): string {
	const parts = name.trim().split(/\s+/);
	const first = parts[0]?.[0] ?? '';
	const last = parts.length > 1 ? (parts[parts.length - 1]?.[0] ?? '') : '';
	return (first + last).toUpperCase();
}

export function avatarColors(seed: string): { bg: string; fg: string } {
	let hash = 0;
	for (let i = 0; i < seed.length; i++) {
		hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
	}
	return AVATAR_PALETTE[hash % AVATAR_PALETTE.length];
}

export function formatShortDate(date: Date): string {
	return new Intl.DateTimeFormat('es-PE', {
		day: '2-digit',
		month: 'short',
	}).format(date);
}

export function daysUntil(date: Date, from = new Date()): number {
	const ms = date.getTime() - from.getTime();
	return Math.ceil(ms / (1000 * 60 * 60 * 24));
}
