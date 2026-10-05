# WAMUNIGGA CUTS

Premium digital presence for **WAMUNIGGA CUTS** — *The Art of the Cut.*

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS v4 (design tokens in `app/globals.css`)
- Framer Motion (subtle premium motion)
- Mobile-first layout primitives

## Scripts

```bash
npm run dev        # local development
npm run lint       # ESLint
npm run typecheck  # TypeScript
npm run build      # production build
npm run start      # serve production build
```

## Structure

```
app/                 # routes + global styles
components/          # ui, layout, media, motion primitives
sections/            # page sections (Phase 1+)
data/content/        # brand + IA content (replace with real copy later)
hooks/               # client hooks
lib/                 # tokens helpers: seo, animation, a11y, images, fonts
public/images/       # photography assets
public/icons/        # brand icons
```

## Phase status

**Phase 3 — editorial homepage hero.** Full-bleed cinematic hero with brand, CTAs, reveal, and scroll motion.  
Add real photography at `public/images/hero.jpg` and set `heroContent.image.src`.
