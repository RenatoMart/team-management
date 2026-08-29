'use client';

import { countUp, drawRing } from '@/utils/anime-runner';
import { useLayoutEffect, useRef } from 'react';

const COLORS = ['#22a06b', '#3457d5', '#e5e7f0'];

export function ProgressDonut({
	segments,
	centerPercent,
	centerLabel,
}: {
	segments: { label: string; value: number }[];
	centerPercent: number;
	centerLabel: string;
}) {
	const total = segments.reduce((sum, s) => sum + s.value, 0) || 1;
	const radius = 15.9155;
	const circumference = 2 * Math.PI * radius;
	const circleRefs = useRef<(SVGCircleElement | null)[]>([]);
	const counterRef = useRef<HTMLParagraphElement>(null);

	const arcs = segments.reduce<{ dash: number; offset: number }[]>((acc, s) => {
		const dash = (s.value / total) * circumference;
		const previousOffset = acc.length > 0 ? acc[acc.length - 1].offset : 0;
		const previousDash = acc.length > 0 ? acc[acc.length - 1].dash : 0;
		acc.push({ dash, offset: previousOffset + previousDash });
		return acc;
	}, []);

	useLayoutEffect(() => {
		const ringAnimations = arcs.map((arc, i) =>
			drawRing(circleRefs.current[i], {
				circumference,
				targetDash: arc.dash,
				duration: 650,
				delay: i * 90,
			}),
		);
		const counterAnimation = countUp(counterRef.current, {
			to: centerPercent,
			suffix: '%',
			duration: 650,
		});
		return () => {
			ringAnimations.forEach(a => a?.pause());
			counterAnimation?.pause();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [centerPercent, segments.map(s => s.value).join(',')]);

	return (
		<div className='flex items-center gap-4'>
			<svg viewBox='0 0 36 36' className='size-24 -rotate-90'>
				<circle
					cx='18'
					cy='18'
					r={radius}
					fill='none'
					stroke='#eef1f7'
					strokeWidth='4'
				/>
				{segments.map((s, i) => {
					const { dash, offset } = arcs[i];
					const gap = circumference - dash;
					return (
						<circle
							key={s.label}
							ref={el => {
								circleRefs.current[i] = el;
							}}
							cx='18'
							cy='18'
							r={radius}
							fill='none'
							stroke={COLORS[i % COLORS.length]}
							strokeWidth='4'
							strokeDasharray={`${dash} ${gap}`}
							strokeDashoffset={-offset}
							strokeLinecap='round'
						/>
					);
				})}
			</svg>
			<div className='flex-1'>
				<p
					ref={counterRef}
					className='text-ink font-mono text-xl font-semibold'
				>
					{centerPercent}%
				</p>
				<p className='text-ink-soft mb-2 text-xs'>{centerLabel}</p>
				<ul className='space-y-1'>
					{segments.map((s, i) => (
						<li
							key={s.label}
							className='text-ink-soft flex items-center gap-2 text-xs'
						>
							<span
								className='size-2 rounded-full'
								style={{ backgroundColor: COLORS[i % COLORS.length] }}
							/>
							{s.label}
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
