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
