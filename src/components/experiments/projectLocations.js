// Keyed by projectList.js id. Confirmed by Marcus on 2026-09-30:
// - 1, 4: Baas Film GmbH -- Lindau (same city as Marcus's own home base).
// - 2: Owner-run services business -- Wangen im Allgäu.
// - 3: Education provider -- Berlin.
// - 5, 6: Thyssenkrupp Presta AG -- Eschen, Liechtenstein.
// - 7: Arvato Systems GmbH (Gütersloh) & Sciendis GmbH (Leipzig) -- two
//   cities for one project id; only Arvato's is used here since a project
//   only carries a single marker today. See the reply to this commit's
//   request for the open question on whether that should change.
export const PROJECT_LOCATIONS = {
  1: { city: "Lindau", lat: 47.5456, lng: 9.6857 },
  2: { city: "Wangen im Allgäu", lat: 47.6825, lng: 9.8317 },
  3: { city: "Berlin", lat: 52.52, lng: 13.405 },
  4: { city: "Lindau", lat: 47.5456, lng: 9.6857 },
  5: { city: "Eschen, Liechtenstein", lat: 47.3167, lng: 9.5167 },
  6: { city: "Eschen, Liechtenstein", lat: 47.3167, lng: 9.5167 },
  7: { city: "Gütersloh", lat: 51.9036, lng: 8.3789 },
};
