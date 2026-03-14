# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Blinko Analytics marketing website — a React SPA deployed to GitHub Pages at `/blinko/` base path.

## Tech Stack

- React 19 + TypeScript (strict mode)
- Vite 7 (build tool)
- Tailwind CSS 3 (dark theme with custom brand tokens)
- React Router DOM 7 (client-side routing, lazy-loaded pages)
- Animation: Framer Motion, GSAP, Three.js (3D particle effects)

## Commands

```bash
npm run dev        # Start dev server (localhost:5173)
npm run build      # TypeScript check + Vite production build
npm run lint       # ESLint
npm run preview    # Preview production build locally
npm run deploy     # Deploy to GitHub Pages (gh-pages -d dist)
```

## Architecture

### Content-Driven Design

**`src/config/site.config.ts`** is the master content configuration file. All site copy, navigation links, product definitions, pricing tiers, team members, testimonials, and contact info are defined here. To update site content, edit this file — not the React components.

Other config files:
- `src/config/particles.config.ts` — 3D particle effect settings per product section (shape type, colors, rotation)
- `src/config/grid.config.ts`, `src/config/shapes.config.ts` — visual layout configs

### Routing

- All routes use `/blinko/` as base path (set in `vite.config.ts` and `App.tsx` BrowserRouter)
- Pages are lazy-loaded via `React.lazy()` with `Suspense` and a `PageShell` fallback
- Hash-links (e.g., `/#about`) navigate to HomePage first, then scroll to the section via sessionStorage
- `ScrollToTop` component resets scroll on route changes (except demo pages)
- `404.html` in public handles SPA routing fallback for GitHub Pages

### Styling

- Tailwind with custom brand colors: `brand-cyan`, `brand-blue`, `brand-green`, `brand-panel`, `brand-bg`
- Custom fonts: Syne (display), DM Sans (body) — loaded from Google Fonts
- CSS variables defined in `src/index.css` for backward compatibility
- Custom animations: `pulse-slow`, `float`, `glow` (defined in `tailwind.config.js`)
- Dark glassmorphism aesthetic throughout

### Particle System

The 3D particle system (`src/components/Particle*.tsx`) uses Three.js for geometry sampling and renders interactive particle shapes. Configuration is in `particles.config.ts` with support for builtin shapes (sphere, torus, cube, helix), SVG paths, and GLB 3D models.

### Build Optimization

Vite config includes manual chunk splitting: `three`, `framer-motion`, `gsap`, and `react-router` are separate vendor chunks. Shared layout components (Navbar, Footer) are also chunked separately. Chunk size warning limit is 800KB.

### Key Directories

- `src/pages/` — Route-level page components (HomePage, ProductsPage, PricingPage, etc.)
- `src/components/` — Reusable UI and animation components
- `src/config/` — Centralized site content and visual configs
- `src/hooks/` — Custom hooks (e.g., `useFadeIn` for intersection observer animations)
- `src/lib/` — Utilities (`cn()` helper, Three.js point samplers)
- `public/leadership/` — Team member photos
- `public/models/` — GLB 3D model assets

## TypeScript

Strict mode is enabled with `noUnusedLocals` and `noUnusedParameters`. Target is ES2022.
