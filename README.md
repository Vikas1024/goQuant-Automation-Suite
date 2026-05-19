# goQuant Automation Suite

A **TypeScript-based UI automation framework** that combines **WebdriverIO (WDIO)** and **Playwright** for end-to-end testing. Tests use the Page Object Model and target [Buggy Cars Rating](https://buggy.justtestit.org).

## Tech stack

| Layer | Technology |
|-------|------------|
| Language | TypeScript |
| UI automation | Playwright (`@playwright/test`) |
| Enterprise / grid runs | WebdriverIO (`wdio.conf.ts`) |
| Pattern | Page Object Model (`src/pages/`) |

Playwright is used for the primary test suite in this repo. WDIO configuration is included for integration with broader automation pipelines (e.g. Cucumber, LambdaTest via `@stockx/skynet-automation-framework`).

## Project structure

```
goQuant-Automation-Suite/
├── playwright.config.ts   # Playwright config (Chromium, Firefox)
├── wdio.conf.ts           # WebdriverIO config
├── src/
│   ├── pages/             # Page objects (AuthPage, ProductPage, …)
│   └── test/              # Playwright specs
└── package.json
```

## Releases and `main` branch

Any pull request that targets `main` must **bump `"version"` in `package.json`** whenever the branch changes files compared to `main`, then run **`npm install`** so the root `version` fields in `package-lock.json` stay aligned. CI enforces this in `.github/workflows/package-version-policy.yml`.

## Prerequisites

- Node.js 18+
- npm
- Git

## Setup

```bash
git clone <repo>
cd goQuant-Automation-Suite
npm install
npx playwright install
```

## Run tests (Playwright)

| Command | Description |
|---------|-------------|
| `npm test` | Run all tests headless (default) |
| `npm run test:headed` | Run with browser UI visible |
| `npm run test:report` | Open the HTML report |
| `npm run test:grep -- "Auth"` | Run tests matching a title pattern |

Run a single spec:

```bash
npx playwright test src/test/auth.spec.ts --project=chromium
```

Headed mode can also be enabled with:

```bash
HEADLESS=false npm test
```

## Reports & artifacts

After a run, open the HTML report:

```bash
npx playwright show-report
```

On failure, screenshots, videos, and traces are saved under `test-results/`.

## Test data

- Tests create unique users at runtime (timestamps).
- Optional: seed `data/users.json` for deterministic accounts.

## Notes

- Playwright runs against Chromium and Firefox (`playwright.config.ts`).
- Screenshots, traces, and video are retained on failure for debugging.
- `wdio.conf.ts` extends the Skynet automation framework for WDIO-based runs (separate from `npm test`).
