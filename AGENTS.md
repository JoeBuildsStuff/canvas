# Repository Guidelines

## Project Structure & Module Organization
- `src/app` — Next.js App Router pages, `layout.tsx`, `globals.css`.
- `src/app/canvas` — core canvas feature: state in `lib/store/canvas-store.ts`, connection system under `lib/connection`, UI in `components/**`, examples in `examples/*.json`.
- `src/components` — shared UI primitives (Shadcn/Radix-based).
- `src/lib` and `src/hooks` — utilities and React hooks.
- `public` — static assets. Use `@/*` path alias from `tsconfig.json`.

## Build, Test, and Development Commands
- Install: `pnpm i` (preferred). Alternatives: `npm i` or `yarn`.
- Dev server: `pnpm dev` → runs Next.js locally at `http://localhost:3000`.
- Build: `pnpm build` → production build in `.next/`.
- Start: `pnpm start` → serve the production build.
- Lint: `pnpm lint` → ESLint with Next core-web-vitals.

## Coding Style & Naming Conventions
- TypeScript strict mode; React 19 function components.
- Indentation: 2 spaces; keep semicolons; prefer const/immutable patterns.
- File naming: Components `PascalCase.tsx` (e.g., `Canvas.tsx`), hooks `use-x.ts`, utils `kebab-case.ts`.
- Exports: default for single-component files; named for utilities.
- Styling: Tailwind CSS v4 utilities in JSX; avoid ad-hoc CSS files.

## Testing Guidelines
- No test suite yet. When adding tests:
  - Unit: Vitest + React Testing Library in `src/__tests__` or alongside files as `*.test.tsx`.
  - E2E: Playwright under `e2e/`.
  - Aim for meaningful coverage around `canvas-store` and `lib/connection` logic.
  - Example: `pnpm vitest` or `pnpm playwright test` once configured.

## Commit & Pull Request Guidelines
- Commits: imperative subject (≤72 chars), concise body explaining the why.
  - Example: `feat(canvas): add elbow line routing with markers`.
- PRs: clear description, linked issues (`Closes #123`), screenshots/GIFs for UI, reproduction steps, and notes on risk/rollout.
- Checks before merge: `pnpm lint` passes; app builds (`pnpm build`).

## Agent Notes
- Keep changes minimal and scoped; avoid unrelated refactors.
- Follow file organization above; update docs/examples when altering `src/app/canvas` behavior.
- Prefer small PRs with rationale; include example JSON under `src/app/canvas/examples` when adding new shapes/flows.
