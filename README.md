Simple browser calculator with [Reverse Polish notation](https://en.wikipedia.org/wiki/Reverse_Polish_notation).

Link: [rpn.app](https://rpn.app)

<img width="746" height="712" alt="image" src="https://github.com/user-attachments/assets/0e0c3d2b-43a0-4fc6-922c-d67338f21699" />

## Local development

The legacy build uses Node.js 14.21.3, pinned in `.nvmrc`.
Run these commands from the project directory with nvm installed:

```bash
# Load nvm without switching the current Node version.
source "$HOME/.nvm/nvm.sh" --no-use

# Install the project version if needed, in a subshell.
(nvm install 14.21.3)

nvm exec npm ci
nvm exec npm start
```

Production build:

```bash
nvm exec npm run build
```

`nvm exec` reads `.nvmrc` and selects Node only for the command it runs.
These instructions leave the current shell's Node version and nvm default alias unchanged.
Node.js 14 is end-of-life; this pin is temporary until the build tooling is updated.
