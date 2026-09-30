// Keyed by projectList.js id. Each project maps to an array of one or more
// locations (a project can span more than one, see 7). Confirmed by Marcus
// on 2026-09-30:
// - 1, 4: Baas Film GmbH -- Lindau. Nudged ~5km east of Marcus's own
//   MARCUS_COORDS (GlobeHero.jsx) so the two markers sit side by side
//   instead of exactly overlapping -- a deliberate visual offset, not a
//   real-world claim about Baas Film's address.
// - 2: Owner-run services business -- Wangen im Allgäu.
// - 3: Education provider -- Berlin.
// - 5, 6: Thyssenkrupp Presta AG -- Eschen, Liechtenstein.
// - 7: two client assignments in two cities -- Arvato Systems GmbH
//   (Gütersloh) and Sciendis GmbH (Leipzig).
export const PROJECT_LOCATIONS = {
  1: [{ city: "Lindau", lat: 47.5456, lng: 9.756 }],
  2: [{ city: "Wangen im Allgäu", lat: 47.6825, lng: 9.8317 }],
  3: [{ city: "Berlin", lat: 52.52, lng: 13.405 }],
  4: [{ city: "Lindau", lat: 47.5456, lng: 9.756 }],
  5: [{ city: "Eschen, Liechtenstein", lat: 47.3167, lng: 9.5167 }],
  6: [{ city: "Eschen, Liechtenstein", lat: 47.3167, lng: 9.5167 }],
  7: [
    { city: "Gütersloh", lat: 51.9036, lng: 8.3789 },
    { city: "Leipzig", lat: 51.3397, lng: 12.3731 },
  ],
};
