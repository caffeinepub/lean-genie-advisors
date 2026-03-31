# Lean Genie Advisors Inc. — Indigo-White Redesign

## Current State
- Theme: Aqua/teal OKLCH color scale (`aqua-*` tokens in Tailwind, CSS vars using oklch(0.56 0.16 195))
- Hero: dark teal gradient overlay on network image, aqua accent text, motion animations
- Header: sticky `bg-white/90`, `border-b border-border/60`, no shadow, links use `text-muted-foreground hover:text-foreground`, height `h-18`
- Careers: single centered column (`max-w-2xl`), basic form card
- Contact: already 2-col `[1.4fr,1fr]` with 3 info cards at top
- Footer: 3-col grid (Brand / Navigation / Focus Areas), `bg-slate-950`
- Section spacing: `py-24 md:py-32` (96px/128px) — adequate

## Requested Changes (Diff)

### Add
- Indigo CSS color scale in Tailwind: `indigo` tokens mapped to `#4B0082` base
- Hero: new professional consulting-style background image `/assets/generated/hero-indigo-consulting.dim_1600x800.jpg` with deep indigo gradient overlay
- Hero: subtle particle/grid animation overlay for visual interest
- Header: `shadow-sm` drop shadow, link hover effects (indigo color + optional underline), premium spacing
- Careers: left column with intro text, icons, value props; right column retains form
- Footer col 3: Brand Statement content (mission/values tagline, social icons)
- Footer col 1: Contact Info (email, location, hours with icons)
- Footer col 2: Quick Links (nav links)
- Consistent indigo accent on all section dividers, CTA buttons, headings

### Modify
- `index.css` CSS custom properties: shift `--primary` from aqua to indigo (#4B0082 → oklch equivalent)
- `tailwind.config.js`: add `indigo` color scale, replace aqua-based primary references
- All `aqua-*` accent classes → `indigo-*` equivalents across App.tsx
- Hero: switch gradient overlay from teal to deep indigo/purple tones
- Header nav links: add `hover:text-indigo-700` and transition effects
- Section headings: change from `text-aqua-600` to `text-indigo-700`
- CTA Buttons: from `bg-aqua-500` to `bg-indigo-700 hover:bg-indigo-600`
- Cards/accents: aqua borders/backgrounds → indigo equivalents
- Careers section: convert from single-column centered to two-column grid (left intro, right form)
- Contact section: strengthen CTA heading, ensure email/location icons are prominent
- Footer: replace "Focus Areas" col with Brand Statement col; add Contact Info col; rename Navigation → Quick Links

### Remove
- All aqua-specific CSS custom properties and Tailwind tokens (replaced by indigo)
- `.hero-accent-text` aqua color — replace with indigo/violet glow
- `shadow-glow-*` aqua glow effects — replace with indigo glow equivalents

## Implementation Plan

1. **Tailwind config**: Add `indigo` color scale with #4B0082 base, define shades 50–900
2. **index.css**: Update CSS custom properties to indigo OKLCH values; update `--primary`, `--accent`, gradient-text, hero-accent-text, shadow-glow-* utilities
3. **Header**: Add `shadow-md` to header, change link hover to `hover:text-indigo-700`, add `transition-colors duration-200`, upgrade spacing
4. **Hero**: Swap background image to hero-indigo-consulting, update gradient overlay to indigo/purple, update accent span color
5. **All sections**: Replace `aqua-*` → `indigo-*` class names systematically across all sections
6. **Careers section**: Restructure to `grid lg:grid-cols-2` — left: intro heading, bullets with icons, why join us; right: existing form card
7. **Contact section**: Ensure prominent email/location icons, stronger CTA heading text
8. **Footer**: Restructure to 3 cols: (1) Contact Info with icons for email/location/hours, (2) Quick Links nav list, (3) Brand Statement with tagline and social icons
9. **Section spacing**: Verify all sections have `py-20 md:py-28` or more (80-112px)
