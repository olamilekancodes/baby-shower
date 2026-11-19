# CLAUDE.md

**Oh, Baby!** is a baby shower invitation site built as a React 19 + Vite + TypeScript single-page app,
in soft pink and blue. It should feel calm and refined, not childish.

- **Landing.** A single pearl floats in a hush of pink and blue light. Tapping it cracks and shatters
  it, then a blue flame sweeps in from the left and a pink flame from the right. They meet in the
  middle and rise as a lilac plume, and the invitation fades in.
- **Sections.** Quiet editorial bands follow: intro, details, countdown, pink-or-blue guess,
  schedule, gifts and RSVP.

## Commands

```sh
npm run dev       # dev server on http://localhost:5173
npm run lint      # oxlint
npx tsc -b        # typecheck
npm run build     # tsc -b && vite build → dist/
npm run preview   # serve the production build
```

Before committing or deploying, run `npx tsc -b && npm run lint && npm run build`. All three must pass with
no warnings.

## Stack

- React 19 and strict TypeScript, built with Vite. Import from `src/` through the `@/` alias.
- **Styling: plain CSS Modules.** Each component has a `<name>.module.css` next to it.
  `src/styles/global.css` holds the design tokens and reset. No Tailwind, CSS-in-JS or UI kits.
- **Animation: Motion (`motion/react`).**
  - Enter and in-view transitions, and word-split headings.
  - The imperative shard and flash `animate()` calls in the break sequence.
  - Scroll-linked effects (`useScroll` / `useTransform`): the intro circles meeting and the timeline
    fill.
  - Countdown arcs, the guess fill (`clipPath`), magnetic buttons and toasts.
- **Hand-written canvas loops**, for performance and time-based physics:
  - the flames: `features/pearl-hero/utils/flame-engine.ts`;
  - the confetti: `features/confetti/utils/confetti-engine.ts`.

  Both step on elapsed time, not frame count, so they look the same on 60 Hz and 120 Hz screens and
  still play fully after a backgrounded tab returns.
- **CSS keyframes** cover small ambient loops: aura breathing, pearl float, halo, iridescent spin, crack
  tremble, cue drip and the footer circles.
- **Forms: Formspree** (`features/rsvp/api/submit-rsvp.ts`).

## Architecture: feature folders

```text
src/
├── main.tsx              # entry
├── app/                  # app composition (App, footer)
├── features/<feature>/   # one folder per capability
│   ├── index.ts          # public entry; the only import path from outside the feature
│   ├── containers/       # smart: <name>.container.tsx (state, effects, data, handlers)
│   ├── components/       # dumb: <name>.tsx + <name>.module.css (props in, markup out)
│   ├── hooks/            # use-<name>.ts
│   ├── api/              # network calls only (<verb-noun>.ts)
│   ├── types/  utils/
├── components/           # shared presentational pieces used by 2+ features
├── hooks/  lib/          # shared hooks; content (event.ts), easing, maths
└── styles/global.css     # design tokens + base styles
```

| Feature | What it owns |
|---|---|
| `pearl-hero` | The landing: pearl, fault lines and shards, cracks, flames, the closed and open panels, the pointer-following highlight |
| `confetti` | Full-screen confetti canvas and `useConfetti()` (`shower`) via context |
| `intro` | "A little of each of us" with the pink and blue circles that slide together as you scroll |
| `details` | Editorial rows (date, time, place, dress) with copy address and a toast |
| `countdown` | Light serif numbers in pink-to-blue gradient rings |
| `guess` | Pink or blue: a circular colour fill from the click point, remembered in `localStorage` |
| `schedule` | The afternoon timeline with a scroll-filled gradient line |
| `gifts` | Three quiet gift cards with line icons |
| `rsvp` | Form, validation, Formspree submission and the thank-you state |

Rules:

- **Imports.** Code outside a feature imports it only through `@/features/<name>`. Inside a feature, use
  relative imports and never `../../` out of it.
- **Shared code.** `components/`, `hooks/` and `lib/` never import from `features/` or `app/`. Promote code
  to the shared area only when a second feature needs it.
- **Containers vs components.**
  - Containers own logic and render components.
  - Components never call `fetch` or import `api/`.
  - Components may keep purely visual state, such as the guess fill origin, timeline progress or a
    ring's wrap detection.
- **Network calls** live only in `features/*/api/`.
- **Naming.** Every file and folder is lowercase kebab-case, including each dot-separated part
  (`open-panel.tsx`, `pearl-hero.container.tsx`). Identifiers keep normal casing.
- **Size.** Keep components to roughly 150 lines. Split them rather than growing them.
- **Comments.** Write clean code without commentary. Add a comment only for a non-obvious why.

## Content

- Dates, venue, detail rows, schedule and gifts live in `src/lib/event.ts`. Edit content there, never
  inline.
- The hero copy lives in `closed-panel.tsx` and `open-panel.tsx`.
- Everything is placeholder content until the hosts confirm it.

## Design system

- **Palette.**
  - Light pink (`--pink`, `--pink-soft`, `--pink-deep`) and light blue (`--blue`, `--blue-soft`,
    `--blue-deep`). Lilac (`--lilac`, `--lilac-deep`) is the colour where they meet.
  - Text is a deep plum (`--ink`, `--ink-soft`) on `--paper`.
  - Use tokens and never hard-code colours in components. The only exceptions are canvas sprites, the
    confetti palette and `public/favicon.svg`.
- **Tone.** Refined, not babyish. No cartoon balloons, rattles, prams, blocks, bubbles or mobiles.
  Motifs stay abstract: two circles meeting, light, the pearl.
- **Type.**
  - Fraunces (`--font-display`) at weight 300–400, with italic for emphasis.
  - Manrope (`--font-body`) for body text.
  - Uppercase labels use letter-spacing of 0.24em or more.
- **Motion principles** (Emil Kowalski's design-engineering guidance):
  - Use the custom ease-out curves in `src/lib/easing.ts`.
  - Never animate from `scale(0)`.
  - Pressables scale to about 0.96–0.97.
  - Hover effects apply only under `(hover: hover) and (pointer: fine)`.
  - Respect `prefers-reduced-motion`. With reduced motion:
    - the pearl opens instantly with no flames;
    - confetti is disabled;
    - CSS loops have reduced-motion overrides;
    - `MotionConfig reducedMotion="user"` wraps the app.

## RSVP / Formspree

- Replies are posted as JSON to `https://formspree.io/f/<VITE_FORMSPREE_FORM_ID>`.
- Formspree emails each submission to the form owner. That must be **cyprusakanni@gmail.com**: create
  the form while signed in with that address, or set it as the target email.
- Put the ID in `.env.local` locally (copy `.env.example`) and in Vercel's environment variables in
  production.
- Without the ID, the form shows a friendly "not switched on yet" message.

## Deploying (Vercel)

1. Push to GitHub, then go to Vercel **Add New → Project**. Vite is detected automatically: the build
   command is `npm run build` and the output folder is `dist`.
2. Add `VITE_FORMSPREE_FORM_ID` under **Settings → Environment Variables**, then redeploy.
3. Or deploy from the CLI with `npx vercel --prod`.

## Accessibility

- Semantic HTML, with a visible lilac `:focus-visible` ring.
- The pearl is a real `<button>`, so Enter and Space break it. Inactive hero panels are `inert`.
- Decorative layers (aura, canvases, shards, circles) are `aria-hidden`.
- Text split into words for animation keeps an `aria-label` with the full text.
