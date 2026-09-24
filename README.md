# RaaD — Adaptive Dark Mode Landing Page

[![Quality](https://github.com/kooroosh1363/Landing-Page-Dark-Mode-1/actions/workflows/quality.yml/badge.svg)](https://github.com/kooroosh1363/Landing-Page-Dark-Mode-1/actions/workflows/quality.yml)
[![Deploy](https://github.com/kooroosh1363/Landing-Page-Dark-Mode-1/actions/workflows/pages.yml/badge.svg)](https://github.com/kooroosh1363/Landing-Page-Dark-Mode-1/actions/workflows/pages.yml)

RaaD modernizes the original 2023 dark-mode landing page into a responsive, dependency-free frontend demo with explicit theme state, persistent preference, live operating-system theme awareness, automated tests, and GitHub Pages deployment.

## Theme model

The page supports three preferences:

```text
system -> light -> dark -> system
```

`system` follows `prefers-color-scheme`. Explicit light/dark choices are persisted with defensive `localStorage` access.

## Improvements

- one stable DOM tree instead of cloning the whole page on every theme change
- system/light/dark preference model
- live OS theme changes in system mode
- persistent explicit preference
- responsive navigation
- accessible theme and menu controls
- semantic section links
- reduced-motion support
- no external fonts, icon libraries, or runtime scripts
- zero runtime dependencies
- large legacy hero image removed
- Node tests and GitHub Actions
- verified GitHub Pages workflow

## Why remove page cloning?

The original theme transition duplicated the full DOM, swapped classes, waited for an animation, and removed the previous tree. That made state and element references harder to reason about.

The current implementation changes only `data-theme` and `data-theme-preference` on the root document.

## Run locally

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Quality

Node.js 20+:

```bash
npm run check
```

Tests cover theme normalization, system resolution, explicit overrides, preference cycling, accessible control copy, navigation targets, and absence of third-party runtime dependencies.

## Performance

The original repository included an approximately 11 MB hero JPG. The modern version replaces it with a CSS-rendered visual, reducing repository and page payload while keeping the design theme-aware.

## Scope

This is intentionally a frontend landing-page demo. It does not include authentication, backend forms, analytics, or a framework.

## License

No license is currently included. Add one before redistributing the code as reusable software.
