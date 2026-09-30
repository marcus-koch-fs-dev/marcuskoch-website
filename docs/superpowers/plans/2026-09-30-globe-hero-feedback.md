# Globe Hero Feedback Punch-List Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Implement Marcus's 2026-09-30 review feedback on the `/experiments/globe` spike — six independent fixes to the globe rendering, copy hierarchy, stat formatting, a travel-time bug, nav consistency, and unused layout space.

**Architecture:** All six items are surgical edits to the three existing spike files (`GlobeHero.jsx`, `globeHero.scss`, `geoDistance.js` + its test). No new components, no new dependencies, no data model changes. Each task is independently shippable and gets its own commit, matching this branch's existing `spike: <change>` commit convention.

**Tech Stack:** React (via Astro islands), react-globe.gl, three.js, SCSS, `node:test` for the pure-function lib.

**Spec:** `/home/marcus/.claude/projects/-home-marcus-Coding-JavaScript-marcuskoch-website/memory/globe-hero-spike-feedback.md` (the six-item punch-list memory; the plan below implements it item-for-item, same numbering).

## Global Constraints

- Scope is limited to: `src/components/experiments/GlobeHero.jsx`, `src/components/experiments/globeHero.scss`, `src/lib/geoDistance.js`, `src/lib/geoDistance.test.mjs`. No other files.
- English-only copy (established earlier in this spike, see commit `b644564`).
- Preserve the terminal/Nostromo aesthetic (phosphor green `#6dffa8`/`#cfffe0`, `"Share Tech Mono"` monospace) — this is visual *cleanup*, not a redesign.
- One commit per punch-list item (six commits total), message style `spike: <change>`.
- After any `geoDistance.js` change: run `node --test src/lib/geoDistance.test.mjs`.
- After any `GlobeHero.jsx` / `globeHero.scss` change: run `npm run dev` and visually check `http://localhost:4321/experiments/globe` in a browser — there is no component test harness for this file, so this is the verification step.

## Review Focus

1. **`formatDuration` boundary at exactly 60 minutes** — punch-list example only covers deep-in-hours (1930→32H) and the existing under-an-hour cases; 60 itself must not round to "0 H" or stay "60 MIN".
2. **Stats panel render when `stats` is `null`** (geolocation never granted) — the new formatting calls must stay inside the existing `{stats && ...}` guard, not evaluate on a null object.
3. **Wireframe globe when `countries` is `[]`** (the existing fetch failure fallback) — `polygonStrokeColor` etc. are functions over feature data; an empty array must still render a plain dark sphere without throwing.
4. **Car-vs-plane fix must not just move the bug to a different distance** — the fix has to widen the gap generally (a constant change), not special-case one distance; test a second, larger distance to confirm plane is still faster at long range.
5. **Tagline text length vs. the fixed intro panel width** (`min(36rem, 46%)`, established for the existing eyebrow/name) — a one-line summary needs to fit without wrapping awkwardly under the now-larger name heading.

---

### Task 1: Wireframe globe, remove the temp palette dropdown

**Files:**
- Modify: `src/components/experiments/GlobeHero.jsx` (palette state, `GLOBE_PALETTES` array, the `globeMaterial` memo, the `<Globe>` polygon props, the `DEV: PALETTE` dropdown JSX)
- Modify: `src/components/experiments/globeHero.scss` (`&__dev-palette` rule — delete, it becomes dead CSS)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: a module-level `GLOBE_COLORS = { ocean, land, stroke }` constant other tasks don't need but should not collide with (none of the remaining tasks touch globe color).

- [ ] **Step 1: Replace the palette dropdown with a fixed phosphor-green constant**

In `GlobeHero.jsx`, replace the `GLOBE_PALETTES` array (lines 24-32) with a single fixed constant — the code comment already said "pick one and delete this dropdown once we settle on a palette," and Marcus picked phosphor green:

```jsx
const GLOBE_COLORS = { ocean: "#03130d", land: "#1d5c3c", stroke: "#3dffa0" };
```

Remove the `paletteId` state (`const [paletteId, setPaletteId] = useState("phosphor");`) and the derived `palette` lookup (`const palette = GLOBE_PALETTES.find(...)`).

Replace the `globeMaterial` `useMemo` with a module-level constant (it no longer depends on any state), placed near `GLOBE_COLORS`:

```jsx
const globeMaterial = new THREE.MeshPhongMaterial({ color: GLOBE_COLORS.ocean });
```

Delete the `<label className="globe-hero__dev-palette">...</label>` block entirely (the `DEV: PALETTE` select, lines ~351-360).

- [ ] **Step 2: Switch country rendering from filled caps to wireframe strokes**

In the `<Globe ... />` JSX, change:

```jsx
atmosphereColor={palette.stroke}
...
polygonCapColor={() => palette.land}
polygonSideColor={() => palette.land}
polygonStrokeColor={() => palette.stroke}
polygonAltitude={0.006}
```

to:

```jsx
atmosphereColor={GLOBE_COLORS.stroke}
...
polygonCapColor={() => "rgba(0,0,0,0)"}
polygonSideColor={() => "rgba(0,0,0,0)"}
polygonStrokeColor={() => GLOBE_COLORS.stroke}
polygonAltitude={0.004}
```

Transparent cap/side colors turn the filled country shapes into hollow outlines (a wireframe/line look) while reusing the same `countries` geojson already being fetched — no new data source needed.

- [ ] **Step 3: Remove the now-dead `&__dev-palette` SCSS rule**

In `globeHero.scss`, delete the `&__dev-palette { ... }` block (lines 242-262), including the `select { ... }` nested rule inside it.

- [ ] **Step 4: Verify in browser**

Run:
```bash
npm run dev
```
Open `http://localhost:4321/experiments/globe`. Confirm: no `DEV: PALETTE` dropdown is visible; countries render as thin bright-green outlines on a dark sphere, not filled shapes; globe still rotates/zooms on nav clicks as before.

- [ ] **Step 5: Commit**

```bash
git add src/components/experiments/GlobeHero.jsx src/components/experiments/globeHero.scss
git commit -m "spike: wireframe globe, settle on phosphor palette, drop dev dropdown"
```

---

### Task 2: Flip name/title hierarchy, add one-line summary

**Files:**
- Modify: `src/components/experiments/GlobeHero.jsx` (the `__eyebrow`/`__name` JSX, lines 344-346)
- Modify: `src/components/experiments/globeHero.scss` (`&__name` margin, new `&__tagline` rule)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Swap which text is the small eyebrow vs. the big heading, add a tagline**

In `GlobeHero.jsx`, replace:

```jsx
<p className="globe-hero__eyebrow">{renderGlowText("Marcus Koch")}</p>
<h1 className="globe-hero__name">{renderGlowText("Fullstack Developer")}</h1>
```

with:

```jsx
<p className="globe-hero__eyebrow">{renderGlowText("Fullstack Developer")}</p>
<h1 className="globe-hero__name">{renderGlowText("Marcus Koch")}</h1>
<p className="globe-hero__tagline">TypeScript · React · Node.js — based in Lindau, DE</p>
```

The `<h1>` now correctly contains the person's name (also fixes the page's semantic heading, which was backwards before). The glow-pulse effect (`useEffect` targeting `.globe-hero__name .globe-hero__word span`) keeps working since it targets the class, not the text content.

- [ ] **Step 2: Adjust spacing for the new three-line stack**

In `globeHero.scss`, change `&__name`'s bottom margin so it sits tight against the new tagline instead of leaving a 4rem gap:

```scss
&__name {
  margin: 0 0 0.5rem;   // was: margin: 0 0 4rem;
  ...
}
```

Add a new `&__tagline` rule right after `&__name` (before the `&__eyebrow, &__name { .globe-hero__word { ... } }` combined block), carrying the 4rem gap the name used to have before the terminal panel:

```scss
&__tagline {
  margin: 0 0 4rem;
  color: rgba(207, 255, 224, 0.75);
  font-family: "Share Tech Mono", "Courier New", monospace;
  font-size: 0.9rem;
  letter-spacing: 0.03em;
}
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev` (if not already running) and open `http://localhost:4321/experiments/globe`. Confirm: "Marcus Koch" is now the large heading, "Fullstack Developer" is the small eyebrow above it, and the new tagline line fits on one line without wrapping inside the intro panel.

- [ ] **Step 4: Commit**

```bash
git add src/components/experiments/GlobeHero.jsx src/components/experiments/globeHero.scss
git commit -m "spike: put name before title, add one-line stack/location summary"
```

---

### Task 3: Human-readable duration formatting

**Files:**
- Modify: `src/lib/geoDistance.js` (add `formatDuration`)
- Modify: `src/lib/geoDistance.test.mjs` (add tests for `formatDuration`)
- Modify: `src/components/experiments/GlobeHero.jsx` (stats list JSX, lines ~386-401)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: `formatDuration(minutes: number): string` — exported from `geoDistance.js`, used by `GlobeHero.jsx`'s stats list. Returns `"~<N> MIN"` under 60 minutes, `"~<N> H"` (rounded) at 60 or above.

- [ ] **Step 1: Write the failing tests**

Add to `src/lib/geoDistance.test.mjs` (after the existing `import`):

```js
import { haversineDistanceKm, estimateTravelStats, formatDuration } from "./geoDistance.js";
```

(replaces the existing import line, adding `formatDuration` to it)

Add these test cases at the end of the file:

```js
test("formatDuration keeps minutes under an hour", () => {
  assert.equal(formatDuration(45), "~45 MIN");
});

test("formatDuration switches to hours at the 60-minute boundary", () => {
  assert.equal(formatDuration(59), "~59 MIN");
  assert.equal(formatDuration(60), "~1 H");
});

test("formatDuration rounds long durations to whole hours", () => {
  assert.equal(formatDuration(1930), "~32 H");
});
```

- [ ] **Step 2: Run tests to verify they fail**

Run: `node --test src/lib/geoDistance.test.mjs`
Expected: 3 new FAIL results, `formatDuration is not a function` (or `undefined is not a function`).

- [ ] **Step 3: Implement `formatDuration`**

Add to `src/lib/geoDistance.js`, after `estimateTravelStats`:

```js
export function formatDuration(minutes) {
  if (minutes >= 60) {
    return `~${Math.round(minutes / 60)} H`;
  }
  return `~${minutes} MIN`;
}
```

- [ ] **Step 4: Run tests to verify they pass**

Run: `node --test src/lib/geoDistance.test.mjs`
Expected: all tests (original 3 + new 3) PASS.

- [ ] **Step 5: Use it in the stats list, fix the "unpayable" line**

In `GlobeHero.jsx`, add `formatDuration` to the existing import:

```jsx
import { haversineDistanceKm, estimateTravelStats, formatDuration } from "../../lib/geoDistance";
```

Replace the four stat `<li>` entries:

```jsx
<li>
  <span>Distance</span>
  <span>{stats.distanceKm} km</span>
</li>
<li>
  <span>Arrival by car</span>
  <span>~{stats.carMinutes} min</span>
</li>
<li>
  <span>On foot</span>
  <span>~{stats.walkMinutes} min</span>
</li>
<li>
  <span>By plane</span>
  <span>~{stats.planeMinutes} min</span>
</li>
<li>
  <span>Just a message</span>
  <span>unpayable</span>
</li>
```

with:

```jsx
<li>
  <span>Distance</span>
  <span>{stats.distanceKm} km</span>
</li>
<li>
  <span>Arrival by car</span>
  <span>{formatDuration(stats.carMinutes)}</span>
</li>
<li>
  <span>On foot</span>
  <span>{formatDuration(stats.walkMinutes)}</span>
</li>
<li>
  <span>By plane</span>
  <span>{formatDuration(stats.planeMinutes)}</span>
</li>
<li>
  <span>Just a message</span>
  <span>0 MIN</span>
</li>
```

("Just a message" leans into the joke instead of using the non-standard word "unpayable": sending a message takes zero minutes regardless of distance. This stays inside the existing `{stats && (...)}` guard, unchanged.)

- [ ] **Step 6: Verify in browser**

Run `npm run dev`, open `http://localhost:4321/experiments/globe`, allow location, confirm the INTEL panel shows e.g. "~3 H" instead of raw minutes for longer distances, and small distances still show "~N MIN".

- [ ] **Step 7: Commit**

```bash
git add src/lib/geoDistance.js src/lib/geoDistance.test.mjs src/components/experiments/GlobeHero.jsx
git commit -m "spike: format long durations as hours, drop 'unpayable'"
```

---

### Task 4: Fix car-vs-plane travel time bug

**Files:**
- Modify: `src/lib/geoDistance.js` (`PLANE_OVERHEAD_MINUTES` constant)
- Modify: `src/lib/geoDistance.test.mjs` (update existing assertion, add regression test)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing other tasks depend on.

**Root cause:** at ~160km, `carMinutes = round(160/90*60) = 107` and `planeMinutes = round(160/800*60+90) = 102` — the plane "wins" by 5 minutes at a distance a car would obviously win at in real life, because `PLANE_OVERHEAD_MINUTES = 90` (check-in + security only) understates real short-haul overhead (check-in + security + boarding + taxi/ascent/descent buffer ≈ 150 min). This isn't the intentional joke (the joke is the instant "message" row) — it's a constant that's too low.

- [ ] **Step 1: Write the failing regression test**

Add to `src/lib/geoDistance.test.mjs`:

```js
test("car is meaningfully faster than plane for a ~160km trip (regression: overhead was too low)", () => {
  const stats = estimateTravelStats(160);
  assert.ok(
    stats.planeMinutes - stats.carMinutes > 30,
    `expected plane to be >30min slower than car at 160km, got car=${stats.carMinutes} plane=${stats.planeMinutes}`
  );
});

test("plane is still faster than car for a long ~1200km trip", () => {
  const stats = estimateTravelStats(1200);
  assert.ok(
    stats.carMinutes - stats.planeMinutes > 200,
    `expected car to be >200min slower than plane at 1200km, got car=${stats.carMinutes} plane=${stats.planeMinutes}`
  );
});
```

- [ ] **Step 2: Run tests to verify the first one fails**

Run: `node --test src/lib/geoDistance.test.mjs`
Expected: `"car is meaningfully faster..."` FAILs (actual diff is -5, not > 30). The 1200km test should already PASS (long-haul isn't affected by this bug) — confirms the fix must stay targeted at the overhead constant, not break long-distance behavior.

- [ ] **Step 3: Fix the constant**

In `src/lib/geoDistance.js`, change:

```js
const PLANE_OVERHEAD_MINUTES = 90;
```

to:

```js
const PLANE_OVERHEAD_MINUTES = 150;
```

- [ ] **Step 4: Update the pre-existing assertion that hardcoded the old overhead**

In the existing `estimateTravelStats scales with distance` test (distance=90km), `planeMinutes` was asserted as `97` (computed from the old 90-minute overhead). Update it:

```js
assert.equal(stats.planeMinutes, 157);  // was: assert.equal(stats.planeMinutes, 97);
```

(`90/800*60 + 150 = 156.75`, rounds to 157.)

- [ ] **Step 5: Run all tests to verify everything passes**

Run: `node --test src/lib/geoDistance.test.mjs`
Expected: all tests PASS, including both new regression tests and the updated 90km case.

- [ ] **Step 6: Commit**

```bash
git add src/lib/geoDistance.js src/lib/geoDistance.test.mjs
git commit -m "spike: fix plane overhead constant so car clearly wins short/mid trips"
```

---

### Task 5: Unify nav iconography and copy style

**Files:**
- Modify: `src/components/experiments/GlobeHero.jsx` (nav button JSX, lines ~407-477)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Give PROJECTS and TECH_STACK the same ●/○ state marker HOME and ABOUT_ME already use**

Replace:

```jsx
<button
  type="button"
  className="globe-hero__terminal-nav-toggle"
  onClick={toggleProjects}
  onMouseEnter={playHoverTick}
>
  &gt; PROJECTS {projectsOpen ? "▾" : "▸"}
</button>
```

with:

```jsx
<button
  type="button"
  className="globe-hero__terminal-nav-toggle"
  onClick={toggleProjects}
  onMouseEnter={playHoverTick}
>
  {projectsOpen ? "●" : "○"} PROJECTS {projectsOpen ? "▾" : "▸"}
</button>
```

And replace:

```jsx
<button
  type="button"
  className="globe-hero__terminal-nav-toggle"
  onClick={toggleTechStack}
  onMouseEnter={playHoverTick}
>
  &gt; TECH_STACK {techOpen ? "▾" : "▸"}
</button>
```

with:

```jsx
<button
  type="button"
  className="globe-hero__terminal-nav-toggle"
  onClick={toggleTechStack}
  onMouseEnter={playHoverTick}
>
  {techOpen ? "●" : "○"} TECH_STACK {techOpen ? "▾" : "▸"}
</button>
```

Now all four top-level nav rows (HOME, ABOUT_ME, PROJECTS, TECH_STACK) share one state marker system (`●`/`○`), and the two expandable ones additionally carry the `▾`/`▸` disclosure marker. The `&gt;` prefix is gone — it was only ever on these two, which was the inconsistency.

- [ ] **Step 2: Match the CTA button's copy style to the rest of the terminal**

Replace:

```jsx
<a
  className="contact-button globe-hero__terminal-cta"
  href="mailto:marcus@marcus-koch.dev?subject=Request&body=Hi%20Marcus,"
>
  Initiate First Contact
</a>
```

with:

```jsx
<a
  className="contact-button globe-hero__terminal-cta"
  href="mailto:marcus@marcus-koch.dev?subject=Request&body=Hi%20Marcus,"
>
  INITIATE_CONTACT
</a>
```

(matches the `ABOUT_ME` / `TECH_STACK` style — all-caps, underscore-joined — instead of mixing in plain-English title case.)

- [ ] **Step 3: Verify in browser**

Run `npm run dev`, open `http://localhost:4321/experiments/globe`. Confirm all four nav rows show a consistent ●/○ marker, PROJECTS/TECH_STACK no longer show `>`, and the contact button reads "INITIATE_CONTACT".

- [ ] **Step 4: Commit**

```bash
git add src/components/experiments/GlobeHero.jsx
git commit -m "spike: unify nav marker system and CTA copy style"
```

---

### Task 6: Fill empty space below the terminal panel

**Files:**
- Modify: `src/components/experiments/GlobeHero.jsx` (add a status-log block after `.globe-hero__terminal`, inside `.globe-hero__intro`)
- Modify: `src/components/experiments/globeHero.scss` (new `&__status-log` / `&__cursor-blink` rules + keyframes)

**Interfaces:**
- Consumes: nothing from other tasks.
- Produces: nothing other tasks depend on.

- [ ] **Step 1: Add a small blinking-cursor status log after the terminal panel**

In `GlobeHero.jsx`, find the closing `</div>` of `.globe-hero__terminal` (right after the `globe-hero__terminal-cta` anchor) and add a sibling block before `.globe-hero__intro` closes:

```jsx
        </div>

        <div className="globe-hero__status-log" aria-hidden="true">
          <p>&gt; STATUS: NOMINAL</p>
          <p>&gt; UPLINK: STABLE</p>
          <p>
            &gt; AWAITING INPUT<span className="globe-hero__cursor-blink">_</span>
          </p>
        </div>
      </div>
```

(`aria-hidden` because it's decorative flavor text, not information — screen readers shouldn't announce a fake status log.)

- [ ] **Step 2: Style it and add the blink animation**

In `globeHero.scss`, add a new keyframe near the existing `@keyframes` at the top of the file:

```scss
@keyframes globe-hero-cursor-blink {
  0%,
  49% {
    opacity: 1;
  }
  50%,
  100% {
    opacity: 0;
  }
}
```

Add a new rule inside the `.globe-hero { ... }` block (the second one, where `&__terminal-stack` lives), after `&__terminal-stack`:

```scss
&__status-log {
  margin-top: 1.5rem;
  padding-top: 1rem;
  border-top: 1px dashed rgba(109, 255, 168, 0.25);
  font-family: "Share Tech Mono", "Courier New", monospace;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  color: rgba(109, 255, 168, 0.55);

  p {
    margin: 0 0 0.3rem;
    color: inherit;
  }
}

&__cursor-blink {
  display: inline-block;
  animation: globe-hero-cursor-blink 1s steps(1) infinite;
}
```

- [ ] **Step 3: Verify in browser**

Run `npm run dev`, open `http://localhost:4321/experiments/globe`. Confirm a small three-line status log with a blinking `_` cursor appears below the terminal panel, filling the previously empty space, without pushing the panel's max-height/scroll behavior around.

- [ ] **Step 4: Commit**

```bash
git add src/components/experiments/GlobeHero.jsx src/components/experiments/globeHero.scss
git commit -m "spike: add blinking status log to fill empty space below terminal"
```

---

## Final check

- [ ] Run `node --test src/lib/geoDistance.test.mjs` once more — all tests pass.
- [ ] Run `npm run lint` — no new warnings/errors introduced.
- [ ] Run `npm run dev`, click through HOME → ABOUT_ME → a project → TECH_STACK → HOME once more end-to-end, confirm nothing regressed from the six changes.
- [ ] Update the `globe-hero-spike-feedback` memory to reflect the punch-list is implemented (or delete it, since its purpose was to survive until this work resumed).
