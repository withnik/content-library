# Cohort rules

IMPORTANT: These rules are strict. Hooks in `.claude/` enforce them; don't work around a block, report it.

1. **Stay in your folder.** Only create or change files under `seasons/1/members/DenysSWdev/`. Reading other files is fine.
2. **Don't edit `seasons/1/data/content.json`.** It is shared data for all members.
3. **No new dependencies, no new tooling.** Everything needed is already set up. Don't install packages or change `package.json`, `package-lock.json`, `tsconfig.json`, `vite.config.ts`, `vitest.config.ts`, `playwright.config.ts` or `eslint.config.mjs`.

## UI

- Use `@primer/react` v38 components first. Never use `Box` or the `sx` prop.
- Don't hand-craft HTML/CSS. When Primer has no component for the need, use native semantic elements (`ul`, `li`, `button`, `nav`, …).
- Before UI work, check `STYLEGUIDE.md` (in this folder or the repo root) if it exists.

## Styles

- Tailwind only for spacing and layout. Colors and fonts come from Primer.

## Tests

Tests live in `__tests__/`:

- `*.test.ts`: Vitest unit tests.
- `*.spec.ts`: Playwright integration/e2e tests.
- `*.story.tsx`: the stories a spec mounts, kept next to that spec. Each named export is one scenario: `mount('App/Default')` renders it. To start on a URL: `mount(id, { path: '/?search=x' })`.
- Before writing tests, check `TEST_CONVENTIONS.md` (in this folder or the repo root) if it exists.
