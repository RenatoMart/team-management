# Legajo

**Plantilla de sistema de gestión de equipos y proyectos**, construida con Next.js (App Router), TypeScript, Prisma y Tailwind CSS.

Pensada como punto de partida para coordinar equipos de trabajo: salas de proyecto, tableros Kanban con drag-and-drop, entregables con subida de archivos, y gestión de miembros — todo con datos reales, no mockups estáticos.

![Recorrido por Legajo: Resumen, Tablero con drag-and-drop, Entregables y Equipo](docs/demo.gif)

## 🌟 Características

- **Salas de proyecto**: cada sala agrupa un equipo, sus tareas, entregables y fecha límite.
- **Tablero Kanban** con `dnd-kit`, respaldado por Server Actions + Prisma (el arrastre persiste de verdad, con actualización optimista vía `useOptimistic`).
- **Entregables**: subida de archivos con Server Actions, almacenamiento local en `public/uploads/`.
- **Equipo**: roles, carga de trabajo por integrante, resumen de avance.
- **Modo demo**: `DEMO_MODE=true` sirve datos de ejemplo sin necesitar Postgres — útil para desplegar una demo pública o desarrollar el front sin base de datos.
- **Animaciones deliberadas** con Anime.js v4 (solo `opacity`/`transform`, respeta `prefers-reduced-motion`).

## 📁 Estructura del proyecto

```bash
src/
├── app/                      # Rutas (App Router)
│   └── rooms/[roomId]/       # Resumen, Tablero, Entregables, Equipo por sala
├── actions/                  # Server Actions (tareas, entregables, salas)
├── components/
│   ├── board/                # Tablero Kanban (dnd-kit)
│   ├── dashboard/             # Sidebar, tarjetas, widgets del panel
│   └── motion/                # Wrapper de animaciones de entrada
├── lib/                      # Prisma client, queries, helpers
└── utils/anime-runner.ts     # Utilidades de animación (Anime.js v4)

prisma/
├── schema.prisma             # Room, User, Task, Column, Deliverable...
└── seed.ts                   # Datos de ejemplo
```

## 🚀 Cómo correrlo

1. **Instala dependencias:**

   ```bash
   npm install
   ```

2. **Opción rápida (sin base de datos):** deja `DEMO_MODE="true"` en tu `.env` y corre:

   ```bash
   npm run dev
   ```

3. **Opción completa (con Postgres):**

   ```bash
   cp .env.example .env      # ajusta DATABASE_URL si hace falta
   npm run db:up              # levanta Postgres con docker compose
   npm run db:migrate          # crea las tablas
   npm run db:seed             # carga datos de ejemplo
   npm run dev
   ```

4. Abre [http://localhost:3000](http://localhost:3000).

Otros scripts útiles: `npm run db:studio` (Prisma Studio para ver/editar datos), `npm run lint`, `npm run build`.

## 🛠️ Notas de arquitectura

- **Server Actions** manejan toda la escritura (crear salas, mover tareas, subir entregables) — sin API routes intermedias.
- **Animaciones**: solo se anima `transform`/`opacity` (GPU-friendly); evita `transition-all`.
- Este repo no trae autenticación todavía — el "usuario actual" está fijado en `src/lib/current-user.ts` como siguiente paso natural antes de producción.

## 📄 Licencia

MIT. Úsalo como base para tu propio sistema de gestión.
