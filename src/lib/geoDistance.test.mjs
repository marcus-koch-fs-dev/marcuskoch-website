import { test } from "node:test";
import assert from "node:assert/strict";
import { haversineDistanceKm, estimateTravelStats, formatDuration } from "./geoDistance.js";

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
  assert.equal(stats.planeMinutes, 157);
  assert.ok(stats.callMs > 20);
});

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
