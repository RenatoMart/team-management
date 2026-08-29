export function StatCard({
	label,
	value,
	hint,
	hintTone = 'neutral',
	icon,
	iconBg,
	iconFg,
}: {
	label: string;
	value: string | number;
	hint?: string;
	hintTone?: 'up' | 'down' | 'neutral';
	icon: React.ReactNode;
	iconBg: string;
	iconFg: string;
}) {
	return (
		<div className='border-border bg-surface rounded-2xl border p-5'>
			<div className='flex items-center gap-3'>
				<span
					className='flex size-10 items-center justify-center rounded-xl'
					style={{ backgroundColor: iconBg, color: iconFg }}
				>
					{icon}
				</span>
				<span className='text-ink-soft text-sm font-medium'>{label}</span>
			</div>
			<p className='text-ink mt-3 font-mono text-3xl font-semibold'>{value}</p>
			{hint ? (
				<p
					className={`mt-1 text-xs font-medium ${
						hintTone === 'up'
							? 'text-done'
							: hintTone === 'down'
								? 'text-high'
								: 'text-ink-faint'
					}`}
				>
					{hint}
				</p>
			) : null}
		</div>
	);
}
