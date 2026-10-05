# WAMUNIGGA CUTS — Design System

**Brand:** WAMUNIGGA CUTS  
**Core idea:** THE ART OF THE CUT.  
**Direction:** RAW CRAFT × LUXURY DIGITAL

This document defines the reusable digital design system for the website.  
Implementations live in `app/globals.css`, `lib/design-system.ts`, and `components/*`.

---

## 1. Positioning & visual intent

The product should feel:

- premium, masculine, editorial, confident
- sophisticated, cinematic, modern
- culturally grounded without cliché

It must **not** feel like:

- a generic salon template
- SaaS / crypto / gaming UI
- flashy luxury kitsch
- African tourism tropes

Primary interface language is **monochrome**. Color accents are rare punctuation, not a theme.

---

## 2. Color tokens

| Token | Value | Role |
| --- | --- | --- |
| `background` | `#0A0A0A` | Page canvas |
| `ivory` / `foreground` | `#F2F0EB` | Primary text & key UI |
| `ivory-muted` | `rgba(242,240,235,0.72)` | Body emphasis |
| `ivory-subtle` | `rgba(242,240,235,0.45)` | Labels, secondary UI |
| `ivory-faint` | `rgba(242,240,235,0.12)` | Borders, dividers |
| `surface` | `#121212` | Quiet panels |
| `surface-elevated` | `#1A1A1A` | Slight lift |
| `surface-inset` | `#0E0E0E` | Recessed areas |
| `muted` | `#8A8780` | Captions / quiet meta |
| `accent` | `#651B2E` | Rare emphasis (CTAs, marks) |
| `champagne` | `#B69A62` | Rarest highlight |

**Rules**

- Default compositions: background + ivory only.
- Use `accent` for deliberate moments (never large washes).
- Use `champagne` even more sparingly than accent.
- Prefer opacity steps of ivory over introducing new hues.

---

## 3. Typography scale

**Display:** Oswald (condensed, editorial)  
**Body / UI:** DM Sans (legible modern sans)

| Variant | Use | Notes |
| --- | --- | --- |
| `display-xl` | Hero brand statements | Clamp 3.5–7.5rem, tight leading |
| `display-lg` | Major page titles | Clamp 2.75–5rem |
| `display-md` | Section openers / mobile nav | Clamp 2–3.25rem |
| `heading` | Section titles | Uppercase, tracked |
| `subhead` | Supporting lines | Medium weight sans |
| `body` | Long-form & UI copy | 1rem / 1.65 leading |
| `body-sm` | Dense supporting copy | 0.875rem |
| `label` | Nav, buttons, meta | Uppercase, wide tracking |
| `caption` | Quiet metadata | Lowest emphasis |

Primitive: `components/ui/text.tsx` + `.type-*` utilities.

---

## 4. Font weights

| Weight | Token | Typical use |
| --- | --- | --- |
| 400 | regular | Body, captions |
| 500 | medium | Display, headings, labels, buttons |
| 600 | semibold | Rare emphasis |
| 700 | bold | Avoid for large display; reserved |

Default editorial voice is **medium**, not heavy bold.

---

## 5. Spacing scale

4px base grid with editorial air at larger steps:

`0, 1 (4), 2 (8), 3 (12), 4 (16), 5 (20), 6 (24), 8 (32), 10 (40), 12 (48), 16 (64), 20 (80), 24 (96), 32 (128)`

Section spacing:

- Mobile: `5rem`
- Desktop (`lg+`): `8rem`
- Hero: `clamp(5rem, 12vh, 9rem)`

Use `Section` + `.section-space` rather than arbitrary padding.

---

## 6. Border radius strategy

Sharp geometry. Soft “pill” UI is intentionally out of system.

| Token | Value | Use |
| --- | --- | --- |
| `none` | `0` | Default for frames, buttons, surfaces |
| `hairline` | `1px` | Micro optical soften only if needed |
| `sm` | `2px` | Small controls (loading spinner) |
| `md` | `4px` | Absolute maximum |

No `rounded-full` buttons, chips, or cards as brand defaults.

---

## 7. Shadows

Depth is atmospheric, not glossy.

| Token | Role |
| --- | --- |
| `soft` | Occasional elevated media/panels |
| `lift` | Stronger hover lift (rare) |
| `inset` | Hairline inner edge on elevated surfaces |

No multi-layer neon glows. No colored shadows.

---

## 8. Surface treatments

| Treatment | Intent |
| --- | --- |
| `base` | Quiet panel on `#121212` |
| `elevated` | Slightly lighter + inset edge |
| `inset` | Recessed field |
| `hairline` | 1px ivory-faint border |
| `film` | Gradient veil over imagery |
| `grain` | Subtle texture overlay on imagery |

Prefer hairline surfaces over card grids. Cards are not the default layout language.

Primitive: `Surface`, CSS helpers `.surface-*`, `.image-grain`, `.surface-film`.

---

## 9. Button variants

| Variant | Role |
| --- | --- |
| `primary` | Ivory fill — default CTA |
| `secondary` | Outlined ivory — secondary action |
| `ghost` | Textual / tertiary |
| `accent` | Rare brand-color CTA |
| `champagne` | Rarest highlight outline |

Sizes: `sm` / `md` / `lg`  
States: hover (color + 1px lift), active, disabled, `isLoading`  
Interactive attribute: `data-cursor="interactive"`

---

## 10. Link styles

| Variant | Role |
| --- | --- |
| `inline` | In-copy links |
| `nav` | Header / menu items |
| `cta` | Textual call-to-action |
| `quiet` | Lowest emphasis |

External links disclose new-tab behavior for assistive tech.

---

## 11. Image treatments

- Frames are sharp, clipped, editorial.
- Aspects: `portrait`, `landscape`, `square`, `cinematic`.
- Treatments: plain / film / grain / film-grain.
- Hover: restrained scale `1.03` inside overflow-hidden frame.
- Reveals: clip-path entrance via `RevealImage`.
- Performance conventions remain in `lib/images.ts` + `MediaImage`.

Do not use floating collage cards or tourism montage layouts.

---

## 12. Section spacing

Use `Section` with:

- `spacing="default"` — standard vertical rhythm
- `spacing="hero"` — first-viewport breathing room
- `spacing="none"` — custom compositions only

One job per section: one headline, one supporting idea.

---

## 13. Container widths

| Width | Max | Use |
| --- | --- | --- |
| `narrow` | `48rem` | Editorial text columns |
| `default` | `72rem` | Most sections |
| `wide` | `80rem` | Media-forward bands |
| `full` | fluid | Full-bleed edges |

Gutters: `1.25rem` → `1.5rem` → `2rem` → `2.5rem` across breakpoints.

---

## 14. Responsive behavior

Mobile-first breakpoints: `xs 375` · `sm 640` · `md 768` · `lg 1024` · `xl 1280` · `2xl 1536`

| Concern | Behavior |
| --- | --- |
| Navigation | Hamburger + full-screen overlay `< lg`; inline nav `lg+` |
| Type | Fluid clamp for display sizes |
| Section space | Increases at `lg` |
| Cursor | Desktop fine-pointer only |

---

## 15. Motion principles

Motion communicates **quality**, not spectacle.

**Use**

- subtle opacity/translate reveals
- image clipping reveals
- smooth media hover transforms
- understated page/section entrances
- short editorial staggers
- subtle desktop cursor state changes

**Avoid**

- excessive parallax
- bounce / springy UI
- constant floating loops
- unnecessary 3D
- animating every element

Tokens: `lib/animation.ts`  
Primitives: `FadeIn`, `Stagger`, `RevealImage`, `MotionProvider` (`reducedMotion="user"`).

---

## 16. Hover states

- Buttons: color shift + `1px` translate lift
- Links: ivory brightening / underline where appropriate
- Media frames: slow scale to `1.03`
- No aggressive bounce or glow blooms

---

## 17. Focus states

- Global `:focus-visible` ivory ring, 2px / 3px offset
- Component helper: `focusRingClass`
- Never remove focus styles for custom cursor aesthetics

---

## 18. Loading states

- Buttons: replace label with quiet spinner (`aria-busy`)
- Content: `Skeleton` with restrained shimmer (no bounce)
- Prefer skeleton structure that matches final layout to reduce CLS

---

## 19. Cursor behavior (desktop)

- Enabled only when `(hover: hover) and (pointer: fine)`
- Disabled for touch / coarse pointers and `prefers-reduced-motion`
- Smooth follow via lerp; expands over interactive targets
- Uses `mix-blend-difference` for subtle contrast
- Does not capture pointer events; native focus/keyboard remain intact
- Body sets `data-custom-cursor="true"` only while active

Primitive: `CustomCursor`

---

## 20. Mobile navigation behavior

- Toggle labeled Menu / Close with clear `aria-expanded`
- Full-screen overlay dialog; Escape closes; body scroll locks
- Editorial staggered list entrance
- Enabled routes are links; planned routes render as muted non-interactive labels until pages ship
- Desktop (`lg+`) uses inline primary nav for enabled routes only

Primitive: `MobileNav` + sticky `SiteHeader`

---

## Implementation map

| Concern | Location |
| --- | --- |
| CSS tokens & utilities | `app/globals.css` |
| JS token mirror | `lib/design-system.ts` |
| Motion tokens | `lib/animation.ts` |
| UI primitives | `components/ui/*` |
| Layout primitives | `components/layout/*` |
| Media | `components/media/*` |
| Motion / cursor | `components/motion/*` |
| Phase 1 demo (temporary) | `sections/design-system-showcase.tsx` |

---

## Phase boundary

Phase 1 establishes the **system**.  
It does **not** deliver the finished homepage, booking flow, or real brand photography.

When Phase 2 begins, replace the temporary showcase with homepage composition built from these primitives.
