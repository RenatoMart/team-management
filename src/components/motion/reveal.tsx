'use client';

import { revealStagger } from '@/utils/anime-runner';
import { useLayoutEffect, useRef } from 'react';

export function Reveal({
	children,
	className,
	y,
	duration,
	staggerMs,
}: {
	children: React.ReactNode;
	className?: string;
	y?: number;
	duration?: number;
	staggerMs?: number;
}) {
	const ref = useRef<HTMLDivElement>(null);

	useLayoutEffect(() => {
		const container = ref.current;
		if (!container) return;

		const items = Array.from(container.children) as HTMLElement[];
		const animation = revealStagger(items, { y, duration, staggerMs });
		return () => {
			animation?.pause();
		};
	}, [y, duration, staggerMs]);

	return (
		<div ref={ref} className={className}>
			{children}
		</div>
	);
}
