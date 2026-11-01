Simple browser calculator with [Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation).

Link: [rpn.app](https://rpn.app)

<img width="746" height="712" alt="image" src="https://github.com/user-attachments/assets/0e0c3d2b-43a0-4fc6-922c-d67338f21699" />

## Local development

The project uses Node.js 26.13.0 LTS (pinned in `.nvmrc`), React 19,
RxJS 7, TypeScript, Vite and Vitest. Dependency versions are pinned in
`package.json` and `package-lock.json`.

On Linux or macOS, install a project-local Node runtime and dependencies:

```bash
bash scripts/setup-node.sh
bash scripts/npm.sh ci
bash scripts/npm.sh start
```

Open the URL printed by Vite (normally `http://127.0.0.1:5173`).
The installer downloads the official Node binary and verifies its SHA-256.
The runtime and npm cache live in the ignored `.tools/` directory. These
scripts do not change your shell, system Node, nvm installation or default
alias. This also avoids changing the version selected by nvm's `node` alias.

If you already have the version from `.nvmrc` active, ordinary `npm` commands
work too. On Windows, install that version using your preferred version manager.

## Checks and production build

```bash
bash scripts/npm.sh test
bash scripts/npm.sh run build
bash scripts/npm.sh run preview
```

The build includes TypeScript checking and writes production files to `build/`.
Relative asset URLs support hosting at the domain root or in a subdirectory.
The former CRA service worker is unregistered to prevent stale cached pages.

Browser checks run against the production build:

```bash
bash scripts/npm.sh exec playwright install chromium
bash scripts/npm.sh run test:e2e
```

To use an installed Chrome instead of downloading Playwright's Chromium:

```bash
PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH=/usr/bin/google-chrome bash scripts/npm.sh run test:e2e
```

CI installs dependencies with `npm ci`, runs the unit tests, builds the app,
and checks calculator controls, expressions and clipboard events in Chromium.
