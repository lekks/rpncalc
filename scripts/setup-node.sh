#!/usr/bin/env bash
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
node_version="$(cat "$project_dir/.nvmrc")"
if [[ ! "$node_version" =~ ^[0-9]+\.[0-9]+\.[0-9]+$ ]]; then
  echo 'Expected an exact numeric Node version in .nvmrc' >&2
  exit 1
fi

runtime_dir="$project_dir/.tools/node-v$node_version"
if [ -x "$runtime_dir/bin/node" ] && [ "$("$runtime_dir/bin/node" --version)" = "v$node_version" ]; then
  echo "Project Node v$node_version is already installed."
  exit 0
fi
if [ -e "$runtime_dir" ]; then
  echo "Incomplete runtime at $runtime_dir; move it aside and run setup again." >&2
  exit 1
fi

case "$(uname -s)" in
  Linux) platform=linux ;;
  Darwin) platform=darwin ;;
  *) echo 'Use Node from .nvmrc with your platform version manager.' >&2; exit 1 ;;
esac
case "$(uname -m)" in
  x86_64) architecture=x64 ;;
  aarch64|arm64) architecture=arm64 ;;
  *) echo 'Unsupported CPU architecture' >&2; exit 1 ;;
esac

mkdir -p "$project_dir/.tools"
download_dir="$(mktemp -d "$project_dir/.tools/download.XXXXXX")"
trap 'rm -rf "$download_dir"' EXIT
archive="node-v$node_version-$platform-$architecture.tar.gz"
release_url="https://nodejs.org/dist/v$node_version"
curl --fail --location --silent --show-error "$release_url/$archive" -o "$download_dir/$archive"
curl --fail --location --silent --show-error "$release_url/SHASUMS256.txt" -o "$download_dir/SHASUMS256.txt"

(
  cd "$download_dir"
  awk -v name="$archive" '$2 == name { print; found = 1 } END { if (!found) exit 1 }' SHASUMS256.txt > checksum.txt
  if command -v sha256sum >/dev/null 2>&1; then
    sha256sum --check checksum.txt
  else
    shasum -a 256 --check checksum.txt
  fi
)

mkdir "$download_dir/runtime"
tar -xzf "$download_dir/$archive" --strip-components=1 -C "$download_dir/runtime"
"$download_dir/runtime/bin/node" --version
mv "$download_dir/runtime" "$runtime_dir"
echo "Installed project Node in $runtime_dir; shell and nvm settings are unchanged."
