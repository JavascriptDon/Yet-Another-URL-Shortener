import { generateCode, saveMapping, getMapping } from './helper.js';
// --- Shorten flow ---

const longUrlInput = document.getElementById("longUrl");
const shortenBtn = document.getElementById("shortenBtn");
const errorEl = document.getElementById("error");
const resultCard = document.getElementById("resultCard");
const shortUrlInput = document.getElementById("shortUrl");
const copyBtn = document.getElementById("copyBtn");
const copyMsg = document.getElementById("copyMsg");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

// clear all logic 
clearHistoryBtn.addEventListener("click", () => {
  if (confirm("Clear all shortened URLs? This cannot be undone.")) {
    localStorage.removeItem("url_shortener_mappings");
  }
});

shortenBtn.addEventListener("click", () => {
  errorEl.textContent = "";
  copyMsg.textContent = "";
  const longUrl = longUrlInput.value.trim();

  if (!longUrl) {
    errorEl.textContent = "Please enter a URL.";
    return;
  }

  try {
    new URL(longUrl); // validate
  } catch {
    errorEl.textContent = "That doesn't look like a valid URL.";
    return;
  }

  const code = generateCode();
  saveMapping(code, longUrl);

  const base =
    window.location.origin +
    window.location.pathname.replace(/index\.html$/, "");
  const shortUrl = `${base}?c=${code}`;

  shortUrlInput.value = shortUrl;
  resultCard.style.display = "block";
});

copyBtn.addEventListener("click", async () => {
  if (!shortUrlInput.value) return;
  try {
    await navigator.clipboard.writeText(shortUrlInput.value);
    copyMsg.textContent = "Copied!";
  } catch {
    copyMsg.textContent = "Could not copy. Copy manually.";
  }
});

// --- Redirect flow (when visiting ?c=...) ---

(function handleRedirect() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("c");
  if (!code) return;

  const target = getMapping(code);
  if (target) {
    window.location.href = target;
  } else {
    // Optional: show message if code not found
    errorEl.textContent = "Short link not found (maybe different browser/device).";
  }
})();
