# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start dev server at http://localhost:3000
npm run build    # Production build (Turbopack)
npm run start    # Start production server
npm run lint     # ESLint check
npx tsc --noEmit # TypeScript check without emitting
```

## Stack

- **Framework**: Next.js 16 (App Router, Turbopack, static prerendering)
- **Styling**: Tailwind CSS v4 — utility classes + CSS custom properties in `app/globals.css`
- **Animations**: Framer Motion 12 — all motion via `motion.*` and `useInView`
- **Icons**: lucide-react
- **Fonts**: `@fontsource/sora` (headings) + `@fontsource/inter` (body) — imported in globals.css, no next/font

## Design System (globals.css)

All colors are CSS variables on `:root`:
- `--cyan` (`#00F2FF`) — primary, buttons, borders, active states
- `--gold` (`#FF9933`) — accent, 2047 mission highlights
- `--space` (`#0A192F`) — base background
- `--space-mid` (`#112240`) — card backgrounds
- `--glass` — glassmorphism base
- `--border` / `--border-hover` — thin 1px border system

Reusable CSS utility classes: `.glass`, `.glass-hover`, `.btn-cyan`, `.svg-grid`, `.bento-tile`, `.float-anim`, `.ken-burns`, `.text-gradient-cyan`, `.text-gradient-gold`.

## Architecture

```
app/
  layout.tsx          # Root layout — imports globals.css, Navbar, WhatsAppButton
  globals.css         # Full design system (variables, animations, utilities)
  page.tsx            # Home: Hero + ComparisonSlider + BentoGrid
  services/page.tsx   # Services: FlowChart + PhoneMockup + PulsingCPU
  sme-advantage/page.tsx  # Pricing + Countdown to 2047 + CostComparison
  contact/page.tsx    # Multi-step SmartQuoteForm (3 steps + success state)
components/
  Navbar.tsx          # Sticky glassmorphic nav, scroll-aware, mobile menu
  WhatsAppButton.tsx  # Fixed floating WhatsApp CTA with pulse ring
  FadeIn.tsx          # FadeIn + StaggerChildren + fadeUpItem (Variants)
  VectorArrow.tsx     # Animated SVG dot-grid arrow (hero visual)
```

## Key Patterns

- All pages are `"use client"` because of framer-motion and interactive state.
- **Enterprise Alignment**: All headlines (H1/H2), labels, and success states must be **left-aligned**. Avoid `text-center`.
- **Hero Layout**: Use a 60/40 asymmetric split (Text 1.5fr, Visual 1fr).
- **Gold Usage**: Ashoka Gold (`--gold`) is reserved **strictly** for mission-critical indicators (2047 countdown) and actionable success markers.
- **Subtext**: All subtext must use 70% opacity (`rgba(..., 0.7)` via `--text-secondary` or `--text-muted`).
- **Section Padding**: Standardized to `py-32`. Use `bg-gradient-to-b` for vertical transitions between sections.
- `FadeIn` + `StaggerChildren` from `components/FadeIn.tsx` for scroll-triggered reveals.
- `fadeUpItem` is typed as `Variants` — the `ease` must be `[0.22, 1, 0.36, 1]`.
- Inline style props are used alongside Tailwind when CSS variables are needed.
- WhatsApp phone number is hardcoded as `919999999999` — replace before production.
- The Countdown component in `sme-advantage` targets August 15, 2047 (IST, `+05:30`).
