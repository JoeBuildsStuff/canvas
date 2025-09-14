# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

## Project Overview

Canvas is a Next.js 15 application using the App Router with TypeScript and Tailwind CSS v4. The project follows modern React patterns and is currently in its initial state with the default Next.js template.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with PostCSS
- **Fonts**: Geist Sans and Geist Mono (via next/font/google)
- **Linting**: ESLint with Next.js configuration
- **Package Manager**: pnpm (based on pnpm-lock.yaml)

## Essential Commands

### Development
```bash
pnpm dev          # Start development server (localhost:3000)
pnpm build        # Build for production
pnpm start        # Start production server
pnpm lint         # Run ESLint
```

### Package Management
```bash
pnpm install      # Install dependencies
pnpm add <pkg>    # Add production dependency
pnpm add -D <pkg> # Add dev dependency
```

## Architecture & Structure

### App Router Structure
```
src/app/
├── layout.tsx    # Root layout with fonts and metadata
├── page.tsx      # Home page component
├── globals.css   # Global styles with Tailwind imports
└── favicon.ico   # Favicon
```

### Key Configuration Files
- `next.config.ts` - Next.js configuration (minimal setup)
- `tsconfig.json` - TypeScript config with path aliases (`@/*` → `./src/*`)
- `tailwind.config.*` - Currently using Tailwind v4 inline configuration
- `postcss.config.mjs` - PostCSS with Tailwind plugin
- `eslint.config.mjs` - ESLint flat config with Next.js rules

### Styling System
- **Tailwind v4**: Uses new `@theme inline` syntax in globals.css
- **CSS Variables**: Custom properties for background/foreground colors
- **Dark Mode**: System preference support via CSS media queries
- **Typography**: Geist font family with CSS variables

## Development Patterns

### Component Structure
- React functional components with TypeScript
- App Router components use async/await for data fetching when needed
- Path aliases configured for cleaner imports (`@/` prefix)

### Styling Approach
- Tailwind utility-first CSS
- CSS custom properties for theming
- Dark mode support built-in
- Font optimization through next/font/google

### TypeScript Configuration
- Strict mode enabled
- ES2017 target for modern browser support
- ESNext modules with bundler resolution
- Next.js plugin for enhanced TypeScript experience

## Project Context

This appears to be a clean Next.js starter setup, likely intended for building a canvas or drawing application based on the project name. The project is currently at the template stage with no custom components or business logic implemented yet.