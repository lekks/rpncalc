#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
node_version="$(cat "$project_dir/.nvmrc")"
node_bin="$project_dir/.tools/node-v$node_version/bin"
if [ ! -x "$node_bin/node" ]; then
  echo 'Install the project runtime first: bash scripts/setup-node.sh' >&2
  exit 1
fi

export PATH="$node_bin:$PATH"
export npm_config_cache="${npm_config_cache:-$project_dir/.tools/npm-cache}"
cd "$project_dir"
exec "$node_bin/npm" "$@"
