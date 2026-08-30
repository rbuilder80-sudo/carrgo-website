#!/usr/bin/env bash
# Connects this SaaS to GitHub and pushes the full codebase.
# Usage:
#   GITHUB_TOKEN=ghp_xxxx REPO_NAME=carrgo-saas [PRIVATE=true] bash scripts/github-connect.sh
# Requires: token with "repo" scope (classic PAT) or fine-grained token with
#           Administration:read+write + Contents:read+write on your account.
set -euo pipefail

: "${GITHUB_TOKEN:?Set GITHUB_TOKEN=<your personal access token>}"
REPO_NAME="${REPO_NAME:-carrgo-saas}"
GH_USER="${GH_USER:-}"
PRIVATE="${PRIVATE:-true}"
GIT_URL="${GIT_URL:-}"   # optional: full repo URL if repo already exists

API="https://api.github.com"
AUTH="Authorization: token ${GITHUB_TOKEN}"

cd /home/z/my-project

# 1. Resolve username if not provided
if [ -z "${GH_USER}" ]; then
  GH_USER=$(curl -sS -H "$AUTH" "$API/user" | sed -n 's/.*"login": *"\([^"]*\)".*/\1/p' | head -1)
  [ -n "$GH_USER" ] || { echo "ERROR: token rejected by GitHub API"; exit 1; }
fi
echo "GitHub user: ${GH_USER}"

# 2. Create the repo if no GIT_URL was supplied
if [ -z "${GIT_URL}" ]; then
  PRIV_JSON="false"; [ "$PRIVATE" = "true" ] && PRIV_JSON="true"
  echo "Creating repo ${GH_USER}/${REPO_NAME} (private=${PRIVATE})..."
  HTTP=$(curl -sS -o /tmp/ghrepo.json -w "%{http_code}" -X POST \
    -H "$AUTH" -H "Accept: application/vnd.github+json" \
    -d "{\"name\":\"${REPO_NAME}\",\"private\":${PRIV_JSON},\"description\":\"CARRGO SEO SaaS - autonomous SEO & publishing platform\"}" \
    "$API/user/repos")
  [ "$HTTP" = "201" ] || [ "$(sed -n 's/.*"message": *"\([^"]*\)".*/\1/p' /tmp/ghrepo.json | head -1)" = "name already exists on this account" ] \
    || { echo "ERROR creating repo (HTTP ${HTTP}):"; cat /tmp/ghrepo.json; exit 1; }
  GIT_URL="https://github.com/${GH_USER}/${REPO_NAME}.git"
fi
echo "Repo URL: ${GIT_URL}"

# 3. Wire remote with token embedded for push over HTTPS
git remote remove origin 2>/dev/null || true
git remote add origin "https://${GH_USER}:${GITHUB_TOKEN}@github.com/${GH_USER}/${REPO_NAME}.git"
git remote add origin-clean "${GIT_URL}" 2>/dev/null || true

# 4. Push
git push -u origin main --force
echo ""
echo "DONE. Repo live at: https://github.com/${GH_USER}/${REPO_NAME}"
echo "NOTE: token is embedded in 'origin' remote for future pushes; 'origin-clean' holds the plain URL."
