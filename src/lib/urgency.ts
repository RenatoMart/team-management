export type UrgencyTone = 'urgent' | 'soon' | 'ok' | 'neutral';

export function urgencyTone(days: number | null): UrgencyTone {
	if (days === null) return 'neutral';
	if (days <= 3) return 'urgent';
	if (days <= 14) return 'soon';
	return 'ok';
}

export const TONE_BADGE_CLASS: Record<UrgencyTone, string> = {
	urgent: 'bg-high-soft text-high',
	soon: 'bg-medium-soft text-medium',
	ok: 'bg-brand-soft text-brand',
	neutral: 'bg-surface-muted text-ink-soft',
};

export const TONE_SOLID_CLASS: Record<UrgencyTone, string> = {
	urgent: 'bg-high',
	soon: 'bg-medium',
	ok: 'bg-brand',
	neutral: 'bg-ink-faint',
};
