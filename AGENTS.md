<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# WAMUNIGGA CUTS — ENGINEERING RULES

## Product

Wamunigga Cuts is a premium barbering brand and booking experience.

The website must feel like a premium personal brand, not a generic barbershop template.

## Design

Primary visual direction:

**RAW CRAFT × LUXURY DIGITAL**

Prefer:

- editorial layouts
- strong typography
- real photography
- generous whitespace
- restrained motion
- premium interactions
- monochrome foundations

Avoid:

- generic gradients
- excessive rounded cards
- SaaS-style dashboards
- excessive shadows
- unnecessary glassmorphism
- excessive animation
- fake photography
- invented business claims

## Engineering

- TypeScript
- reusable components
- semantic HTML
- accessible interactions
- mobile-first
- performance-conscious
- no unnecessary dependencies
- no duplicated business logic
- centralize content/configuration
- never hardcode business data unnecessarily

## Content

Never invent:

- prices
- opening hours
- address
- phone numbers
- biographies
- celebrity clients
- testimonials
- statistics

Use placeholders/data structures until verified information is available.

## Motion

Motion must enhance hierarchy and perceived quality.

Respect `prefers-reduced-motion`.

Never make animation necessary to understand or use the website.

## Workflow

Implement one phase at a time.

After each phase:

1. Run lint.
2. Run typecheck.
3. Run production build.
4. Review changed files.
5. Summarize implementation.
6. Provide known issues.
7. Provide exact commit message.
8. **STOP.**

Never automatically continue to the next phase.

Wait for explicit user instruction:

`PROCEED TO PHASE X`
