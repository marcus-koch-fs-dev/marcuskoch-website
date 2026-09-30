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
