// --- Helpers ---

export function generateCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

const TTL_MS = 5 * 60 * 1000; // 5 minutes

export function saveMapping(code, url) {
  const key = "url_shortener_mappings";
  const existing = JSON.parse(localStorage.getItem(key) || "{}");
  existing[code] = { url, expiresAt: Date.now() + TTL_MS };
  localStorage.setItem(key, JSON.stringify(existing));
}

export function getMapping(code) {
  const key = "url_shortener_mappings";
  const existing = JSON.parse(localStorage.getItem(key) || "{}");
  const entry = existing[code];
  if (!entry) return null;
  if (Date.now() > entry.expiresAt) {
    delete existing[code];
    localStorage.setItem(key, JSON.stringify(existing));
    return null;
  }
  return entry.url;
}

