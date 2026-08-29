import type { Metadata } from 'next';
import { IBM_Plex_Mono, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';

const jakarta = Plus_Jakarta_Sans({
	variable: '--font-jakarta',
	subsets: ['latin'],
	weight: ['400', '500', '600', '700', '800'],
});

const plexMono = IBM_Plex_Mono({
	variable: '--font-plex-mono',
	subsets: ['latin'],
	weight: ['400', '500', '600'],
});

export const metadata: Metadata = {
	title: 'Legajo — Gestión de equipos universitarios',
	description:
		'Coordina salas de proyecto, tableros y entregables de tu grupo universitario antes de la sustentación.',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='es' className={[jakarta.variable, plexMono.variable].join(' ')}>
			<body suppressHydrationWarning className='font-sans antialiased'>
				{children}
			</body>
		</html>
	);
}
