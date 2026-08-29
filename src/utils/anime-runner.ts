import { animate, stagger, type JSAnimation } from 'animejs';

export function prefersReducedMotion(): boolean {
	if (typeof window === 'undefined') return true;
	return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Fast, GPU-cheap stagger reveal (opacity + translateY only).
 * Tuned short so a full row/grid finishes well under half a second.
 */
export function revealStagger(
	items: HTMLElement[] | NodeListOf<HTMLElement>,
	{
		y = 10,
		duration = 260,
		staggerMs = 45,
	}: { y?: number; duration?: number; staggerMs?: number } = {},
): JSAnimation | undefined {
	const targets = Array.from(items);
	if (targets.length === 0) return undefined;

	if (prefersReducedMotion()) {
		targets.forEach(el => {
			el.style.opacity = '1';
			el.style.transform = 'none';
		});
		return undefined;
	}

	targets.forEach(el => {
		el.style.opacity = '0';
		el.style.transform = `translateY(${y}px)`;
	});

	return animate(targets, {
		opacity: [0, 1],
		translateY: [y, 0],
		duration,
		delay: stagger(staggerMs),
		ease: 'outQuad',
	});
}

/** Draws an SVG ring in from 0 to its target arc length. Short + decisive. */
export function drawRing(
	circle: SVGCircleElement | null,
	{
		circumference,
		targetDash,
		duration = 700,
		delay = 0,
	}: {
		circumference: number;
		targetDash: number;
		duration?: number;
		delay?: number;
	},
): JSAnimation | undefined {
	if (!circle) return undefined;

	if (prefersReducedMotion()) {
		circle.style.strokeDasharray = `${targetDash} ${circumference - targetDash}`;
		return undefined;
	}

	circle.style.strokeDasharray = `0 ${circumference}`;
	return animate(circle, {
		strokeDasharray: `${targetDash} ${circumference - targetDash}`,
		duration,
		delay,
		ease: 'outQuart',
	});
}

/** Counts a number up to its target — fast enough to feel snappy, not gimmicky. */
export function countUp(
	el: HTMLElement | null,
	{
		to,
		suffix = '',
		duration = 600,
		delay = 0,
	}: { to: number; suffix?: string; duration?: number; delay?: number },
): JSAnimation | undefined {
	if (!el) return undefined;

	if (prefersReducedMotion()) {
		el.textContent = `${to}${suffix}`;
		return undefined;
	}

	const counter = { value: 0 };
	return animate(counter, {
		value: to,
		duration,
		delay,
		ease: 'outQuad',
		onUpdate: () => {
			el.textContent = `${Math.round(counter.value)}${suffix}`;
		},
	});
}
