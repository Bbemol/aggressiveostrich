# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project overview

Static HTML linktree-style website for the rock band **AGGRESSIVE OSTRICH unlimited inc.** Deployed via GitHub Pages (see `CNAME`). No build step, no package manager. Alpine.js is loaded via CDN for reactivity (the `simpleApi()` component is currently commented out).

## Running locally

Open any HTML file directly in a browser, or use a simple local server to avoid potential CORS issues with fonts:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

## Architecture

### Pages
- `index.html` — Main landing page: avatar, social icons (Instagram, email, Bandcamp), and cards linking to release sub-pages.
- `streaming-links-capsizing.html` — Release page for the single "Capsizing": lists streaming platform links (Spotify, Bandcamp, Deezer, Amazon Music, Apple Music, Tidal).

### Styles
- `styles/design-system.css` — All CSS custom properties (tokens): colors, fonts, spacing, radius, shadow, motion, layout. Font-face declarations live here too. **Edit tokens here first** before touching component styles.
- `styles/main.css` — Component styles that consume design tokens. Key components: `.profile`, `.social-links`, `.link-card`, `.ticker` (fixed scrolling banner at the bottom).

### Scripts
- `scripts/main.js` — Defines `simpleApi()`, an Alpine.js component that fetches links from a Strapi CMS (`strapiapp.com`). This dynamic section is currently **commented out** in both HTML files; links are hardcoded instead.

### Assets
- `assets/` — Streaming platform logos + custom fonts (Made Outer Sans, Motterdam, Linux Libertine).
- `img/` — Band avatar, background image, favicons, web manifest.

## Adding a new release page

1. Copy `streaming-links-capsizing.html` and rename it using a short keyword from the song title (e.g., `streaming-links-flies.html`, `streaming-links-toxic-guys.html`).
2. Update the `<title>`, `<h2>`, and streaming platform links inside the new file.
3. Update the ticker text: uppercase the song title, remove all spaces, and repeat it enough times to fill the full width in both `<p class="ticker__text">` tags. The second `<p>` uses `&nbsp;` to separate groups of repetitions. Double-check the result carefully — typos in long concatenated strings are easy to miss.
4. Add a new `<article class="link-card">` in `index.html`'s `<section class="links">` pointing to the new page.

## CSS conventions

CSS follows the **BEM** methodology (Block__Element--Modifier):

- **Block** — standalone component: `.profile`, `.social-links`, `.link-card`, `.ticker`, `.links`, `.page`
- **Element** (`__`) — part of a block: `.profile__avatar`, `.link-card__thumb`, `.ticker__track`
- **Modifier** (`--`) — variant of a block or element: `.link-card__main--center`, `.link-card__thumb--noFit`

Modifiers are applied to elements (not blocks in this codebase). Note that `.link-card__thumb--noFit` uses camelCase for the modifier name rather than kebab-case — keep that consistent when adding new modifiers.
