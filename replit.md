# Workspace

## Overview

pnpm workspace monorepo using TypeScript. Each package manages its own dependencies.

## Stack

- **Monorepo tool**: pnpm workspaces
- **Node.js version**: 24
- **Package manager**: pnpm
- **TypeScript version**: 5.9
- **API framework**: Express 5
- **Database**: PostgreSQL + Drizzle ORM
- **Validation**: Zod (`zod/v4`), `drizzle-zod`
- **API codegen**: Orval (from OpenAPI spec)
- **Build**: esbuild (CJS bundle)

## Structure

```text
artifacts-monorepo/
├── artifacts/              # Deployable applications
│   ├── api-server/         # Express API server
│   └── coin-guard/         # Coin Guard React+Vite frontend
├── lib/                    # Shared libraries
│   ├── api-spec/           # OpenAPI spec + Orval codegen config
│   ├── api-client-react/   # Generated React Query hooks
│   ├── api-zod/            # Generated Zod schemas from OpenAPI
│   └── db/                 # Drizzle ORM schema + DB connection
├── scripts/                # Utility scripts (single workspace package)
│   └── src/                # Individual .ts scripts, run via `pnpm --filter @workspace/scripts run <script>`
├── pnpm-workspace.yaml     # pnpm workspace (artifacts/*, lib/*, lib/integrations/*, scripts)
├── tsconfig.base.json      # Shared TS options (composite, bundler resolution, es2022)
├── tsconfig.json           # Root TS project references
└── package.json            # Root package with hoisted devDeps
```

## TypeScript & Composite Projects

Every package extends `tsconfig.base.json` which sets `composite: true`. The root `tsconfig.json` lists all packages as project references. This means:

- **Always typecheck from the root** — run `pnpm run typecheck` (which runs `tsc --build --emitDeclarationOnly`). This builds the full dependency graph so that cross-package imports resolve correctly. Running `tsc` inside a single package will fail if its dependencies haven't been built yet.
- **`emitDeclarationOnly`** — we only emit `.d.ts` files during typecheck; actual JS bundling is handled by esbuild/tsx/vite...etc, not `tsc`.
- **Project references** — when package A depends on package B, A's `tsconfig.json` must list B in its `references` array. `tsc --build` uses this to determine build order and skip up-to-date packages.

## Root Scripts

- `pnpm run build` — runs `typecheck` first, then recursively runs `build` in all packages that define it
- `pnpm run typecheck` — runs `tsc --build --emitDeclarationOnly` using project references

## Packages

### `artifacts/api-server` (`@workspace/api-server`)

Express 5 API server. Routes live in `src/routes/` and use `@workspace/api-zod` for request and response validation and `@workspace/db` for persistence.

- Entry: `src/index.ts` — reads `PORT`, starts Express
- App setup: `src/app.ts` — mounts CORS, JSON/urlencoded parsing, routes at `/api`
- Routes: `src/routes/index.ts` mounts sub-routers; `src/routes/health.ts` exposes `GET /healthz`; `src/routes/coin-guard.ts` exposes all Coin Guard API endpoints (`/auth/*`, `/analytics/*`, `/applications/*`, `/contact`, `/admin/*`, etc.)
- Libraries: `src/lib/storage.ts` (PostgreSQL data access), `src/lib/telegram.ts` (optional Telegram bot, requires `TELEGRAM_BOT_TOKEN`), `src/lib/session-tracker.ts` (page view analytics)
- Depends on: `@workspace/db`, `@workspace/api-zod`
- `pnpm --filter @workspace/api-server run dev` — run the dev server
- `pnpm --filter @workspace/api-server run build` — production esbuild bundle (`dist/index.cjs`)
- Build bundles an allowlist of deps (express, cors, pg, drizzle-orm, zod, etc.) and externalizes the rest

### `lib/db` (`@workspace/db`)

Database layer using Drizzle ORM with PostgreSQL. Exports a Drizzle client instance and schema models.

- `src/index.ts` — creates a `Pool` + Drizzle instance, exports schema
- `src/schema/index.ts` — barrel re-export of all models
- `src/schema/<modelname>.ts` — table definitions with `drizzle-zod` insert schemas (no models definitions exist right now)
- `drizzle.config.ts` — Drizzle Kit config (requires `DATABASE_URL`, automatically provided by Replit)
- Exports: `.` (pool, db, schema), `./schema` (schema only)

Production migrations are handled by Replit when publishing. In development, we just use `pnpm --filter @workspace/db run push`, and we fallback to `pnpm --filter @workspace/db run push-force`.

### `lib/api-spec` (`@workspace/api-spec`)

Owns the OpenAPI 3.1 spec (`openapi.yaml`) and the Orval config (`orval.config.ts`). Running codegen produces output into two sibling packages:

1. `lib/api-client-react/src/generated/` — React Query hooks + fetch client
2. `lib/api-zod/src/generated/` — Zod schemas

Run codegen: `pnpm --filter @workspace/api-spec run codegen`

### `lib/api-zod` (`@workspace/api-zod`)

Generated Zod schemas from the OpenAPI spec (e.g. `HealthCheckResponse`). Used by `api-server` for response validation.

### `lib/api-client-react` (`@workspace/api-client-react`)

Generated React Query hooks and fetch client from the OpenAPI spec (e.g. `useHealthCheck`, `healthCheck`).

### `artifacts/coin-guard` (`@workspace/coin-guard`)

Coin Guard — a crypto tax, recovery, and insurance platform. React + Vite frontend.

- Sourced from the private `kaliprojexs/Coin-Guard` GitHub repository
- Entry: `src/main.tsx` — sets up `window.Buffer` polyfill (for Solana wallet compatibility), mounts React app
- Routing: `wouter` client-side router; pages in `src/pages/`
- UI: shadcn/ui components in `src/components/ui/`, Tailwind v4 via `@import "tailwindcss"`
- Aliases: `@` → `src/`, `@shared` → `shared/`, `@assets` → `attached_assets/`
- Shared schema: `shared/schema.ts` (copy of `lib/db/src/schema/index.ts`)
- Image assets: `attached_assets/` (154 images), `public/` (favicons, avatars, media)
- Buffer polyfill configured via `vite.config.ts`: `resolve.alias.buffer = "buffer/"` + `optimizeDeps.include: ["buffer"]`
- `pnpm --filter @workspace/coin-guard run dev` — run the dev server

**Apply Now UX Flow:**
1. Clicking "Apply Now" goes directly to ServicePicker ("What do you need?") — the "Register with us" intent screen is skipped (intent defaults to "direct")
2. After filling in the detail form and submitting, the user is redirected to `/app/onboarding?goal={service}` (insurance/tax/both)
3. The onboarding page reads the `?goal=` param via `useSearch()`, pre-selects the goal, and starts at step 1 (skipping the goal-selection step 0)
4. Onboarding goal cards no longer show pricing labels ($15/month etc. removed)

**Analytics (`src/lib/analytics.ts`):**
- Persistent `visitorId` stored in localStorage (cross-session deduplication)
- Device type detection (mobile/tablet/desktop) and browser detection
- Client-side bot detection (doesn't track headless browsers, crawlers)
- Time-on-page tracking via `page_leave` events sent on `beforeunload` and `visibilitychange`
- Extra metadata sent with all events: `visitorId`, `deviceType`, `browser`

### `scripts` (`@workspace/scripts`)

Utility scripts package. Each script is a `.ts` file in `src/` with a corresponding npm script in `package.json`. Run scripts via `pnpm --filter @workspace/scripts run <script>`. Scripts can import any workspace package (e.g., `@workspace/db`) by adding it as a dependency in `scripts/package.json`.
