import { PrismaPg } from '@prisma/adapter-pg';
import { Priority, PrismaClient, RoomRole } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });
const prisma = new PrismaClient({ adapter });

async function main() {
	const passwordHash = await bcrypt.hash('password123', 10);

	const [renato, fabricio, juanCarlos, rodrigo] = await Promise.all([
		prisma.user.upsert({
			where: { email: 'example1@gmail.com' },
			update: {},
			create: {
				name: 'Renato',
				email: 'example1@gmail.com',
				passwordHash,
			},
		}),
		prisma.user.upsert({
			where: { email: 'example2@gmail.com' },
			update: {},
			create: {
				name: 'Fabricio José Zamora Albán',
				email: 'example2@gmail.com',
				passwordHash,
			},
		}),
		prisma.user.upsert({
			where: { email: 'example3@gmail.com' },
			update: {},
			create: {
				name: 'Juan Carlos Luján Meza',
				email: 'example3@gmail.com',
				passwordHash,
			},
		}),
		prisma.user.upsert({
			where: { email: 'example4@gmail.com' },
			update: {},
			create: {
				name: 'Rodrigo André Malpartida Lara',
				email: 'example4@gmail.com',
				passwordHash,
			},
		}),
	]);

	const roomId = 'room_cafe_andino';

	const room = await prisma.room.upsert({
		where: { id: roomId },
		update: {},
		create: {
			id: roomId,
			name: 'Informe Estratégico: Caso Café Andino S.A.C.',
			description:
				'Análisis estratégico y sustentación final del caso Café Andino S.A.C.',
			examDate: new Date('2026-11-20T15:00:00.000Z'),
		},
	});

	await Promise.all(
		[
			{ userId: renato.id, role: RoomRole.OWNER },
			{ userId: fabricio.id, role: RoomRole.MEMBER },
			{ userId: juanCarlos.id, role: RoomRole.MEMBER },
			{ userId: rodrigo.id, role: RoomRole.MEMBER },
		].map(member =>
			prisma.roomMember.upsert({
				where: { userId_roomId: { userId: member.userId, roomId: room.id } },
				update: { role: member.role },
				create: { ...member, roomId: room.id },
			}),
		),
	);

	await prisma.task.deleteMany({ where: { roomId: room.id } });
	await prisma.column.deleteMany({ where: { roomId: room.id } });

	const columns = await Promise.all(
		[
			{ name: 'Por hacer', order: 0 },
			{ name: 'En progreso', order: 1 },
			{ name: 'En revisión', order: 2 },
			{ name: 'Hecho', order: 3 },
		].map(column =>
			prisma.column.create({ data: { ...column, roomId: room.id } }),
		),
	);

	const columnByName = Object.fromEntries(columns.map(c => [c.name, c.id]));

	await prisma.task.createMany({
		data: [
			{
				title: 'Redactar matriz FODA',
				description:
					'Levantar fortalezas, oportunidades, debilidades y amenazas de Café Andino S.A.C. a partir del caso.',
				tag: 'Estrategia',
				priority: Priority.HIGH,
				dueDate: new Date('2026-09-05T23:59:00.000Z'),
				roomId: room.id,
				columnId: columnByName['En progreso'],
				assigneeId: fabricio.id,
				order: 0,
			},
			{
				title: 'Diseñar base de datos relacional',
				description:
					'Modelar el esquema relacional propuesto para el sistema de trazabilidad de lotes de café.',
				tag: 'Tecnología',
				priority: Priority.MEDIUM,
				dueDate: new Date('2026-09-10T23:59:00.000Z'),
				roomId: room.id,
				columnId: columnByName['Por hacer'],
				assigneeId: renato.id,
				order: 0,
			},
			{
				title: 'Armar diapositivas finales',
				description:
					'Consolidar los hallazgos de todos los frentes en la presentación para la sustentación.',
				tag: 'Presentación',
				priority: Priority.HIGH,
				dueDate: new Date('2026-11-18T23:59:00.000Z'),
				roomId: room.id,
				columnId: columnByName['Por hacer'],
				assigneeId: rodrigo.id,
				order: 1,
			},
			{
				title: 'Investigar cadena de suministro y exportación',
				description:
					'Documentar el proceso logístico desde la finca hasta el puerto de exportación.',
				tag: 'Mercado',
				priority: Priority.MEDIUM,
				dueDate: new Date('2026-09-08T23:59:00.000Z'),
				roomId: room.id,
				columnId: columnByName['En progreso'],
				assigneeId: juanCarlos.id,
				order: 1,
			},
			{
				title: 'Definir propuesta de valor y segmentación de clientes',
				tag: 'Estrategia',
				priority: Priority.MEDIUM,
				dueDate: new Date('2026-09-12T23:59:00.000Z'),
				roomId: room.id,
				columnId: columnByName['En revisión'],
				assigneeId: juanCarlos.id,
				order: 0,
			},
			{
				title: 'Levantar antecedentes del caso y contexto del mercado',
				tag: 'Mercado',
				priority: Priority.LOW,
				dueDate: new Date('2026-08-30T23:59:00.000Z'),
				roomId: room.id,
				columnId: columnByName['Hecho'],
				assigneeId: renato.id,
				order: 0,
			},
			{
				title: 'Cotizar diseño gráfico de la carátula del informe',
				tag: 'Presentación',
				priority: Priority.LOW,
				dueDate: new Date('2026-09-02T23:59:00.000Z'),
				roomId: room.id,
				columnId: columnByName['Hecho'],
				assigneeId: rodrigo.id,
				order: 1,
			},
		],
	});

	// eslint-disable-next-line no-console
	console.log('Seed completado:', {
		room: room.name,
		miembros: [renato, fabricio, juanCarlos, rodrigo].map(u => u.name),
	});
}

main()
	.catch(e => {
		// eslint-disable-next-line no-console
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
