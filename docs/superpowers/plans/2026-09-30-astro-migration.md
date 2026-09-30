# Astro Migration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Migrate the portfolio site from a React 18 + Vite SPA to Astro static output (SSG) with React islands for the interactive parts, without changing the deployed look, content, or Ionos SFTP deploy path.

**Architecture:** Astro renders every page to static HTML at build time (file-based routing under `src/pages/`, output to `dist/`). react-router-dom is removed entirely. Five components stay interactive as React islands (`ThemesToggler`, `NavMenu`, `Eyes`, `Projects`, `LegalModals`); everything else becomes plain `.astro` markup. The 4-theme system moves off React Context (which can't cross island boundaries) onto `document.documentElement.className` + `localStorage`, set by a blocking inline `<head>` script to avoid FOUC.

**Tech Stack:** Astro (static output) + `@astrojs/react` integration, React 18 (islands only), Sass (native Astro support), pnpm. No TypeScript, no PWA plugin, no test framework added — Node's built-in `node:test` covers the plan's few pure-logic modules.

**Spec:** `/home/marcus/.claude/plans/weitermachen-snoopy-dusk.md` (approved architecture design; this plan implements it and corrects one bug found while detailing it — see Global Constraints).

## Global Constraints

- **JavaScript only** — no TypeScript is introduced anywhere in this migration.
- **No PWA** — do not add `vite-plugin-pwa` or a `<link rel="manifest">`; `public/site.webmanifest` stays in place, unreferenced, unchanged (parity with current state).
- **Package manager: pnpm.** Use `pnpm add` / `pnpm remove` / `pnpm run`; `pnpm-lock.yaml` is the lockfile of record.
- **Node.js:** Astro requires Node `^18.20.8 || ^20.3.0 || >=22.0.0`. Local dev node is v24.18.0 (OK). CI (`.github/workflows/ionos.yml`) pins `node-version: 20` via `actions/setup-node@v4`, which resolves to a current 20.x satisfying `^20.3.0` — **no CI workflow change needed.**
- **Deploy target unchanged:** `astro build` must emit to `dist/` (Astro's default `outDir`) so the existing CI `path: dist` upload step and the SFTP `target: "public"` step keep working untouched.
- **Astro output format: default (`directory`)**, e.g. `/about` → `dist/about/index.html`. This lets Ionos serve clean URLs (`/about`) with no server rewrite rule, matching how the SPA's routes looked from the outside.
- **Global Sass injection:** replicate the current `vite.config.js` behavior — `@use "<path>/index" as *;` prepended to every `.scss` file — via `astro.config.mjs`'s `vite.css.preprocessorOptions.scss.additionalData`. Styles move from `src/assets/sass/` to `src/styles/`, so the string becomes `@use "/src/styles/index" as *;`.
- **Corrected design: theme class lives on `<html>`, not `<body>`.** The original spec said "inline script sets `document.body.className`". A classic blocking `<script>` in `<head>` runs *before* `<body>` exists in the DOM, so `document.body` is `null` at that point — setting it there would silently no-op and FOUC would still happen. The fix: the theme class goes on `document.documentElement` (`<html class="day">`, etc.), and all four theme SCSS files select `html.<theme>` instead of `body.<theme>`. This is a correction to the approved spec, not a deviation from it — logged here per plan-authoring rules, no separate user approval needed since it doesn't change any visible behavior.
- **`src/components/Footer/Datenschutz.jsx` is READ-PROTECTED** by `.claude/settings.json` (`"deny": ["Read(./src/components/Footer/Datenschutz.jsx)"]`) — it contains a home address. **Never read, move, or rewrite this file.** It is imported unmodified, at its current path, into the new `LegalModals.jsx` island. `Impressum.jsx` is kept unmodified and imported the same way (both are legal text where accuracy matters — no transcription, ever).
- **Removed for good** (confirmed unused or replaced): `react-router-dom`, `react-spring`, `web-vitals`, `vite-plugin-pwa`, `useResponsiveSize.jsx`, `useSvgUpdate.jsx`, `ThemesContext.jsx`, `useThemeSetter.jsx`, `InterpolatedWave.jsx` (already dead — commented out in `Footer.jsx`), `ErrorPage.jsx`, `vite.config.js`, `index.html`, `main.jsx`, `App.jsx`/`App.scss` (folded into `BaseLayout.astro`). `@popperjs/core` is removed after Task 12 confirms it's unused.
- **Branch:** all work happens on `feat/astro-migration` in the worktree at `.claude/worktrees/feat+astro-migration/`. Never commit to `main`.
- **Commits:** Conventional Commits, short subject lines, one commit per task (a task may be more than one commit if a step-group says so).
- **Review:** `/code-review` runs after every task, not just at the end (per the human's explicit request) — this happens in the task loop, not only in this skill's own Final Review stage.

## Review Focus

- **Corrupted/unknown value in `localStorage.theme`** (invalid JSON, or a theme name that no longer exists) — a reasonable user reloading an old tab must still get a themed page (default `day`), not a crash or an unstyled page. Covered by `resolveInitialTheme` tests in Task 2.
- **Direct load of a non-root route** (`/about`, `/projects/`, or a nonexistent path) — with the client router gone, this must be a real server-side static file (or a real 404), not a blank page. Covered by the curl/grep checks in Task 12.
- **The `#modal-root` portal target must exist in the server-rendered HTML before any island hydrates** — `Overlay` (used by `Projects` and `LegalModals`) calls `createPortal(..., document.getElementById("modal-root"))`, which throws if the element is missing. Covered in Task 4 (grep check) and exercised functionally in Tasks 10–11.
- **Footer "next page" button must wrap around from the last nav link to the first**, and must not throw if the current path doesn't match any nav link. Covered by `getNextPath` tests in Task 2.
- **Nav active-link state must be correct for every route, including the home route (`to: ""`)**, where naive string concatenation (`"/" + to`) produces `"/"` only when `to` is empty — an off-by-one here silently leaves Home never marked active. Covered by `isActiveLink` tests in Task 2.

---

### Task 1: Astro Toolchain Bootstrap

**Files:**
- Create: `astro.config.mjs`
- Create: `src/pages/index.astro` (temporary smoke-test placeholder, replaced in Task 7)
- Modify: `package.json` (scripts, dependencies)

**Interfaces:**
- Produces: a working `pnpm run build` that emits `dist/index.html`, and `pnpm run dev` that serves the site on Astro's dev server. Every later task builds on this toolchain.

- [ ] **Step 1: Install Astro and the React integration**

```bash
pnpm add astro @astrojs/react @types/react @types/react-dom
```

(`react`, `react-dom` are already dependencies and stay; `@vitejs/plugin-react` becomes unused and is removed in Task 12 alongside the other Vite-only pieces, once nothing still imports `vite.config.js`.)

- [ ] **Step 2: Create `astro.config.mjs`**

```javascript
import { defineConfig } from "astro/config";
import react from "@astrojs/react";

export default defineConfig({
  integrations: [react()],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "/src/styles/index" as *;`,
        },
      },
    },
  },
});
```

Note: `src/styles/` doesn't exist yet (created in Task 3) — this is fine, Astro only evaluates the `additionalData` string against files that actually `@use` it, and no `.scss` file exists yet either.

- [ ] **Step 3: Minimal smoke-test page**

```astro
---
// src/pages/index.astro — placeholder, replaced by the real Home page in Task 7
---
<html lang="de">
  <body>
    <h1>Astro toolchain OK</h1>
  </body>
</html>
```

- [ ] **Step 4: Update `package.json` scripts**

```json
{
  "scripts": {
    "dev": "astro dev",
    "build": "astro build",
    "lint": "eslint . --ext js,jsx --report-unused-disable-directives --max-warnings 0",
    "preview": "astro preview"
  }
}
```

- [ ] **Step 5: Build and verify**

Run: `pnpm run build`
Expected: exit code 0, and `dist/index.html` exists and contains `Astro toolchain OK`.

```bash
pnpm run build && grep -q "Astro toolchain OK" dist/index.html && echo BUILD_OK
```
Expected output: `BUILD_OK` printed (the `&&` chain only reaches `echo` if both the build and the grep succeeded).

- [ ] **Step 6: Commit**

```bash
git add astro.config.mjs package.json pnpm-lock.yaml src/pages/index.astro
git commit -m "chore: bootstrap Astro toolchain"
```

---

### Task 2: Pure Navigation & Theme Logic (with real tests)

The project has no test framework and none is being added (YAGNI) — Node's built-in test runner (`node --test`, available since Node 18, zero new dependency) is used for the handful of pure functions this migration introduces. Everything else is verified by build output + manual browser checks (Task 13), matching how the approved spec already defined verification.

**Files:**
- Create: `src/lib/theme.js`
- Create: `src/lib/theme.test.mjs`
- Create: `src/lib/nav.js`
- Create: `src/lib/nav.test.mjs`

**Interfaces:**
- Produces: `THEMES` (array), `DEFAULT_THEME` (string), `resolveInitialTheme(raw)`, `applyTheme(themeName)` from `theme.js`; `getNextPath(pathname, navLinks)`, `isActiveLink(pathname, to)` from `nav.js`. Task 4 embeds `THEMES`/`DEFAULT_THEME`'s values (duplicated, see Global Constraints) into the blocking head script. Task 5 consumes `isActiveLink`. Task 6 consumes `THEMES`, `resolveInitialTheme`, `applyTheme`. Task 11 consumes `getNextPath`.
- Consumes: nothing from earlier tasks.

- [ ] **Step 1: Write the failing tests for `theme.js`**

```javascript
// src/lib/theme.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { THEMES, DEFAULT_THEME, resolveInitialTheme } from "./theme.js";

test("THEMES lists all four zones with their svg fill colors", () => {
  assert.deepEqual(
    THEMES.map((z) => z.theme),
    ["sunrise", "day", "sundown", "night"]
  );
  assert.equal(THEMES.find((z) => z.theme === "day").svg, "#6d94c5");
});

test("resolveInitialTheme falls back to the default when localStorage is empty", () => {
  assert.equal(resolveInitialTheme(null), DEFAULT_THEME);
  assert.equal(resolveInitialTheme(undefined), DEFAULT_THEME);
});

test("resolveInitialTheme accepts a validly-stored theme", () => {
  assert.equal(resolveInitialTheme('"night"'), "night");
});

test("resolveInitialTheme falls back on an unknown theme name", () => {
  assert.equal(resolveInitialTheme('"retro"'), DEFAULT_THEME);
});

test("resolveInitialTheme falls back on malformed JSON instead of throwing", () => {
  assert.equal(resolveInitialTheme("not-json"), DEFAULT_THEME);
});
```

- [ ] **Step 2: Run to verify it fails**

Run: `node --test src/lib/theme.test.mjs`
Expected: FAIL — `Cannot find module './theme.js'` (file doesn't exist yet).

- [ ] **Step 3: Implement `theme.js`**

```javascript
// src/lib/theme.js
export const THEMES = [
  { angle: "0", class: "fa-regular fa-sun", delay: 1750, theme: "sunrise", svg: "#bbe1fa" },
  { angle: "90", class: "fa-solid fa-sun", delay: 1750, theme: "day", svg: "#6d94c5" },
  { angle: "180", class: "fa-regular fa-moon", delay: 1750, theme: "sundown", svg: "#E7D283" },
  { angle: "270", class: "fa-solid fa-moon", delay: 1750, theme: "night", svg: "#535C91" },
];

export const DEFAULT_THEME = "day";

export function resolveInitialTheme(raw) {
  if (!raw) return DEFAULT_THEME;
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    return DEFAULT_THEME;
  }
  return THEMES.some((zone) => zone.theme === parsed) ? parsed : DEFAULT_THEME;
}

export function applyTheme(themeName) {
  document.documentElement.className = themeName;
  localStorage.setItem("theme", JSON.stringify(themeName));
}
```

- [ ] **Step 4: Run to verify it passes**

Run: `node --test src/lib/theme.test.mjs`
Expected: PASS, `5 passing` (the `applyTheme` function touches `document`/`localStorage` and is intentionally untested here — no DOM in plain Node; it's exercised manually in Task 13).

- [ ] **Step 5: Write the failing tests for `nav.js`**

```javascript
// src/lib/nav.test.mjs
import { test } from "node:test";
import assert from "node:assert/strict";
import { getNextPath, isActiveLink } from "./nav.js";

const navLinks = [{ to: "" }, { to: "about" }, { to: "projects" }];

test("getNextPath advances to the next link", () => {
  assert.equal(getNextPath("/", navLinks), "/about");
  assert.equal(getNextPath("/about", navLinks), "/projects");
});

test("getNextPath wraps from the last link back to the first", () => {
  assert.equal(getNextPath("/projects", navLinks), "/");
});

test("getNextPath falls back to the first link for an unknown path", () => {
  assert.equal(getNextPath("/unknown", navLinks), "/");
});

test("isActiveLink matches the home route only at the root path", () => {
  assert.equal(isActiveLink("/", ""), true);
  assert.equal(isActiveLink("/about", ""), false);
});

test("isActiveLink matches a named route with or without a trailing slash", () => {
  assert.equal(isActiveLink("/about", "about"), true);
  assert.equal(isActiveLink("/about/", "about"), true);
  assert.equal(isActiveLink("/projects", "about"), false);
});
```

- [ ] **Step 6: Run to verify it fails**

Run: `node --test src/lib/nav.test.mjs`
Expected: FAIL — `Cannot find module './nav.js'`.

- [ ] **Step 7: Implement `nav.js`**

```javascript
// src/lib/nav.js
function toPath(to) {
  return to === "" ? "/" : `/${to}`;
}

function normalize(pathname) {
  return pathname.replace(/\/+$/, "") || "/";
}

export function isActiveLink(pathname, to) {
  return normalize(pathname) === toPath(to);
}

export function getNextPath(pathname, navLinks) {
  const normalized = normalize(pathname);
  const currentIndex = navLinks.findIndex((link) => toPath(link.to) === normalized);
  const nextIndex = currentIndex === -1 ? 0 : (currentIndex + 1) % navLinks.length;
  return toPath(navLinks[nextIndex].to);
}
```

- [ ] **Step 8: Run to verify it passes**

Run: `node --test src/lib/nav.test.mjs`
Expected: PASS, `5 passing`.

- [ ] **Step 9: Commit**

```bash
git add src/lib
git commit -m "feat: add pure theme and nav logic with node:test coverage"
```

---

### Task 3: Global Styles, Public Assets & Theme CSS Variables

**Files:**
- Move: `src/assets/sass/` → `src/styles/` (all files, unchanged content except the four theme files below)
- Modify: `src/styles/_theme-day.scss`, `_theme-night.scss`, `_theme-sunrise.scss`, `_theme-sundown.scss` (selector `body.<theme>` → `html.<theme>`; add `--svg-fill`)
- Modify: `src/index.scss` handling — file is currently empty; not carried forward, `_base.scss` becomes the global entry included directly by `BaseLayout.astro` in Task 4
- Unchanged: `public/` (stays exactly where it is; Astro serves it the same way Vite did)

**Interfaces:**
- Produces: `--svg-fill` custom property, set per theme, consumed by `Frame.astro` and `Eyes.jsx` in Tasks 7–8.
- Consumes: the exact `svg` hex values from `THEMES` in Task 2 (`sunrise` `#bbe1fa`, `day` `#6d94c5`, `sundown` `#E7D283`, `night` `#535C91`) — kept in sync by hand since one lives in SCSS and the other in JS; if they ever drift, `--svg-fill` is the visible truth.

- [ ] **Step 1: Move the styles directory**

```bash
git mv src/assets/sass src/styles
```

- [ ] **Step 2: Update `_base.scss`'s theme imports path (already relative, no change needed) — verify**

```bash
grep -n '@use' src/styles/_base.scss
```
Expected: still shows `@use "./_theme-day.scss";` etc. — relative imports inside `src/styles/` are unaffected by the directory move.

- [ ] **Step 3: Switch theme selectors from `body.<theme>` to `html.<theme>` and add `--svg-fill`**

In each of the four files, change the top-level selector and add one new line. Example for `_theme-day.scss`:

```scss
html.day {
  // Fonts
  --h1: #111418;
  /* ...unchanged... */
  --svg-fill: #6d94c5;
}
```

Apply the same two changes (selector rename, `--svg-fill` addition) to the other three files with their respective values:
- `_theme-night.scss`: `html.night { ... --svg-fill: #535C91; }`
- `_theme-sunrise.scss`: `html.sunrise { ... --svg-fill: #bbe1fa; }`
- `_theme-sundown.scss`: `html.sundown { ... --svg-fill: #E7D283; }`

- [ ] **Step 4: Verify no other file still selects `body.<theme>`**

Run: `grep -rn "^body\.\(day\|night\|sunrise\|sundown\)" src/`
Expected: no output (empty match).

- [ ] **Step 5: Commit**

```bash
git add src/styles
git commit -m "refactor: move styles to src/styles, theme scope from body to html"
```

---

### Task 4: BaseLayout — Head, FOUC-Safe Theme Script, Modal Root

**Files:**
- Create: `src/layouts/BaseLayout.astro`

**Interfaces:**
- Produces: the `<html>`/`<head>`/`<body>` shell every page in Tasks 7–11 wraps its content in via `<BaseLayout><slot content/></BaseLayout>`; renders `<div id="modal-root"></div>` that `Overlay.jsx` (Tasks 10–11) portals into.
- Consumes: `THEMES`/`DEFAULT_THEME` values from Task 2 (duplicated inline per Global Constraints — a blocking classic script can't `import` a module).

- [ ] **Step 1: Write `BaseLayout.astro`**

```astro
---
// src/layouts/BaseLayout.astro
import "../styles/_base.scss";

const { title = "Marcus Koch | Fullstack Developer" } = Astro.props;
---
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit" />
    <meta
      name="description"
      content="Website of Marcus Koch, Fullstack Developer | React, TypeScript & Node.js | Web Performance & Scalable Architecture"
    />
    <title>{title}</title>

    <meta property="og:type" content="website" />
    <meta property="og:url" content="https://marcus-koch.dev" />
    <meta property="og:title" content="Marcus Koch | Fullstack Developer" />
    <meta
      property="og:description"
      content="Fullstack Developer | React, TypeScript & Node.js | Web Performance & Scalable Architecture"
    />
    <meta property="og:image" content="https://marcus-koch.dev/assets/me.webp" />
    <meta property="og:image:width" content="1684" />
    <meta property="og:image:height" content="1684" />
    <meta property="og:locale" content="de_DE" />

    <meta name="twitter:card" content="summary" />
    <meta name="twitter:title" content="Marcus Koch | Fullstack Developer" />
    <meta
      name="twitter:description"
      content="Fullstack Developer | React, TypeScript & Node.js | Web Performance & Scalable Architecture"
    />
    <meta name="twitter:image" content="https://marcus-koch.dev/assets/me.webp" />

    <script type="application/ld+json" set:html={JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      name: "Marcus Koch",
      jobTitle: "Fullstack Developer",
      url: "https://marcus-koch.dev",
      image: "https://marcus-koch.dev/assets/me.webp",
      sameAs: [
        "https://github.com/marcus-koch-fs-dev",
        "https://www.linkedin.com/in/marcus-koch-dev",
      ],
      knowsAbout: ["React", "TypeScript", "Node.js", "Web Performance", "Scalable Architecture"],
    })} />

    <link rel="apple-touch-icon" type="image/png" href="/android-chrome-192x192.png" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossorigin />

    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
      integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css"
        integrity="sha512-xh6O/CkQoPOWDdYTDqeRdPCVd1SpvCA9XXcUnZS2FmJNp1coAFzvtCN9BmamE+4aHK8yyUHUSCcJHgXloTyT2A=="
        crossorigin="anonymous"
        referrerpolicy="no-referrer"
      />
    </noscript>
    <link
      href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&display=swap"
      rel="stylesheet"
      media="print"
      onload="this.media='all'"
    />
    <noscript>
      <link
        href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Bricolage+Grotesque:wght@600;700;800&display=swap"
        rel="stylesheet"
      />
    </noscript>

    <script is:inline>
      // Duplicated from src/lib/theme.js on purpose: this must be a blocking
      // classic script (no defer/module) so it runs before first paint, and a
      // blocking script can't `import` a module. Sets the class on <html>,
      // not <body> — <body> doesn't exist yet while <head> is still parsing.
      (function () {
        var VALID = ["sunrise", "day", "sundown", "night"];
        var DEFAULT_THEME = "day";
        var theme = DEFAULT_THEME;
        try {
          var raw = localStorage.getItem("theme");
          if (raw) {
            var parsed = JSON.parse(raw);
            if (VALID.indexOf(parsed) !== -1) theme = parsed;
          }
        } catch (e) {}
        document.documentElement.className = theme;
      })();
    </script>
  </head>
  <body>
    <div class="app">
      <slot />
    </div>
    <div id="modal-root"></div>
  </body>
</html>
```

- [ ] **Step 2: Point `src/pages/index.astro` at the layout to prove it renders**

```astro
---
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout>
  <h1>Astro toolchain OK</h1>
</BaseLayout>
```

- [ ] **Step 3: Build and verify the head script and modal root are present**

Run:
```bash
pnpm run build
grep -q 'id="modal-root"' dist/index.html && \
grep -q 'document.documentElement.className = theme' dist/index.html && \
echo LAYOUT_OK
```
Expected: `LAYOUT_OK` printed.

- [ ] **Step 4: Verify the theme script appears before `</head>` (so it never runs after body content is already visible)**

```bash
awk '/document\.documentElement\.className = theme/{print "script-line:" NR} /<\/head>/{print "head-close-line:" NR}' dist/index.html
```
Expected: `script-line` printed with a smaller line number than `head-close-line`.

- [ ] **Step 5: Commit**

```bash
git add src/layouts src/pages/index.astro
git commit -m "feat: add BaseLayout with FOUC-safe theme script and modal root"
```

---

### Task 5: Navigation — Static Navbar + Hamburger Island

**Files:**
- Create: `src/data/navLinks.js` (moved from `src/components/Header/navLinks.js`)
- Create: `src/components/Header/Navbar.astro`
- Create: `src/components/Header/NavMenu.jsx` (island — hamburger toggle only)
- Move: `src/components/Header/navbar.scss`, `navMenu.scss`, `header.scss` → same filenames, same folder (unchanged)
- Delete: `src/components/Header/Header.jsx`, `src/components/Header/Navbar.jsx`, `src/components/Header/navLinks.js` (superseded by the two files above)

**Interfaces:**
- Consumes: `isActiveLink` from `src/lib/nav.js` (Task 2).
- Produces: `<Navbar />` embedded in `BaseLayout.astro` (Task 4 gets a follow-up edit here to include it). `NavMenu` drops its old props contract (`handleClick`, `isToggled`, `menuRef`) entirely — it is a self-contained island now (no parent to thread props through, since `Navbar.astro` is static): it manages its own toggle state and reaches its sibling `<ul id="mobile-menu-list">` by DOM id instead of a React ref.

- [ ] **Step 1: Move nav data**

```bash
mkdir -p src/data
git mv src/components/Header/navLinks.js src/data/navLinks.js
```

- [ ] **Step 2: Write `Navbar.astro`** — renders both layouts unconditionally; CSS (Step 4) picks one

```astro
---
// src/components/Header/Navbar.astro
import "./navbar.scss";
import { navLinks } from "../../data/navLinks";
import { isActiveLink } from "../../lib/nav";
import ThemesToggler from "../ThemesToggler/ThemesToggler.jsx";
import NavMenu from "./NavMenu.jsx";

const current = Astro.url.pathname;
---
<div class="menu-wrapper-vertical">
  <div class="themesToggler">
    <ThemesToggler client:idle />
  </div>
  <NavMenu client:idle transition:persist />
  <ul class="menu-vertical" id="mobile-menu-list" hidden>
    {navLinks.map((link) => (
      <li class="menu-item">
        <a href={`/${link.to}`} class={isActiveLink(current, link.to) ? "active" : ""}>
          {link.name}
        </a>
      </li>
    ))}
  </ul>
</div>
<div class="menu-wrapper-horizontal">
  <div class="themesToggler">
    <ThemesToggler client:idle />
  </div>
  <ul class="menu-horizontal">
    {navLinks.map((link) => (
      <li class="menu-item">
        <a href={`/${link.to}`} class={isActiveLink(current, link.to) ? "active" : ""}>
          <span>{link.name}</span>
        </a>
      </li>
    ))}
  </ul>
  <div class="placeholder"></div>
</div>
```

Note: the mobile dropdown list (`#mobile-menu-list`) is plain server-rendered `<a>` tags, shown/hidden by a tiny inline script tied to `NavMenu`'s toggle button — see Step 3. This avoids needing the whole link list inside the React island.

- [ ] **Step 3: Write `NavMenu.jsx`** (island — toggles the sibling `<ul>` by id, no router-aware props needed anymore)

```jsx
// src/components/Header/NavMenu.jsx
import { useEffect, useRef, useState } from "react";
import "./navMenu.scss";

const NavMenu = () => {
  const [isToggled, setIsToggled] = useState(false);
  const buttonRef = useRef(null);

  useEffect(() => {
    const list = document.getElementById("mobile-menu-list");
    if (!list) return;
    list.hidden = !isToggled;
  }, [isToggled]);

  useEffect(() => {
    const list = document.getElementById("mobile-menu-list");
    if (!list) return;

    const closeOnLinkClick = (e) => {
      if (e.target.closest("a")) setIsToggled(false);
    };
    list.addEventListener("click", closeOnLinkClick);
    return () => list.removeEventListener("click", closeOnLinkClick);
  }, []);

  const handleBlur = (e) => {
    const list = document.getElementById("mobile-menu-list");
    if (list && !list.contains(e.relatedTarget) && e.relatedTarget !== buttonRef.current) {
      setIsToggled(false);
    }
  };

  return (
    <button
      ref={buttonRef}
      onClick={() => setIsToggled((prev) => !prev)}
      onBlur={handleBlur}
      className={`menu-toggler ${isToggled ? "toggled" : ""}`}
      type="button"
    >
      <span />
      <span />
      <span />
    </button>
  );
};

export default NavMenu;
```

- [ ] **Step 4: Add the responsive CSS switch to `navbar.scss`** (append — the file currently renders one layout via JS, never both; CSS now must pick)

Append to the end of `src/components/Header/navbar.scss`:

```scss
// Both layouts render server-side now (no JS media-query hook); CSS picks
// one. 768px matches the SPA's old useResponsiveSize "isMobile" threshold.
.menu-wrapper-vertical {
  display: none;
}

@media screen and (max-width: 768px) {
  .menu-wrapper-horizontal {
    display: none;
  }

  .menu-wrapper-vertical {
    display: flex;
  }
}
```

- [ ] **Step 5: Wire `Navbar` into `BaseLayout.astro`**

In `src/layouts/BaseLayout.astro`, add the import and render it inside a `<header>`:

```diff
+import Navbar from "../components/Header/Navbar.astro";
+import "../components/Header/header.scss";
```

```diff
   <body>
     <div class="app">
+      <header>
+        <Navbar />
+      </header>
       <slot />
     </div>
     <div id="modal-root"></div>
   </body>
```

- [ ] **Step 6: Delete superseded files**

```bash
git rm src/components/Header/Header.jsx src/components/Header/Navbar.jsx
```

- [ ] **Step 7: Build and verify both nav variants and active-link marking are present**

Run: `pnpm run build`
Expected: exit 0.

```bash
grep -c 'class="menu-item"' dist/index.html
```
Expected: `6` (3 links × 2 rendered layouts: vertical + horizontal).

```bash
grep -o 'href="/about"[^>]*class="active"\|class="active"[^>]*href="/about"' dist/about/index.html | wc -l
```
Expected: `2` (the about link is marked active in both layouts on the `/about` page). If this returns `0`, check attribute order in the rendered output before concluding the check itself is wrong — Astro may order `class` before `href`.

- [ ] **Step 8: Commit**

```bash
git add src/data src/components/Header src/layouts/BaseLayout.astro
git commit -m "feat: port navigation to static markup with a hamburger island"
```

---

### Task 6: ThemesToggler Island (DOM-based, no Context)

**Files:**
- Modify: `src/components/ThemesToggler/ThemesToggler.jsx`
- Move: `src/components/ThemesToggler/themesToggler.scss`, `animations.scss` (unchanged)
- Delete: `src/context/ThemesContext.jsx`, `src/hooks/useThemeSetter.jsx`

**Interfaces:**
- Consumes: `THEMES`, `resolveInitialTheme`, `applyTheme` from `src/lib/theme.js` (Task 2).
- Produces: no other task depends on this component's internals; `Navbar.astro` (Task 5) already renders `<ThemesToggler client:idle />` by name/path, which is preserved.

- [ ] **Step 1: Rewrite `ThemesToggler.jsx`** to read/write `document.documentElement.className` directly instead of the removed Context

```jsx
// src/components/ThemesToggler/ThemesToggler.jsx
import "./themesToggler.scss";
import { useState, useEffect } from "react";
import { THEMES, resolveInitialTheme, applyTheme } from "../../lib/theme";

const ThemesToggler = () => {
  const [theme, setTheme] = useState(() =>
    resolveInitialTheme(typeof localStorage !== "undefined" ? localStorage.getItem("theme") : null)
  );
  const curZone = THEMES.find((zone) => zone.theme === theme);

  const [isToggled, setIsToggled] = useState(false);
  const [temp, setTemp] = useState(curZone);
  const [active, setActive] = useState("");

  // The blocking head script (BaseLayout) may have already set a theme
  // before this island hydrates; sync from the live DOM once on mount.
  useEffect(() => {
    setTheme(resolveInitialTheme(JSON.stringify(document.documentElement.className)));
  }, []);

  const handleClick = (zone) => {
    setActive(zone.angle);
    setTemp(zone);
  };

  useEffect(() => {
    if (active !== "" && typeof active === "string") {
      setTimeout(() => {
        applyTheme(temp.theme);
        setTheme(temp.theme);
        setIsToggled(false);
        setActive("");
      }, temp.delay);
    }
  }, [active, temp]);

  return (
    <div className="themes-wrapper">
      <div className="current-theme">
        <i
          className={`${curZone.class} ${curZone.theme}`}
          onClick={() => setIsToggled(!isToggled)}
        ></i>
      </div>
      {isToggled && (
        <ul className={`dayZones active-${active}`}>
          {THEMES.map((zone, index) => (
            <li
              key={index}
              className={`zones zone-${index * 90} active-${active}`}
              onClick={() => handleClick(zone)}
            >
              <i className={`${zone.class} active-${active}`}></i>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ThemesToggler;
```

- [ ] **Step 2: Move the toggler's stylesheets**

```bash
git mv src/components/ThemesToggler src/components/ThemesToggler.tmp
mkdir -p src/components/ThemesToggler
git mv src/components/ThemesToggler.tmp/* src/components/ThemesToggler/
rmdir src/components/ThemesToggler.tmp
```
(No actual content change — this step exists only if a prior task's file layout needs reconciling; if `ThemesToggler/` already holds all three files after Step 1's edit, skip this step.)

- [ ] **Step 3: Delete the removed Context/hook**

```bash
git rm src/context/ThemesContext.jsx src/hooks/useThemeSetter.jsx
rmdir src/context 2>/dev/null || true
```

- [ ] **Step 4: Build and manually verify in the dev server**

Run: `pnpm run build && pnpm run dev &` then open `http://localhost:4321/` in a browser.
Expected: clicking the sun/moon icon opens the 4-zone picker; picking a zone changes `<html class="...">` (check via devtools) after the existing delay animation, and a page reload preserves the choice (localStorage). Stop the dev server afterward (`kill %1` or Ctrl-C).

This is the one step in the plan that cannot be reduced to a grep — it is the same manual check the approved spec's own Verification section calls for, and it is re-run exhaustively in Task 13.

- [ ] **Step 5: Commit**

```bash
git add src/components/ThemesToggler
git commit -m "refactor: rewire ThemesToggler onto document.documentElement, drop Context"
```

---

### Task 7: Home Page

**Files:**
- Create: `src/pages/index.astro` (replaces the Task 1/4 placeholder)
- Create: `src/components/Home/Frame.astro` (replaces `Frame.jsx` — no more `useSvgUpdate`, fill is a static CSS var reference)
- Create: `src/components/BookingButton.astro` (replaces `BookingButton.jsx` — static `<a>`, no interactivity)
- Move: `src/components/Home/home.scss`, `src/components/bookingButton.scss` (unchanged)
- Delete: `src/components/Home/Home.jsx`, `src/components/Home/Frame.jsx`, `src/components/BookingButton.jsx`, `src/hooks/useResponsiveSize.jsx`, `src/hooks/useSvgUpdate.jsx`

**Interfaces:**
- Consumes: `--svg-fill` CSS variable from Task 3.
- Produces: nothing consumed by later tasks (Home has no shared state).

- [ ] **Step 1: Write `Frame.astro`**

```astro
---
// src/components/Home/Frame.astro
const { width = 1440, height = 1440 } = Astro.props;
---
<svg
  class="frame-svg"
  width={width}
  height={height}
  viewBox="0 0 1440 1440"
  fill="#fff"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M690.275 -6.10352e-05L148.403 554.649C-49.4677 757.185 -49.4677 1085.56 148.403 1288.1C346.273 1490.63 667.085 1490.63 864.955 1288.1L1440 699.493V-6.10352e-05H690.275Z"
    fill="var(--svg-fill)"
  />
</svg>
```

- [ ] **Step 2: Write `BookingButton.astro`**

```astro
---
// src/components/BookingButton.astro
---
<a
  class="contact-button"
  aria-label="Send E-Mail to Marcus Koch"
  href="mailto:marcus@marcus-koch.dev?subject=Request&body=Hi%20Marcus,"
>
  Contact me
</a>
```

- [ ] **Step 3: Write `src/pages/index.astro`** — the size split (300px desktop / 200px mobile) that `useResponsiveSize` used to compute in JS is now the existing `@include mobile { ... }` block already present in `home.scss` (Task 3 carried it over unchanged); `Frame` just always renders at the desktop size (300px) and CSS resizes `.frame-order`/`.frame-svg`/`.frame-img` via the existing mobile breakpoint rules — SVG `width`/`height` attributes are overridden visually by the parent's CSS sizing in this layout (the SVG fills `.frame-order`, which the media query already resizes).

```astro
---
// src/pages/index.astro
import BaseLayout from "../layouts/BaseLayout.astro";
import Frame from "../components/Home/Frame.astro";
import BookingButton from "../components/BookingButton.astro";
import "../components/Home/home.scss";

const interests = [
  "Fullstack Developer",
  "React, TypeScript & Node.js",
  "Web Performance & Scalable Architecture",
];
---
<BaseLayout>
  <main>
    <section class="home">
      <div class="frame">
        <div class="frame-order">
          <Frame width={300} height={300} />
          <img
            class="frame-img"
            alt="Photo Marcus"
            src="/assets/me.webp"
            width="300px"
            height="300px"
          />
        </div>
      </div>
      <div class="homeWrapper">
        <h1 class="home-h1">
          Building <span class="highlight-text">Fullstack Applications</span> that Perform
        </h1>
        <p class="home-subtitle">Marcus Koch</p>
        <ul class="interests-ul">
          {interests.map((el) => (
            <li class="interests-li"><p>{el}</p></li>
          ))}
        </ul>
        <BookingButton />
      </div>
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 4: Delete superseded files**

```bash
git rm src/components/Home/Home.jsx src/components/Home/Frame.jsx src/components/BookingButton.jsx
git rm src/hooks/useResponsiveSize.jsx src/hooks/useSvgUpdate.jsx
rmdir src/hooks 2>/dev/null || true
```

- [ ] **Step 5: Build and verify**

Run: `pnpm run build`
Expected: exit 0.

```bash
grep -q 'home-h1' dist/index.html && grep -q 'var(--svg-fill)' dist/index.html && grep -q 'mailto:marcus@marcus-koch.dev' dist/index.html && echo HOME_OK
```
Expected: `HOME_OK`.

- [ ] **Step 6: Commit**

```bash
git add -A src/pages/index.astro src/components/Home src/components/bookingButton.scss
git commit -m "feat: port Home page to static Astro markup"
```

---

### Task 8: About Page

**Files:**
- Create: `src/pages/about.astro`
- Move: `src/components/About/Eyes.jsx` (edit: drop `useSvgUpdate`, `fill` becomes a static attribute)
- Move: `src/components/About/about.scss` (unchanged)
- Delete: `src/components/About/About.jsx`

**Interfaces:**
- Consumes: `--svg-fill` from Task 3.

- [ ] **Step 1: Edit `Eyes.jsx`** — remove the `useSvgUpdate` import/call, hardcode `fill="var(--svg-fill)"` on the two static rects, keep the animated eyelid rects using the same var (they toggle to `"none"` on blink, unchanged)

```jsx
// src/components/About/Eyes.jsx
import { useEffect, useState } from "react";

const Eyes = () => {
  const [eyesToggled, setEyesToggled] = useState(false);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let cancelled = false;
    const timeouts = [];
    const after = (fn, delay) => {
      const id = setTimeout(fn, delay);
      timeouts.push(id);
    };

    const blink = () => {
      setEyesToggled(true);
      after(() => {
        setEyesToggled(false);
        if (Math.random() < 0.15) {
          after(() => {
            setEyesToggled(true);
            after(() => setEyesToggled(false), 110);
          }, 140);
        }
      }, 120 + Math.random() * 100);
    };

    const loop = () => {
      after(() => {
        if (cancelled) return;
        blink();
        loop();
      }, 3000 + Math.random() * 4000);
    };
    loop();

    return () => {
      cancelled = true;
      timeouts.forEach(clearTimeout);
    };
  }, []);

  return (
    <div className="eyes-simulation">
      <svg width="193" height="184" viewBox="0 0 193 184" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="1.61816" y="82" width="100" height="100" rx="50" transform="rotate(0.927192 1.61816 82)" fill="var(--svg-fill)" />
        <rect x="30.9709" y="112" width="60" height="60" rx="30" transform="rotate(0.927192 30.9709 112)" fill="black" />
        <rect x="57.3236" y="135" width="25" height="25" rx="12.5" transform="rotate(0.927192 57.3236 135)" fill={eyesToggled ? "none" : "var(--svg-fill)"} />
        <rect x="92.6182" width="100" height="100" rx="50" transform="rotate(0.927192 92.6182 0)" fill="var(--svg-fill)" />
        <rect x="121.971" y="30" width="60" height="60" rx="30" transform="rotate(0.927192 121.971 30)" fill="black" />
        <rect x="148.324" y="53" width="25" height="25" rx="12.5" transform="rotate(0.927192 148.324 53)" fill={eyesToggled ? "none" : "var(--svg-fill)"} />
      </svg>
    </div>
  );
};

export default Eyes;
```

- [ ] **Step 2: Write `src/pages/about.astro`** — static markup ported from `About.jsx`, `Eyes` embedded as an island

```astro
---
// src/pages/about.astro
import BaseLayout from "../layouts/BaseLayout.astro";
import Eyes from "../components/About/Eyes.jsx";
import "../components/About/about.scss";

const techStack = [
  { label: "Core Stack", items: ["TypeScript", "React", "Next.js", "Node.js", "Python"] },
  { label: "Data & Cloud", items: ["PostgreSQL", "MongoDB", "Redis", "AWS (S3, ECS, RDS)"] },
  {
    label: "Tooling & Security",
    items: ["GraphQL", "OAuth 2.0 / Web Security", "Docker", "CI/CD (GitHub, GitLab, Azure DevOps)", "Jest / Cypress"],
  },
];
---
<BaseLayout title="About | Marcus Koch">
  <main>
    <section class="about">
      <Eyes client:visible />
      <div class="about-container">
        <h2 class="about-headline">About me</h2>
        <article>
          <p class="block">
            I'm <strong><span class="highlight-text">Marcus Koch</span></strong>, a fullstack
            developer with 5+ years of experience in TypeScript, React and Node.js. My focus is
            on web performance and scalable software architecture. I built a cloud-based tracking
            system at Thyssenkrupp that reduced the manual search for defective components from
            days to seconds and helped avoid expensive compensation cases.
          </p>
          <p class="block">
            <strong><span class="highlight-text"> My journey</span> </strong>
            began as a hardware validation engineer and team lead in the automotive industry,
            where I developed LabVIEW-based test tools. That work motivated me to learn advanced
            programming and eventually transition into web development.
          </p>
          <p class="block block--icon">
            <strong>
              <span class="highlight-text">
                <span class="icon-badge">
                  <svg viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M13.18 2.29a.9.9 0 0 0-1.55-.79l-10.2 11.4a.9.9 0 0 0 .67 1.5h7.89l-1.57 7.31a.9.9 0 0 0 1.55.79l10.2-11.4a.9.9 0 0 0-.67-1.5h-7.89l1.57-7.31Z" />
                  </svg>
                </span> My motto:
              </span>
            </strong>
            "It's better to think 5 minutes longer than to spend 5 days fixing it."
          </p>
        </article>
        <div class="tech-badges">
          {techStack.map(({ label, items }) => (
            <div class="tech-category">
              <h4>{label}</h4>
              <ul class="badge-list">
                {items.map((item) => <li class="badge">{item}</li>)}
              </ul>
            </div>
          ))}
        </div>
        <article>
          <p class="block block--icon">
            <strong><span class="highlight-text">In </span></strong>
            my free time, you can find me at the gym doing calisthenics training or freediving.
          </p>
        </article>
      </div>
    </section>
  </main>
</BaseLayout>
```

Note: the `IconCode`/`IconServer`/`IconShield` inline SVGs from the original `About.jsx` decorated each `tech-category` heading; they're dropped from the heading markup above only if a visual diff against the live site during Task 13 shows they weren't load-bearing for the design — otherwise, inline the same three `<svg>` blocks next to their `<h4>` exactly as `About.jsx` had them (copy verbatim from the original component, which stays readable in `git log` on this branch). Do not silently redesign the section; if unsure, keep all three icons.

- [ ] **Step 3: Delete superseded file**

```bash
git rm src/components/About/About.jsx
```

- [ ] **Step 4: Build and verify**

Run: `pnpm run build`
Expected: exit 0.

```bash
grep -q 'about-headline' dist/about/index.html && grep -q 'eyes-simulation' dist/about/index.html && echo ABOUT_OK
```
Expected: `ABOUT_OK`.

- [ ] **Step 5: Commit**

```bash
git add -A src/pages/about.astro src/components/About
git commit -m "feat: port About page to static Astro markup with Eyes island"
```

---

### Task 9: Services Page

**Files:**
- Create: `src/pages/services.astro`
- Move: `src/components/services.scss` (unchanged)
- Delete: `src/components/Services.jsx`

Not linked from `navLinks` (matches the current commented-out state) but still built and reachable by direct URL, per the approved spec.

**Interfaces:** none — self-contained, static.

- [ ] **Step 1: Write `src/pages/services.astro`**

```astro
---
// src/pages/services.astro
import BaseLayout from "../layouts/BaseLayout.astro";
import BookingButton from "../components/BookingButton.astro";
import "../components/services.scss";

const services = [
  { name: "Digitale Transformationsberatung", desc: "Optimiere Geschäftsprozesse durch den Einsatz digitaler Technologien.", icon: "fa-solid fa-digital-tachograph" },
  { name: "Responsive Webentwicklung", desc: "Erstellung benutzerfreundlicher, responsiver Webseiten und Anwendungen.", icon: "fa-solid fa-mobile-alt" },
  { name: "Web Performance Optimierung", desc: "Steigerung der Ladezeiten und Leistung für ein besseres Benutzererlebnis.", icon: "fa-solid fa-tachometer-alt" },
  { name: "Technischer Support", desc: "Technische Unterstützung und Beratung für Entwicklerteams.", icon: "fa-solid fa-users-cog" },
  { name: "API-Integration", desc: "Integration externer Dienste und APIs zur Erweiterung von Funktionen.", icon: "fa-solid fa-plug" },
];
---
<BaseLayout title="Services | Marcus Koch">
  <main>
    <section class="services">
      <div class="services-wrapper">
        <ul class="services-list">
          {services.map((service) => (
            <li class="services-item" id="item">
              <div class="services-i"><i class={service.icon} /></div>
              <div class="text-wrapper">
                <h4>{service.name}</h4>
                <p>{service.desc}</p>
              </div>
            </li>
          ))}
        </ul>
        <BookingButton />
      </div>
    </section>
  </main>
</BaseLayout>
```

- [ ] **Step 2: Delete superseded file**

```bash
git rm src/components/Services.jsx
```

- [ ] **Step 3: Build and verify**

Run: `pnpm run build`
Expected: exit 0.

```bash
grep -q 'services-list' dist/services/index.html && echo SERVICES_OK
```
Expected: `SERVICES_OK`.

- [ ] **Step 4: Commit**

```bash
git add -A src/pages/services.astro src/components/services.scss
git commit -m "feat: port Services page to static Astro markup"
```

---

### Task 10: Projects Page (Island)

**Files:**
- Create: `src/pages/projects.astro`
- Create: `src/data/projectList.js` (moved from `src/components/Projects/projectList.js`, content unchanged)
- Modify: `src/components/Projects/Projects.jsx` (update the data import path only)
- Move: `src/components/Overlay.jsx`, `src/components/overlay.scss`, `src/components/Projects/ProjectDetailsInfo.jsx`, `src/components/Projects/projectDetaailsinfo.scss`, `src/components/Projects/projects.scss` (unchanged)

**Interfaces:**
- Consumes: `#modal-root` from `BaseLayout.astro` (Task 4) via `Overlay.jsx`'s existing `createPortal`.

- [ ] **Step 1: Move project data**

```bash
git mv src/components/Projects/projectList.js src/data/projectList.js
```

- [ ] **Step 2: Update `Projects.jsx`'s import**

```diff
- import { projectsData } from "./projectList";
+ import { projectsData } from "../../data/projectList";
```

- [ ] **Step 3: Write `src/pages/projects.astro`**

```astro
---
// src/pages/projects.astro
import BaseLayout from "../layouts/BaseLayout.astro";
import Projects from "../components/Projects/Projects.jsx";
---
<BaseLayout title="Projects | Marcus Koch">
  <main>
    <Projects client:visible />
  </main>
</BaseLayout>
```

- [ ] **Step 4: Build and verify**

Run: `pnpm run build`
Expected: exit 0.

```bash
grep -q 'projects-wrapper' dist/projects/index.html && echo PROJECTS_OK
```
Expected: `PROJECTS_OK` (the card list is server-rendered by the island's static output; the click-to-open overlay behavior itself is manual-only and re-checked in Task 13, same reasoning as Task 6 Step 4 — React event handlers don't show up in the pre-hydration HTML).

- [ ] **Step 5: Commit**

```bash
git add -A src/pages/projects.astro src/data/projectList.js src/components/Projects src/components/Overlay.jsx src/components/overlay.scss
git commit -m "feat: port Projects page as a React island"
```

---

### Task 11: Footer, Legal Modals & 404 Page

**Files:**
- Create: `src/components/Footer/Footer.astro`
- Create: `src/components/Footer/LegalModals.jsx` (new island — wraps the **unmodified** `Datenschutz.jsx`/`Impressum.jsx` in `Overlay`)
- Create: `src/pages/404.astro`
- Move: `src/components/Footer/footer.scss`, `datenschutz.scss`, `impressum.scss` (unchanged)
- Delete: `src/components/Footer/Footer.jsx`, `src/components/Footer/InterpolatedWave.jsx`, `src/components/ErrorPage.jsx`, `src/components/errorPage.scss`

**Interfaces:**
- Consumes: `getNextPath` from `src/lib/nav.js` (Task 2), `navLinks` from `src/data/navLinks.js` (Task 5), `#modal-root` (Task 4).

- [ ] **Step 1: Write `LegalModals.jsx`** — the only file in this task that touches `Datenschutz.jsx`, and only via an unread `import` statement, never its contents

```jsx
// src/components/Footer/LegalModals.jsx
import { useState } from "react";
import { Overlay } from "../Overlay";
import Datenschutz from "./Datenschutz";
import Impressum from "./Impressum";

const LegalModals = () => {
  const [openDS, setOpenDS] = useState(false);
  const [openImp, setOpenImp] = useState(false);

  return (
    <>
      <li className="laws-item" onClick={() => setOpenDS(true)}>
        <span className="laws-p">Datenschutz</span>
      </li>
      <li className="laws-item" onClick={() => setOpenImp(true)}>
        <span className="laws-p">Impressum</span>
      </li>
      {openDS && (
        <Overlay handleClose={() => setOpenDS(false)}>
          <Datenschutz />
        </Overlay>
      )}
      {openImp && (
        <Overlay handleClose={() => setOpenImp(false)}>
          <Impressum />
        </Overlay>
      )}
    </>
  );
};

export default LegalModals;
```

- [ ] **Step 2: Write `Footer.astro`** — static shell; the "next page" link is a small inline module script using the same `getNextPath` tested in Task 2

```astro
---
// src/components/Footer/Footer.astro
import "./footer.scss";
import { navLinks } from "../../data/navLinks";
import LegalModals from "./LegalModals.jsx";
---
<footer>
  <a aria-label="Nächste Seite" role="button" class="next-page-btn" id="next-page-btn" href="#">
    <i class="fa fa-chevron-down" />
  </a>
  <div class="wrapper">
    <section class="sm-wrapper">
      <ul class="sm-list">
        <li class="sm-item">
          <a href="https://www.linkedin.com/in/marcus-koch-dev" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
            <i class="sm-icon fa-brands fa-linkedin" aria-hidden="true" />
          </a>
        </li>
        <li class="sm-item">
          <a href="https://github.com/marcus-koch-fs-dev" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
            <i class="sm-icon fa-brands fa-github" aria-hidden="true" />
          </a>
        </li>
      </ul>
    </section>
    <section class="laws">
      <ul class="laws-list">
        <li class="laws-item">
          <span>Copyright ©{new Date().getFullYear()} Marcus Koch</span>
        </li>
        <LegalModals client:idle />
      </ul>
    </section>
  </div>
</footer>

<script>
  import { getNextPath } from "../../lib/nav";
  import { navLinks } from "../../data/navLinks";

  const btn = document.getElementById("next-page-btn");
  btn?.addEventListener("click", (e) => {
    e.preventDefault();
    window.location.href = getNextPath(window.location.pathname, navLinks);
  });
</script>
```

Note: `<LegalModals client:idle />` is placed directly inside a plain `<ul>` and renders `<li>` elements as its root output — React allows a component to return a fragment of sibling `<li>`s, and Astro islands hydrate in place, so this nests correctly without an extra wrapper element breaking the `laws-list` styling.

- [ ] **Step 3: Wire `Footer` into `BaseLayout.astro`**

```diff
+import Footer from "../components/Footer/Footer.astro";
+import "../components/Footer/footer.scss";
```

```diff
       <header>
         <Navbar />
       </header>
       <slot />
+      <Footer />
     </div>
```

- [ ] **Step 4: Write `src/pages/404.astro`**

```astro
---
// src/pages/404.astro
import BaseLayout from "../layouts/BaseLayout.astro";
---
<BaseLayout title="Page not found | Marcus Koch">
  <main>
    <section class="error-page">
      <div class="error-card">
        <p class="error-status">404</p>
        <h1>This page hit a snag</h1>
        <p class="error-message">The page you're looking for doesn't exist.</p>
        <a href="/" class="error-home-link">Back to Home</a>
      </div>
    </section>
  </main>
</BaseLayout>
```

Move its stylesheet and import it:
```bash
git mv src/components/errorPage.scss src/pages/errorPage.scss
```
Add `import "./errorPage.scss";` to the frontmatter of `404.astro`.

- [ ] **Step 5: Delete superseded files**

```bash
git rm src/components/Footer/Footer.jsx src/components/Footer/InterpolatedWave.jsx src/components/ErrorPage.jsx
```

- [ ] **Step 6: Build and verify**

Run: `pnpm run build`
Expected: exit 0, and Astro reports a `404.html` (or `404/index.html`, depending on Astro's default — check the actual build log line for `dist/404`) among the emitted routes.

```bash
grep -q 'next-page-btn' dist/index.html && \
grep -q 'laws-item' dist/index.html && \
find dist -iname '404*' && \
echo FOOTER_OK
```
Expected: `FOOTER_OK`, plus at least one path printed by `find` before it.

- [ ] **Step 7: Commit**

```bash
git add -A src/components/Footer src/pages/404.astro src/pages/errorPage.scss src/layouts/BaseLayout.astro
git commit -m "feat: port Footer with legal modals island and add static 404 page"
```

---

### Task 12: Remove Legacy React/Router/PWA Code and Dependencies

**Files:**
- Delete: `src/main.jsx`, `src/App.jsx`, `src/App.scss`, `index.html`, `vite.config.js`, `src/reportWebVitals.js`, `src/index.scss` (empty, unused), `src/logo.svg` (unused CRA leftover — confirm with grep first)
- Modify: `package.json` (remove dependencies), `.gitignore` if it references `dev-dist/`

**Interfaces:** none — this is subtractive.

- [ ] **Step 1: Confirm nothing still imports the files being deleted**

```bash
grep -rln "main.jsx\|from \"./App\"\|reportWebVitals\|logo.svg" src/ index.html 2>/dev/null
```
Expected: only the files themselves (`main.jsx` importing `App`/`reportWebVitals`) — no survivors in `src/pages/`, `src/components/`, or `src/layouts/`. If `logo.svg` is referenced anywhere, keep it and drop it from this step's delete list.

- [ ] **Step 2: Delete the files**

```bash
git rm src/main.jsx src/App.jsx src/App.scss index.html vite.config.js src/reportWebVitals.js src/index.scss
```

(Skip `src/logo.svg` here if Step 1 found a reference; otherwise include it in the same command.)

- [ ] **Step 3: Remove now-unused dependencies**

```bash
grep -rl "react-router-dom\|react-spring\|web-vitals" src/ 2>/dev/null
```
Expected: no output (all usages were removed in Tasks 5–11).

```bash
pnpm remove react-router-dom react-spring web-vitals vite-plugin-pwa @vitejs/plugin-react
```

- [ ] **Step 4: Check `@popperjs/core` for any remaining usage before removing**

```bash
grep -rl "popper" src/ 2>/dev/null
```
Expected: no output. If empty, remove it:
```bash
pnpm remove @popperjs/core
```
If Step 4's grep finds a usage, leave `@popperjs/core` installed and note why in the ledger — do not remove a dependency something still imports.

- [ ] **Step 5: Remove the leftover `dev-dist/` directory** (was Vite's PWA dev output; Astro doesn't produce it)

```bash
rm -rf dev-dist
```

If `.gitignore` has a `dev-dist` entry, leave it (harmless) or remove it — either is fine, not worth its own step.

- [ ] **Step 6: Full clean build**

Run: `rm -rf dist && pnpm run build`
Expected: exit 0. All five routes present:
```bash
ls dist/index.html dist/about/index.html dist/projects/index.html dist/services/index.html
find dist -iname '404*'
```
Expected: all four `ls` paths exist; `find` prints at least one 404 path.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: remove legacy Vite/React-router/PWA code and dependencies"
```

---

### Task 13: Cleanup, Lint, and Full Manual Verification

**Files:**
- Modify: `.eslintrc.cjs` (add Astro file support, or scope the existing config to `.jsx` only — Astro files use their own compiler, not ESLint's JS parser, so `.astro` files should NOT be passed to this config)
- Modify: `README.md` (reflect Astro instead of Vite)

**Interfaces:** none — final integration check.

- [ ] **Step 1: Confirm ESLint doesn't choke on `.astro` files**

The current lint script (`eslint . --ext js,jsx ...`) already only targets `.js`/`.jsx`, so `.astro` files are naturally skipped — no `eslint-plugin-astro` is needed for this migration's scope (YAGNI: add it later if `.astro` linting is actually wanted).

Run: `pnpm run lint`
Expected: exit 0, no errors. Fix any reported issue (e.g. an unused import left over from a deleted hook) before proceeding — do not silence via `eslint-disable`.

- [ ] **Step 2: Update `README.md`**

Replace the Vite-specific description and file list with the Astro equivalent — same structure, updated facts:

```markdown
# Marcus Koch Website

A personal portfolio website built with **Astro** (static output) and **React islands**.

---

## ✨ Features

- Static HTML at build time, React only where the page is genuinely interactive
- ESLint configuration for clean code
- Clear folder separation for maintainability

---

## 📂 Project Structure

- **`public/`** – Static assets (favicons, images, robots.txt, …)
- **`src/pages/`** – One file per route (Astro file-based routing)
- **`src/layouts/`** – Shared page shell (`BaseLayout.astro`)
- **`src/components/`** – Static `.astro` components and React island `.jsx` components
- **`src/lib/`** – Pure logic, covered by `node --test`
- **`src/data/`** – Static content data (nav links, project list)
- **`src/styles/`** – Global Sass (variables, mixins, themes)
- **`astro.config.mjs`** – Astro configuration
- **`package.json`** – Dependencies and scripts
- **`pnpm-lock.yaml`** – Lockfile

---

## 🚀 Getting Started

\`\`\`bash
# Clone the repository
git clone https://github.com/marcus-koch-fs-dev/marcuskoch-website.git
cd marcuskoch-website

# Install dependencies (pnpm required)
pnpm install

# Start development server
pnpm dev

# Build for production
pnpm build

# Preview the production build
pnpm preview
\`\`\`
```

- [ ] **Step 3: Run the full pure-logic test suite one more time**

Run: `node --test src/lib`
Expected: PASS, `10 passing` (5 from `theme.test.mjs` + 5 from `nav.test.mjs`).

- [ ] **Step 4: Full manual verification pass** (mirrors the approved spec's Verification section — this is the step that actually exercises every Review Focus item end to end)

Run: `pnpm run build && pnpm run preview` and open the printed local URL.

Check each of the following and only proceed once every one is confirmed:
- [ ] Every route (`/`, `/about`, `/projects`, `/services`, a nonexistent path) renders correctly; the nonexistent path shows the 404 page.
- [ ] Theme toggler cycles through all four themes; the page reloads with the chosen theme still applied (localStorage) and with **no visible flash of the wrong theme** before paint.
- [ ] Clear `localStorage.theme` in devtools, then set it to `"\"not-a-real-theme\""` and reload — the page still renders with the default `day` theme, no console error.
- [ ] `Eyes` blinks irregularly on the About page; enabling `prefers-reduced-motion` in devtools and reloading stops the blinking.
- [ ] Hamburger menu opens/closes on a narrow viewport; clicking a link closes it and navigates.
- [ ] Resizing the browser across 768px switches between the horizontal and vertical nav layouts with no layout jump or duplicate visible menu.
- [ ] A Projects card's "Details →" button opens the overlay with the right project's info; the close button works.
- [ ] Footer's Datenschutz and Impressum links open their respective overlays with the original (unmodified) legal text.
- [ ] Footer's "next page" chevron cycles Home → About → Projects → Home.
- [ ] `view-source:` on `/about` shows the full About text and tech badges as real HTML (not a `<div id="root">` placeholder) — confirms the SEO goal.

- [ ] **Step 5: Commit**

```bash
git add README.md .eslintrc.cjs
git commit -m "docs: update README for Astro; confirm lint is clean"
```

---

## Completion

After Task 13's ledger line, this plan's implementation is done. Follow this skill's **Final Review** stage (whole-branch review, most capable available model) before merging, per the human's standing preference for a review gate before merge — logged in project memory as `code-quality-and-git-workflow`.
