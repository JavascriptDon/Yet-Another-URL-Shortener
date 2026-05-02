// --- Helpers ---

export function generateCode(length = 6) {
  const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < length; i++) {
    out += chars[Math.floor(Math.random() * chars.length)];
  }
  return out;
}

export function saveMapping(code, url) {
  const key = "url_shortener_mappings";
  const existing = JSON.parse(localStorage.getItem(key) || "{}");
  existing[code] = url;
  localStorage.setItem(key, JSON.stringify(existing));
}

export function getMapping(code) {
  const key = "url_shortener_mappings";
  const existing = JSON.parse(localStorage.getItem(key) || "{}");
  return existing[code] || null;
}

