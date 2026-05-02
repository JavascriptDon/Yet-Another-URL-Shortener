## Yet Another URL Shortener

A lightweight, front‑end‑only URL shortener built with vanilla *HTML*, *CSS*, and *JavaScript*.

It generates short codes, stores mappings in localStorage, and supports redirecting via `?c=CODE`.

This project requires no backend and works entirely in the browser.

## Project Structure

- `index.html` — main entry point
- `src/` — JavaScript and style sources
- `public/` — static assets (if used)
- `package.json` — project dependencies and scripts

## 🧩 How It Works

1. Shortening a URL
When the user enters a long URL:

- A random 6‑character code is generated.
- The mapping { code: longUrl } is saved in localStorage.
- A short URL is displayed to the user.

2. Redirecting

When visiting:

```bash
https://yourdomain.com/?c=abc123
```
main.js checks localStorage:

- If the code exists → redirect to the original URL
- If not → show an error message

3. Clearing History

A Clear All History button removes all stored mappings:

```js
localStorage.removeItem("url_shortener_mappings");
```

This wipes all previously created short URLs.

No history list is shown on the page.

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm (comes with Node.js)

### Install dependencies

```bash
npm install
```

### Run development server

```bash
npm run dev
```

After running the command, open the local URL shown in the terminal (usually `http://localhost:5173`) to view the app.

## Build for production

```bash
npm run build
```

## Preview production build

```bash
npm run preview
```
## Notes

This project is meant for learning and prototyping. It uses Vite for fast local development and bundling.