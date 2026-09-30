import { test } from "node:test";
import assert from "node:assert/strict";
import { haversineDistanceKm, estimateTravelStats } from "./geoDistance.js";

test("haversineDistanceKm returns 0 for identical points", () => {
  assert.equal(haversineDistanceKm(48.8, 9.0, 48.8, 9.0), 0);
});

test("haversineDistanceKm matches known Berlin-Munich distance", () => {
  const km = haversineDistanceKm(52.52, 13.405, 48.1351, 11.582);
  assert.ok(km > 500 && km < 520, `expected ~504km, got ${km}`);
});

test("estimateTravelStats scales with distance", () => {
  const stats = estimateTravelStats(90);
  assert.equal(stats.distanceKm, 90);
  assert.equal(stats.carMinutes, 60);
  assert.equal(stats.walkMinutes, 1080);
  assert.equal(stats.planeMinutes, 97);
  assert.ok(stats.callMs > 20);
});
