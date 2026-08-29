import { avatarColors, initials } from '@/lib/format';

export function UserAvatar({
	name,
	size = 32,
}: {
	name: string;
	size?: number;
}) {
	const { bg, fg } = avatarColors(name);
	return (
		<span
			className='inline-flex shrink-0 items-center justify-center rounded-full font-semibold'
			style={{
				width: size,
				height: size,
				backgroundColor: bg,
				color: fg,
				fontSize: Math.max(11, size * 0.38),
			}}
		>
			{initials(name)}
		</span>
	);
}
