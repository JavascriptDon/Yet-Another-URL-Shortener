# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

URL shortener built with vanilla HTML, CSS, and JavaScript, bundled with Vite. Shortened links and
click history are stored in localStorage — there is no backend or database.

---

## Behavioral Guidelines

These guidelines reduce common LLM coding mistakes. They bias toward caution over speed — for trivial tasks, use judgment.

### 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:
- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them — don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

### 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

### 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:
- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.

When your changes create orphans:
- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: every changed line should trace directly to the user's request.

### 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:
- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:
```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## Commands

```bash
npm run dev      # Dev server → http://localhost:5173
npm run build    # Production build → dist/
npm run preview  # Serve dist/ locally to verify build
```

## Definition of Done
There is no test runner configured. Before finishing any change:

- `npm run build` exits with zero errors
- No runtime errors in the browser console
- Affected flow manually verified end-to-end

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


## Code Review Self-Check

- Before writing code that makes a non-obvious choice, pre-emptively ask "why this and not the alternative?" If you can't answer, research until you can — don't write first and justify later.
- Don't take a bug report's suggested fix at face value; verify it's the right layer.
- If neighboring code does something differently than you're about to, find out _why_ before deviating — its choices are often load-bearing, not stylistic.

## Important Development Notes

1. **Follow existing code style** - check neighboring files for patterns
2. **Use absolute paths** - Always use absolute paths in file operations
3. **Be humble & honest** - NEVER overstate what you got done or what actually works in commits, PRs or in messages to the user.
