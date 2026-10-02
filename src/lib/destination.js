// src/lib/destination.js
export function destinationFromPath(pathname) {
  if (pathname.startsWith("/impressum")) return "impressum";
  if (pathname.startsWith("/datenschutz")) return "datenschutz";
  return "home";
}
