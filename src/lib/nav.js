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
