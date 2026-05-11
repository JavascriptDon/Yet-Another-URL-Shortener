# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

URL shortener built with vanilla HTML, CSS, and JavaScript, bundled with Vite. Shortened links and
click history are stored in localStorage — there is no backend or database.

## Commands

```bash
npm run dev      # Dev server → http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Serve dist/ locally to verify build
```

No test runner or linter is configured. Before finishing any change:
- Run `npm run build` and confirm zero build errors
- Open the browser console and confirm no runtime errors
- Manually verify the affected flow end-to-end

## Architecture

```
index.html      # Single-page UI — form, result, and history sections
src/main.js     # DOM element cache, event handlers, redirect-on-load logic
src/helper.js   # generateCode(), saveMapping(), getMapping() — all localStorage access
src/style.css   # Styles
```

Short codes are 6-character random alphanumeric strings. Mappings are stored in localStorage under the key `"url_shortener_mappings"` as a JSON object. On page load, `main.js` checks for a `?c=` query param and redirects if a match is found.

## Code Style

- 2-space indentation, double quotes, semicolons always
- `export function` declarations in helper modules; arrow functions for event handlers
- DOM elements cached as `const` at the top of `main.js`
- Section comments (`// --- Section name ---`) to separate logical blocks in `main.js`
- localStorage always accessed via `JSON.parse(localStorage.getItem(key) || "{}")` / `JSON.stringify` pattern
